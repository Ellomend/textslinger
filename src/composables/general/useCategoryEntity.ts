import { computed, ref } from 'vue'
import { useTextsStore } from 'src/stores/texts-store'
import { TextService } from 'src/services/TextService/TextService'
import { CategoryEntity, TextEntity } from '../../services/TextService/BaseTypes'

export function useCategoryEntity(categoryProp: CategoryEntity | null | undefined = null) {
  const textsStore = useTextsStore()

  function editedCategoryFactory(category: CategoryEntity | null | undefined): CategoryEntity {
    return TextService.categoryFactory(category || {})
  }

  const editedCategory = ref<CategoryEntity>(editedCategoryFactory(categoryProp))

  const { categoryFactory } = TextService

  const updateCategoryInStore = (category: CategoryEntity): void => {
    textsStore.updateCategory(category)
  }

  const removeCategoryFromStore = (categoryId: string): void => {
    textsStore.removeCategory(categoryId)
  }

  const addCategoryToStore = (category: CategoryEntity): void => {
    textsStore.addCategory(category)
  }

  const selectCategory = (categoryId: string | null | undefined) => {
    textsStore.selectCategory(categoryId || null)
  }

  const updateTextCategory = (text: TextEntity, categoryId: string): void => {
    const newCategoryId = text.id === categoryId ? null : categoryId
    const updatedText: TextEntity = {
      ...text,
      category: newCategoryId,
    }
    textsStore.updateText(updatedText)
  }

  const selectedCategory = computed(() => textsStore.getSelectedCategory)

  const computedCategories = computed(() => textsStore.categories)

  return {
    editedCategory,
    updateCategoryInStore,
    removeCategoryFromStore,
    addCategoryToStore,
    selectCategory,
    selectedCategoryId: textsStore.selectedId,
    computedCategories,
    selectedCategory,
    categoryFactory,
    updateTextCategory,
  }
}
