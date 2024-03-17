import { CategoryEntity, TextEntity } from '../TextService/BaseTypes';

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

// use chrome storage local
export class StorePersistenceService {
  static async saveData(data: PersistData, key: PersistanceKeys): Promise<void> {
    return new Promise((resolve, reject) => {
      const jsonData = JSON.stringify(data); // Serialize data to JSON string
      chrome.storage.local.set({ [key]: jsonData }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  static async loadData<T>(key: PersistanceKeys): Promise<T | null> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          const jsonData = result[key];
          if (jsonData) {
            try {
              const data = JSON.parse(jsonData) as T; // Parse JSON string back into object
              resolve(data);
            } catch (error) {
              reject(error); // Handle parsing error
            }
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  // Method to clear storage
  static async clearData(key: PersistanceKeys): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(key, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }
}
