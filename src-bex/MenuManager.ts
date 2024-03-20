import { StorePersistenceService, TextsStateData } from 'src/services/StorePersistanceService/StorePersistanceService'
import { TextEntity } from 'src/services/TextService/BaseTypes'
import { BexBridge } from '@quasar/app-vite/types/bex'
import { MenuItem, SelectedTextMenuInfo } from './types'

export class MenuManager {
  // local data state
  private state: TextsStateData = {
    categories: [], texts: [], searchString: null, selectedCategoryId: null,
  }

  private bridge: BexBridge | undefined

  private mainMenuIdSelect = 'texts-slinger-main-menu-select'

  private mainMenuIdInsert = 'texts-slinger-main-menu-insert'

  private storageService = StorePersistenceService

  constructor() {
    this.addListeners()
    this.storageService.initialize()
  }

  initialize(bridge: BexBridge) {
    this.bridge = bridge
  }

  // add listeners
  addListeners() {
    const oc = chrome.contextMenus.onClicked

    oc.addListener((info) => {
      const isTextSelected = info.editable === false
      && info.selectionText
      && info.selectionText.length > 0

      const isFieldClicked = info.editable === true

      if (isTextSelected) {
        this.saveText(info)
      } else if (isFieldClicked) {
        this.insertTextClicked(info)
      }
    })
  }

  async loadStateFromStorage() {
    const state = await this.storageService.loadData<TextsStateData>('texts')

    this.state = {
      categories: [],
      texts: [],
      searchString: null,
      selectedCategoryId: null,
      ...state,
    }
    return state
  }

  /**
   * Regenerates the menu by loading state from storage and then creating the menu.
   *
   */
  reGenerateMenu() {
    this.loadStateFromStorage()
      .then(() => this.createMenu())
  }

  /*
  clears all menu items
  creates menu from local state
  */
  createMenu() {
    // clear all menu items
    chrome.contextMenus.removeAll()

    const menuItems: MenuItem[] = [
      {
        id: this.mainMenuIdSelect,
        title: 'Save selected text',
        contexts: ['selection'],
      },
      ...this.categoriesOptions(),
      {
        id: this.mainMenuIdInsert,
        title: 'Insert text here',
        contexts: ['editable'],
      },
      ...this.textsOptions(),
    ]

    menuItems.forEach((menuItem) => {
      chrome.contextMenus.create(menuItem)
    })
  }

  // Selected text menu

  categoriesOptions(): MenuItem[] {
    return this.state.categories.map((category) => ({
      id: category.id,
      parentId: this.mainMenuIdSelect,
      title: category.title,
      contexts: ['selection'],
    }))
  }

  textsOptions(): MenuItem[] {
    return this.state.texts
      .filter((text) => text.category === this.state.selectedCategoryId)
      .map((text) => ({
        id: text.id,
        parentId: this.mainMenuIdInsert,
        title: text.title,
        contexts: ['editable'],
      }))
  }

  // save new text
  saveText(info: SelectedTextMenuInfo): void {
    if (!info.selectionText || info.selectionText.length < 1) return
    // form new text entity
    const date = new Date()
    const time = date.getTime().toString()

    const textCount = this.state.texts.length + 1

    const newTextEntity: TextEntity = {
      id: time,
      title: `${info.selectionText.slice(0, 30)}#(${textCount})`,
      content: info.selectionText,
      category: info.menuItemId.toString(),
    }

    // add to local data state
    this.state.texts.push(newTextEntity)

    // save local data state to storage
    this.storageService.saveData(this.state, 'texts')

    // TODO: send message to other parts of BEX

    this.createMenu()
  }

  insertTextClicked(info: SelectedTextMenuInfo) {
    // insert text into text field
    const textEntity = this.state.texts.find((text) => text.id === info.menuItemId)

    this.bridge?.send('insert.text', {
      menuInfo: info,
      text: textEntity,
    })
  }
}
