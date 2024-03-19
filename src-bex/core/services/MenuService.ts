import { CategoryEntity, TextEntity } from 'src/services/TextService/BaseTypes'
import { MainMenuItem, SubMenuItem } from '../types'

export const mainMenuId = 'texts-slinger-main-menu'

export const mainMenuTitle = (): string => {
  const now = new Date()
  const rootMenuName = `Menu : ${now.getMinutes()}min, ${now.getSeconds()} seconds`
  return rootMenuName
}

export function textSelectedMainMenu(): MainMenuItem {
  return {
    id: mainMenuId,
    contexts: ['all'],
    title: mainMenuTitle(),
  }
}
