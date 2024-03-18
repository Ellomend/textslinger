import { bexBackground } from 'quasar/wrappers'

console.log('bg1')

chrome.runtime.onInstalled.addListener(() => {
  // Adding context menu functionality
  // Create a context menu for text selection
  console.log('bg2')
  chrome.contextMenus.create({
    id: 'saveTextToFolder',
    title: 'Save Text to Folder',
    contexts: ['selection'],
  })

  chrome.action.onClicked.addListener((/* tab */) => {
    console.log('bg2')

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

export default bexBackground((bridge /* , allActiveConnections */) => {
  bridge.on('log', ({ data, respond }) => {
    // eslint-disable-next-line no-console
    console.log(`[BEX] ${data.message}`, ...(data.data || []))
    respond()
  })

  bridge.on('getTime', ({ respond }) => {
    respond(Date.now())
  })

  bridge.on('storage.get', ({ data, respond }) => {
    const { key } = data
    if (key === null) {
      chrome.storage.local.get(null, (items) => {
        // Group the values up into an array to take advantage of the bridge's chunk splitting.
        respond(Object.values(items))
      })
    } else {
      chrome.storage.local.get([key], (items) => {
        respond(items[key])
      })
    }
  })
  // Usage:
  // const { data } = await bridge.send('storage.get', { key: 'someKey' })

  bridge.on('storage.set', ({ data, respond }) => {
    chrome.storage.local.set({ [data.key]: data.value }, () => {
      respond()
    })
  })
  // Usage:
  // await bridge.send('storage.set', { key: 'someKey', value: 'someValue' })

  bridge.on('storage.remove', ({ data, respond }) => {
    chrome.storage.local.remove(data.key, () => {
      respond()
    })
  })
  // Usage:
  // await bridge.send('storage.remove', { key: 'someKey' })

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'saveTextToFolder') {
      // Extract the selected text using `info.selectionText`
      const selectedText = info.selectionText

      // Logic to handle the selected text, such as saving it to storage or processing it further
      console.log(`Selected text: ${selectedText}`)

      // Example: Sending the selected text to your Vue app via the bridge
      // bridge.send('saveText', { text: selectedText });

      // Alternatively, you could invoke a function to handle the text
      // saveTextToFolder(selectedText);
    }
  })
  /*
  // EXAMPLES
  // Listen to a message from the client
  bridge.on('test', d => {
    console.log(d)
  })

  // Send a message to the client based on something happening.
  chrome.tabs.onCreated.addListener(tab => {
    bridge.send('browserTabCreated', { tab })
  })

  // Send a message to the client based on something happening.
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      bridge.send('browserTabUpdated', { tab, changeInfo })
    }
  })
   */
})
