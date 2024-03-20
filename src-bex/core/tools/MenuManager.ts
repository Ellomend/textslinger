import { StorePersistenceService, TextsStateData } from 'src/services/StorePersistanceService/StorePersistanceService'
import { TextEntity } from 'src/services/TextService/BaseTypes'
import { BexBridge } from '@quasar/app-vite/types/bex'
import { MainMenuItem, MenuItem, SelectedTextMenuInfo } from '../types'

export class MenuManager {
  // local data state
  private state: TextsStateData = {
    categories: [], texts: [], searchString: null, selectedCategoryId: null,
  }

  private bridge

  private mainMenuIdSelect = 'texts-slinger-main-menu-select'

  private mainMenuIdInsert = 'texts-slinger-main-menu-insert'

  private storageService = StorePersistenceService

  constructor(bridge: BexBridge) {
    this.bridge = bridge
    this.addListeners()
    this.storageService.initialize(true)
    this.loadDataFromStorage()
  }

  loadDataFromStorage() {
    this.storageService.loadData<TextsStateData>('texts')
      .then((state) => {
        console.log('loaded state', state)

        this.state = {
          categories: [],
          texts: [],
          searchString: null,
          selectedCategoryId: null,
          ...state,
        }
        this.createMenu()
      })
      .catch(() => {
        throw new Error('Error loading data from storage')
      })
  }

  // add listeners
  addListeners() {
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      console.log('catched click, handling', info)
      const isTextSelected = info.editable === false
      && info.selectionText
      && info.selectionText.length > 0

      const isFieldClicked = info.editable === true

      if (isTextSelected) {
        console.log('category clicked', info)
        this.saveText(info)
      } else if (isFieldClicked) {
        console.log('text clicked, send to dom')
        this.insertTextClicked(info)
      }
    })
  }

  /*
  clears all menu items
  creates menu from local state
  */
  createMenu() {
    // clear all menu items
    chrome.contextMenus.removeAll()
    console.log('create menu')

    this.makeAllMenuItems().forEach((menuItem) => {
      console.log('create menu item', menuItem)

      chrome.contextMenus.create(menuItem)
    })

    console.log('menu created')
  }

  makeAllMenuItems(): MenuItem[] {
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

    return menuItems
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
    return this.state.texts.map((text) => ({
      id: text.id,
      parentId: this.mainMenuIdInsert,
      title: text.title,
      contexts: ['editable'],
    }))
  }

  // listeners
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

    console.log('saving info as new text entity ', newTextEntity)

    // add to local data state
    this.state.texts.push(newTextEntity)

    // save local data state to storage
    this.storageService.saveData(this.state, 'texts')

    // TODO: send message to other parts of BEX

    // recreate menu
    this.createMenu()
  }

  insertTextClicked(info: SelectedTextMenuInfo) {
    // insert text into text field
    console.log('sending to dom', info)
    const textEntity = this.state.texts.find((text) => text.id === info.menuItemId)
    console.log('textEntity', textEntity)

    this.bridge.send('insert.text', {
      menuInfo: info,
      text: textEntity,
    })
  }
}
