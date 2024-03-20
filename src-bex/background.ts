/* eslint-disable no-console */
import { bexBackground } from 'quasar/wrappers'
import { MenuManager } from './core/tools/MenuManager'

console.log('bg1')

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
  const manager = new MenuManager(bridge)
  console.log('bg4 context menu created')
})
