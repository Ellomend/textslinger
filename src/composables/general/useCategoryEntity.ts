import { computed } from 'vue'
import { useTextsStore } from 'src/stores/texts-store'
import { TextService } from 'src/services/TextService/TextService'
import { CategoryEntity, TextEntity } from '../../services/TextService/BaseTypes'

export function useCategoryEntity() {
  const textsStore = useTextsStore()

  const { createCategory } = TextService

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
    updateCategoryInStore,
    removeCategoryFromStore,
    addCategoryToStore,
    selectCategory,
    selectedCategoryId: textsStore.selectedId,
    computedCategories,
    selectedCategory,
    createCategory,
    updateTextCategory,
  }
}
