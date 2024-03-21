import { useQuasar } from 'quasar'
import { ll } from 'src/services/LoggerService/LoggerService'
import { useTextsStore } from 'src/stores/texts-store'
import { CategoryEntity, TextEntity } from '../../services/TextService/BaseTypes'
import { useTextEntity } from './useTextEntity'
import { useCategoryEntity } from './useCategoryEntity'
import { useValidation } from './useValidation'

export function useImportExport() {
  const $q = useQuasar()
  const { importData } = useTextsStore()
  const { texts } = useTextEntity()
  const { computedCategories } = useCategoryEntity()
  const { validateTextsArray, validateCategoriesArray } = useValidation()
  const categories = computedCategories

  // generate file name
  // format 'text-slinger-backup-YYYY-MM-DD-HH-MM-SS.json'
  const generateFileName = () => {
    const now = new Date()
    const fileName = `text-slinger-backup-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.json`
    return fileName
  }

  // export
  const exportToFile = (): void => {
    // Prepare the data to be exported
    const data = {
      texts: texts.value,
      categories: categories.value,
    }

    const jsonStr = JSON.stringify(data)

    const blob = new Blob([jsonStr], { type: 'application/json' })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')

    const filename = generateFileName()
    link.href = url
    link.download = filename

    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // import
  type Entity = TextEntity | CategoryEntity;

  function mergeEntities<T extends Entity>(currentEntities: T[], newEntities: T[]): T[] {
    const merged = [...currentEntities]
    newEntities.forEach((newEntity) => {
      const index = merged.findIndex((entity) => entity.id === newEntity.id)
      if (index !== -1) {
        merged[index] = newEntity
      } else {
        merged.push(newEntity)
      }
    })
    return merged
  }

  const updateState = async (data: { texts: TextEntity[]; categories: CategoryEntity[] }) => {
    // validate data
    const textValidation = validateTextsArray(data.texts)
    const categoryValidation = validateCategoriesArray(data.categories)
    if (textValidation.error || categoryValidation.error) {
      ll(['failed to validate file data', textValidation.error, categoryValidation.error], 'error')
      $q.notify({
        message: 'Invalid data',
        color: 'negative',
        icon: 'warning',
      })
      return
    }

    // log existing data
    ll(['existing texts', texts.value], 'info')
    ll(['existing categories', categories.value], 'info')

    // log new data
    ll(['new texts', data.texts], 'info')
    ll(['new categories', data.categories], 'info')

    // check category id in texts array, if not exist, clear it to null
    data.texts.forEach((text) => {
      // eslint-disable-next-line max-len
      if (![...data.categories, ...categories.value].find((category) => category.id === text.category)) {
        text.category = null
      }
    })

    // merge existing entities
    const mergedTexts = mergeEntities(texts.value, data.texts)
    const mergedCategories = mergeEntities(categories.value, data.categories)

    // log merged data
    ll(['merged texts', mergedTexts], 'info')
    ll(['merged categories', mergedCategories], 'info')

    // update state
    importData(mergedTexts, mergedCategories)
  }

  const importFromFile = (file: File): void => {
    // get data from file
    const reader = new FileReader()

    // listen to load event
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        updateState(data)
      } catch (error) {
        ll(['failed to parse file content to json', error], 'error')

        $q.notify({
          message: 'Invalid JSON file',
          color: 'negative',
          icon: 'warning',
        })
      }
    }
    reader.readAsText(file)
  }

  return {
    exportToFile,
    importFromFile,
  }
}
