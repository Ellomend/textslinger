/* eslint-disable no-console */
import { bexBackground } from 'quasar/wrappers'
import { MenuManager } from './core/tools/menu'

console.log('bg1')

// onInstalled
// onConnect
// onConnectExternal
// onMessage
// onMessageExternal
// onStartup
// onSuspend
// onUserScriptConnect
// onUserScriptMessage
// sendMessage

chrome.runtime.onInstalled.addListener(() => {
  console.log('bg2 onInstalled')

  chrome.action.onClicked.addListener((/* tab */) => {
    // Opens our extension in a new browser window.
    // Only if a popup isn't defined in the manifest.
    chrome.tabs.create(
      {
        url: chrome.runtime.getURL('www/index.html'),
      },
      (/* newTab */) => {
        // Tab opened.
      },
    )
  })
})

declare module '@quasar/app-vite' {
  interface BexEventMap {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    log: [{ message: string; data?: any[] }, never];
    getTime: [never, number];

    'storage.get': [{ key: string | null }, any];
    'storage.set': [{ key: string; value: any }, any];
    'storage.remove': [{ key: string }, any];
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}

// this one is executed every time new page opens.
export default bexBackground((bridge /* , allActiveConnections */) => {
  console.log('bg3 bex background')

  console.log('chrome', chrome)

  console.log('chrome.contextMenus', chrome.contextMenus)
  console.log('chrome.runtime', chrome.runtime)

  // loading data from storage
  console.log('remove all menu')
  const manager = new MenuManager()
  manager.createMenu()

  // Add your context menu creation logic here
  // Step 1: Create the parent menu item
  // chrome.contextMenus.create({
  //   id: 'parentMenuItem',
  //   title: rootMenuName,
  //   contexts: ['all'], // Context where this menu will appear
  // })

  // // Step 2: Create submenu items
  // chrome.contextMenus.create({
  //   id: 'submenuItem1',
  //   parentId: 'parentMenuItem',
  //   title: 'Submenu Item 1',
  //   contexts: ['all'],
  // })

  // chrome.contextMenus.create({
  //   id: 'submenuItem2',
  //   parentId: 'parentMenuItem',
  //   title: 'Submenu Item 2',
  //   contexts: ['all'],
  // })

  console.log('bg4 context menu created')
})
