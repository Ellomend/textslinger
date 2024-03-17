import { faker } from '@faker-js/faker'
import { uid } from 'quasar'
import { TextEntity } from './BaseTypes'

export const randomTitle = (): string => faker.lorem.words({ min: 1, max: 3 })

export const randomParagraph = (number = 3): string => faker.lorem.paragraph(number)

export const randomUID = (): string => uid()

// check if text title or content contains string
export const checkTextEntityContains = (text: TextEntity, str: string): boolean => {
  const searchString = str.trim().toLowerCase()

  // If the search string is empty, consider it a match (return true)
  if (!searchString) return true

  return text.title.toLowerCase().includes(searchString)
   || text.content.toLowerCase().includes(searchString)
}

export const copyToClipboard = async (textString: string) => {
  await navigator.clipboard.writeText(textString)
}

// TODO: fix this later
// eslint-disable-next-line arrow-body-style
export const takeStringBeginning = (string: string, characters = 25): string => {
  return string.slice(0, characters)
}

export const takeStringEnd = (string: string, characters = 25): string => string.slice(-characters)
