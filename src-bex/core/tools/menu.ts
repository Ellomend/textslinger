import { uid } from 'quasar'
import { StorePersistenceService, TextsStateData } from 'src/services/StorePersistanceService/StorePersistanceService'
import { TextEntity } from 'src/services/TextService/BaseTypes'
import { MainMenuItem, MenuItem } from '../types'

export class MenuManager {
  // local data state
  private state: TextsStateData = {
    categories: [], texts: [], searchString: null, selectedCategoryId: null,
  }

  private mainMenuIdSelect = 'texts-slinger-main-menu-select'

  private mainMenuIdInsert = 'texts-slinger-main-menu-insert'

  private storageService = StorePersistenceService

  constructor() {
    this.storageService.initialize(true)
    this.addListeners()
    this.loadDataFromStorage()
  }

  loadDataFromStorage() {
    this.storageService.loadData<TextsStateData>('texts')
      .then((state) => {
        this.state = {
          categories: [],
          texts: [],
          searchString: null,
          selectedCategoryId: null,
          ...state,
        }
      })
      .catch(() => {
        throw new Error('Error loading data from storage')
      })
  }

  // add listeners
  addListeners() {
    // Step 3: Handle clicks on the context menu
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      switch (info.menuItemId) {
        case 'submenuItem1':
          console.log('info', info)
          break
        case 'submenuItem2':
          console.log('info', info)
          break
        default:
          console.log('def')
          console.log('info', info)
          console.log('tab', tab)
          console.log(this.state)
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

  // make all menu items from local data state
  makeAllMenuItems(): MenuItem[] {
    let menuItems: MenuItem[] = []
    // selected menu items
    menuItems.push(this.selectedTextMainMenuItem())
    menuItems = menuItems.concat(this.categoriesOptions())
    // insert menu items
    menuItems.push(this.insertMainMenuItem())
    menuItems = menuItems.concat(this.textsOptions())

    return menuItems
  }

  // Selected text menu
  selectedTextMainMenuItem(): MainMenuItem {
    return {
      id: this.mainMenuIdSelect,
      title: 'Save selected text',
      contexts: ['selection'],
    }
  }

  categoriesOptions(): MenuItem[] {
    return this.state.categories.map((category) => ({
      id: category.id,
      parentId: this.mainMenuIdSelect,
      title: category.title,
      contexts: ['selection'],
    }))
  }

  // Input field menu
  insertMainMenuItem(): MainMenuItem {
    return {
      id: this.mainMenuIdInsert,
      title: 'Insert text here',
      contexts: ['editable'],
    }
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
  saveText(selectedText: string, categoryId: string | null): void {
    // form new text entity
    const date = new Date()
    const time = date.getTime().toLocaleString()
    const newTextEntity: TextEntity = {
      id: uid(),
      title: `text from ${time}`,
      content: selectedText,
      category: categoryId,
    }

    // add to local data state
    this.state.texts.push(newTextEntity)

    // save local data state to storage
    this.storageService.saveData(this.state, 'texts')

    // TODO: send message to other parts of BEX

    // recreate menu
    this.createMenu()
  }

  insertText(textId: string): void {
    // insert text into text field
    const insertText = this.state.texts.find((text) => text.id === textId)
    console.log('text', insertText)
  }
}
