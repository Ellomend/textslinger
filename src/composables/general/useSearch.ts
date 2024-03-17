import { useTextsStore } from 'src/stores/texts-store'
import { computed } from 'vue'

export function useSearch() {
  const textsStore = useTextsStore()

  const storeSearchString = computed(() => textsStore.searchString)

  const updateSearchString = (searchString: string) => {
    textsStore.updateSearchString(searchString.trim())
  }

  return {
    updateSearchString,
    searchString: storeSearchString,
  }
}
