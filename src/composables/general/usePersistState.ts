import { useOptionsStore } from 'src/stores/options-store'
import { useTextsStore } from 'src/stores/texts-store'

export const usePersistedState = () => {
  const textsStore = useTextsStore()
  const optionsStore = useOptionsStore()

  const initStoresState = async (): Promise<void> => {
    await textsStore.initializeState()
    await optionsStore.initializeState()
  }

  const clearStoresState = async (): Promise<void> => {
    textsStore.clearPersistedState()
    optionsStore.clearPersistedState()
  }

  return {
    initStoresState,
    clearStoresState,
  }
}
