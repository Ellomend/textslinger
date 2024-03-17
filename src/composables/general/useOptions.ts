import { useOptionsStore } from 'src/stores/options-store'
import { computed } from 'vue'

export function useOptions() {
  const optionsStore = useOptionsStore()

  const wrapWithSpaces = computed(() => optionsStore.wrapWithSpaces)

  const { setWrapWithSpaces } = optionsStore

  return {
    wrapWithSpaces,
    setWrapWithSpaces,
  }
}
