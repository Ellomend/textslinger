/* eslint-disable class-methods-use-this */
import { StorageStrategy } from './StorePersistanceService'

export class LocalStorageStrategy implements StorageStrategy {
  async saveData(key: string, data: string): Promise<void> {
    localStorage.setItem(key, data)
    return Promise.resolve()
  }

  async loadData<T>(key: string): Promise<T | null> {
    const jsonData = localStorage.getItem(key)
    return jsonData ? JSON.parse(jsonData) as T : null
  }

  async clearData(key: string): Promise<void> {
    localStorage.removeItem(key)
    return Promise.resolve()
  }
}
