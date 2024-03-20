import { CategoryEntity, TextEntity } from '../TextService/BaseTypes'
import { ChromeStorageStrategy } from './ChromeStorage'
import { LocalStorageStrategy } from './LocalStorage'

export interface TextsStateData {
  texts: TextEntity[]
  categories: CategoryEntity[],
  selectedCategoryId: string | null
  searchString: string | null
}

export interface OptionsStateData {
  wrap: boolean
}

export type PersistData = TextsStateData | OptionsStateData

export type PersistanceKeys = 'texts' | 'options'

export interface StorageStrategy {
  saveData(key: string, data: string): Promise<void>
  loadData<T>(key: string): Promise<T | null>
  clearData(key: string): Promise<void>
}

export class StorePersistenceService {
  private static storageType: StorageStrategy

  static isBexMode(): boolean {
    // const $q = useQuasar()
    // return !!$q.platform.is.bex
    return true
  }

  static initialize(forceChromeStorage = false) {
    if (forceChromeStorage) {
      this.storageType = new ChromeStorageStrategy()
      console.log('forced chrome storage')

      return
    }

    if (this.isBexMode()) {
      console.log('chrome')

      this.storageType = new ChromeStorageStrategy()
    } else {
      console.log('local storage')

      this.storageType = new LocalStorageStrategy()
    }
  }

  static async saveData(data: PersistData, key: PersistanceKeys): Promise<void> {
    const jsonData = JSON.stringify(data)
    await this.storageType.saveData(key, jsonData)
  }

  static async loadData<T>(key: PersistanceKeys): Promise<T | null> {
    return this.storageType.loadData<T>(key)
  }

  static async clearData(key: PersistanceKeys): Promise<void> {
    await this.storageType.clearData(key)
  }
}

StorePersistenceService.initialize()
