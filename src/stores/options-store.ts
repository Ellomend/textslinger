import { defineStore } from 'pinia'
import { OptionsStateData, StorePersistenceService } from 'src/services/StorePersistanceService/StorePersistanceService'
import { ref, watch } from 'vue'

export const useOptionsStore = defineStore('options', () => {
  const wrapWithSpaces = ref<boolean>(false)

  const persistanceKey = 'options'

  const setWrapWithSpaces = (value: boolean) => {
    wrapWithSpaces.value = value
  }

  const initializeState = async (): Promise<boolean> => {
    const data = await StorePersistenceService.loadData<OptionsStateData>(persistanceKey)

    if (!data) {
      wrapWithSpaces.value = false
      return false
    }

    wrapWithSpaces.value = data.wrap
    return true
  }

  watch([wrapWithSpaces], async () => {
    // Assemble the data to be saved
    const data = {
      wrap: wrapWithSpaces.value,
    }

    await StorePersistenceService.saveData(data, persistanceKey)
  }, {
    deep: false, // This ensures the watch is triggered on nested changes
  })

  const clearPersistedState = async () => {
    await StorePersistenceService.clearData(persistanceKey)
  }

  return {
    wrapWithSpaces,
    setWrapWithSpaces,
    initializeState,
    clearPersistedState,
  }
})
