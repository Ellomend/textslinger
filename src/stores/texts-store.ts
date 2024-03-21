import { defineStore } from 'pinia'
import { useQuasar } from 'quasar'
import { StorePersistenceService, TextsStateData } from 'src/services/StorePersistanceService/StorePersistanceService'
import { CategoryEntity, TextEntity } from 'src/services/TextService/BaseTypes'
import { checkTextEntityContains } from 'src/services/TextService/TextUtils'
import { computed, ref, watch } from 'vue'

export const useTextsStore = defineStore('texts', () => {
  const $q = useQuasar()

  // State
  const texts = ref<TextEntity[]>([])
  const categories = ref<CategoryEntity[]>([])
  const selectedCategoryId = ref<string | null>(null)
  const searchString = ref<string>('')

  const persistanceKey = 'texts'

  // load data from storage
  const initializeState = async (): Promise<boolean> => {
    const data = await StorePersistenceService.loadData<TextsStateData>(persistanceKey)

    if (!data) {
      texts.value = []
      categories.value = []
      selectedCategoryId.value = null
      searchString.value = ''
      return false
    }

    texts.value = data.texts || []
    categories.value = data.categories || []
    selectedCategoryId.value = data.selectedCategoryId || null
    searchString.value = data.searchString || ''
    return true
  }

  watch([texts, categories, selectedCategoryId, searchString], async () => {
    // Assemble the data to be saved
    const data = {
      texts: texts.value,
      categories: categories.value,
      selectedCategoryId: selectedCategoryId.value,
      searchString: searchString.value,
    }

    await StorePersistenceService.saveData(data, persistanceKey)
    // send message to regenerate context menu on page

    $q.bex.send('update.menu')
  }, {
    deep: true, // This ensures the watch is triggered on nested changes
  })

  const clearPersistedState = async () => {
    await StorePersistenceService.clearData(persistanceKey)
  }

  const updateSearchString = (search: string) => {
    searchString.value = search
  }

  // list texts
  const filteredTexts = computed(() => {
    const resTexts = texts.value.filter((text) => {
      // TODO: fix this later
      // eslint-disable-next-line max-len
      const categoryMatch = selectedCategoryId.value === null || text.category === selectedCategoryId.value

      const searchStringMatch = checkTextEntityContains(text, searchString.value)
      return categoryMatch && searchStringMatch
    })
    return resTexts
  })

  const updateText = (updatedText: TextEntity) => {
    const index = texts.value.findIndex((text) => text.id === updatedText.id)
    if (index !== -1) {
      texts.value[index] = updatedText
    }
  }

  const createText = (newText: TextEntity) => {
    texts.value.push(newText)
  }

  const removeText = (textId: string) => {
    const index = texts.value.findIndex((text) => text.id === textId)
    if (index !== -1) {
      texts.value.splice(index, 1)
    }
  }

  // categories

  // list categories
  const listCategories = computed(() => categories.value)

  const selectedId = computed(() => selectedCategoryId)

  // TODO: fix this later
  // eslint-disable-next-line arrow-body-style
  const getSelectedCategory = computed(() => {
    return categories.value.find((category) => category.id === selectedCategoryId.value)
  })

  const selectCategory = (categoryId: string | null) => {
    selectedCategoryId.value = selectedCategoryId.value === categoryId ? null : categoryId
  }

  // Add category
  const addCategory = (newCategory: CategoryEntity) => {
    categories.value.push(newCategory)
  }

  // Remove category
  const removeCategory = (categoryId: string) => {
    categories.value = categories.value.filter((category) => category.id !== categoryId)
    selectedCategoryId.value = null

    // remove link to deleted category from texts
    texts.value = texts.value.map((iText) => {
      if (iText.category === categoryId) {
        return {
          ...iText,
          category: null,
        }
      }
      return iText
    })
  }

  // Update category
  const updateCategory = (updatedCategory: CategoryEntity) => {
    const index = categories.value.findIndex((category) => category.id === updatedCategory.id)
    if (index !== -1) {
      categories.value[index] = updatedCategory
    }
  }

  /**
   * This function imports new texts and new categories into state
   */
  const importData = (newTexts: TextEntity[], newCategories: CategoryEntity[]) => {
    texts.value = newTexts
    categories.value = newCategories
  }

  return {
    initializeState,
    clearPersistedState,
    texts,
    filteredTexts,
    searchString,
    updateSearchString,
    selectCategory,
    categories,
    listCategories,
    updateText,
    createText,
    removeText,
    addCategory,
    removeCategory,
    updateCategory,
    selectedId,
    getSelectedCategory,
    importData,
  }
})
