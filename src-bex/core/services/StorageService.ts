import { StorePersistenceService, TextsStateData } from 'src/services/StorePersistanceService/StorePersistanceService'

export const loadDataFromStorage = async (): Promise<TextsStateData | null> => {
  const persistanceService = StorePersistenceService
  persistanceService.initialize(true)
  const data = await persistanceService.loadData<TextsStateData>('texts')
  return data
}
