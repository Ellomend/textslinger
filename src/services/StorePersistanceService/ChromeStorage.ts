/* eslint-disable class-methods-use-this */
import { StorageStrategy } from './StorePersistanceService'

export class ChromeStorageStrategy implements StorageStrategy {
  async saveData(key: string, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [key]: data }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          resolve()
        }
      })
    })
  }

  async loadData<T>(key: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          const jsonData = result[key]
          resolve(jsonData ? JSON.parse(jsonData) as T : null)
        }
      })
    })
  }

  async clearData(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(key, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          resolve()
        }
      })
    })
  }
}
