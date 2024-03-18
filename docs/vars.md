so i have quasar documentation pats related to BEX development


---
title: What is a Browser Extension
desc: (@quasar/app-vite) Introduction on what a Browser Extension (BEX) is.
---

A Browser Extension (BEX) is an application that runs in the browsers context and is used to customize the web browser in some way.

They are built on web technologies such as HTML, JavaScript, and CSS and will aim to fulfill a single purpose. A single BEX
can be built in any way the user deems fit but must contribute towards fulfilling that single purpose.

Here a few things a BEX can do:

* Override page content
* Add to (or alter) the browser's interface
* Intercept page requests
* Be a full featured app that runs in the browser.
* Interact with and alter the development tools of the browser.

We've all used Browser Extensions in some capacity. Quasar BEX allows you to do anything a browser extension allows but with the simplicity Quasar offers in all other modes.

### Supported Browsers

Whilst BEX mode has been tested and developed on Firefox and Chrome, all Chromium based browsers should be supported. Where Chrome is mentioned in the documentation, you can safely assume this will apply to the various Chromium browsers as well. If in doubt, refer to the specific browser documentation for clarification.
---
title: Preparation for BEX
desc: (@quasar/app-vite) How to add the Browser Extension (BEX) mode into a Quasar app.
scope:
  tree:
    l: src-bex
    c:
    - l: assets
      c:
      - l: content.css
        e: CSS file which is auto injected into the consuming webpage via the manifest.json
    - l: background.js
      e: Standard background script BEX file (auto injected via manifest.json)
    - l: dom.js
      e: JS file which is injected into the DOM with a hook into the BEX communication
        layer
    - l: icons
      e: Icons of your app for all platforms
      c:
      - l: 'icon-128x128.png '
        e: Icon file at 128px x 128px
      - l: icon-16x16.png
        e: Icon file at 16px x 16px
      - l: icon-48x48.png
        e: Icon file at 48px x 48px
    - l: _locales/
      e: Optional BEX locales files that you might define in manifest
    - l: manifest.json
      e: The browser extension manifest file
    - l: my-content-script.js
      e: Standard content script BEX file - auto injected via manifest.json (you can
        have multiple scripts)
---

The difference between building a SPA, Mobile App, Electron App, BEX or SSR is simply determined by the "mode" parameter in "quasar dev" and "quasar build" commands.

## Add Quasar BEX Mode
In order to build a BEX, we first need to add the BEX mode to our Quasar project:

```bash
$ quasar mode add bex
```

If you want to jump right in and start developing, you can skip the "quasar mode" command and issue:

```bash
$ quasar dev -m bex
```

This will add BEX mode automatically, if it is missing adding a `src-bex` folder to your project.

::: tip
The `src-bex` folder is just a standard browser extension folder so you are free to use it as you would any other browser extension project folder. Please refer to supported Browser Extension documentation to learn more.

* [Firefox Browser Extension Documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
* [Google Chrome Browser Extension Documentation](https://developer.chrome.com/extensions)
* **Other Chromium Based Browsers** - Refer to their specific documentation.
:::

## Understand The Anatomy Of "src-bex"

The new folder has the following structure:

<DocTree :def="scope.tree" />

The next section will discuss these in more detail.

---
title: Configuring BEX
desc: (@quasar/app-vite) How to manage your Browser Extensions with Quasar CLI.
---

Before we can configure anything, we need to understand how the BEX is structured. A BEX can be one (or more) of the following:

1. Runs in its own tab in the browser
2. Runs in the [Developer Tools](https://developer.chrome.com/docs/extensions/how-to/devtools/extend-devtools) window.
3. Runs in a [Popup](https://developer.chrome.com/docs/extensions/develop/ui#popups) window.
4. Runs as [Options](https://developer.chrome.com/docs/extensions/develop/ui/options-page) window.
5. Runs in the context of a web page (injected into a website)

You do not need a new Quasar App per BEX type above as a single Quasar Application can run in **all** of the instances above. You can find out more about these in the [types section](/quasar-cli-vite/developing-browser-extensions/types-of-bex).

## UI in /src

Should you want to tamper with the Vite config for UI in /src:

```js /quasar.config file
module.exports = function (ctx) {
  return {
    build: {
      extendViteConf (viteConf) {
        if (ctx.mode.bex) {
          // do something with ViteConf
        }
      }
    }
  }
}
```

The UI files will be injected and available as `www` folder when you build (or develop) the browser extension.

## Manifest.json

The most important config file for your BEX is `/src-bex/manifest.json`. It is recommended that you [read up on this file](https://developer.chrome.com/extensions/manifest) before starting your project.

When you first add the BEX mode, you will get asked which Browser Extension Manifest version you like:

```
? What version of manifest would you like? (Use arrow keys)
❯ Manifest v2 (works with both Chrome and FF)
  Manifest v3 (works with Chrome only currently)
```

## Background And Content Scripts

Behind every BEX is a [content script](https://developer.chrome.com/extensions/content_scripts) and a background script / service-worker. It's a good idea to understand what each of these are before writing your first BEX.

In summary:

* **Background Script** - runs in the context of the BEX itself and can listen to all available browser extension events. There will only ever be one instance of each background script *per BEX*.
* **Content Script** - runs in the context of the web page. There will be a new content script instance per tab running the extension.

::: tip
Given content scripts run in the web page context, this means that only BEX's that interact with a web page can use content scripts. Popups, Options and Devtools **will not** have a *content script* running behind them. They will all however have a *background script*.
:::

::: warning
Service worker which is available in [Manifest v3](https://developer.chrome.com/docs/extensions/mv3/intro/), is implemented in Quasar CLI with Vite only. More details [here](https://github.com/quasarframework/quasar/discussions/8844).
:::

## CSS

Any styles you want to be made available to your web page (not your Quasar App) should be included in `src-bex/assets/content.css` as this file ia automatically injected into the `manifest.json` file.

::: warning
This must be native CSS as it's not preprocessed via Sass.
:::

---
title: Types of BEX
desc: (@quasar/app-vite) How to configure each type of Browser Extensions in Quasar.
---

As already discussed, Quasar can handle the various places where a browser extension can live, namely New Tab, Web Page, Dev Tools Options or Popup. You don't need a separate Quasar App for each of these. You can do some handy work with the router.

## New Tab

This is the default way in which a BEX will run. It is accessed by clicking on the BEX icon in your browser. The Quasar App will run in that new (blank) tab.

## Dev Tools, Options and Popup

These all follow the same pattern, set up a route and configure the `manifest.json` file to look at that route when it's trying to show either one of the types. For instance:

```js routes.js:
const routes = [
  { path: '/options', component: () => import('pages/OptionsPage.vue') },
  { path: '/popup', component: () => import('pages/PopupPage.vue') },
  { path: '/devtools', component: () => import('pages/DevToolsPage.vue') }
]
```

You could configure your `manifest.json` file with the following so the options page is loaded from that route:

#### manifest v2

```json
{
  "manifest_version": 2,

  "options_page": "www/index.html#/options", // Options Page
  "browser_action": {
    "default_popup": "www/index.html#/popup" // Popup Page
  },
  "devtools_page": "www/index.html#/devtools", // Dev Tools
}
```

#### manifest v3

```json
{
  "manifest_version": 3,

  "action": {
    "default_popup": "www/index.html#/popup" // Popup Page
  },
  "options_page": "www/index.html#/options", // Options Page
  "devtools_page": "www/index.html#/devtools", // Dev Tools
}
```

## Web Page

This is where the real power comes in. With a little ingenuity we can inject our Quasar application into a web page and use it as an overlay making it seem like our Quasar App is part of the page experience.

Here's a brief rundown of how you could achieve this:

* `src-bex/my-content-script.js`

The idea here is to create an IFrame and add our Quasar app into it, then inject that into the page.

Given our Quasar App might need to take the full height of the window (and thus stop any interaction with the underlying page) we have an event to handle setting the height of the IFrame. By default the IFrame height is just high enough to allow for the Quasar toolbar to show (and in turn allowing interaction with the rest of the page).

```js /src-bex/my-content-script.js
// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks
import { bexContent } from 'quasar/wrappers'

const
  iFrame = document.createElement('iframe'),
  defaultFrameHeight = '62px'

/**
 * Set the height of our iFrame housing our BEX
 * @param height
 */
const setIFrameHeight = height => {
  iFrame.height = height
}

/**
 * Reset the iFrame to its default height e.g The height of the top bar.
 */
const resetIFrameHeight = () => {
  setIFrameHeight(defaultFrameHeight)
}

/**
 * The code below will get everything going. Initialize the iFrame with defaults and add it to the page.
 * @type {string}
 */
iFrame.id = 'bex-app-iframe'
iFrame.width = '100%'
resetIFrameHeight()

// Assign some styling so it looks seamless
Object.assign(iFrame.style, {
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  border: '0',
  zIndex: '9999999', // Make sure it's on top
  overflow: 'visible'
})

;(function () {
  // When the page loads, insert our browser extension app.
  iFrame.src = chrome.runtime.getURL('www/index.html')
  document.body.prepend(iFrame)
})()

export default bexContent((bridge) => {
  /**
   * When the drawer is toggled set the iFrame height to take the whole page.
   * Reset when the drawer is closed.
   */
  bridge.on('wb.drawer.toggle', ({ data, respond }) => {
    if (data.open) {
      setIFrameHeight('100%')
    } else {
      resetIFrameHeight()
    }
    respond()
  })
})
```

We can call this event from our Quasar App any time we know we're opening the drawer and thus changing the height of the IFrame to allow the whole draw to be visible.

* `src-bex/assets/content.css`

Add a margin to the top of our document so our Quasar toolbar doesn't overlap the actual page content.

```css
.target-some-header-class {
  margin-top: 62px;
}
```

* `Quasar App (/src)`

Then in our Quasar app (/src), we have a function that toggles the drawer and sends an event to the content script telling it to
resize the IFrame thus allowing our whole app to be visible:

```html
<q-drawer :model-value="drawerIsOpen" @update:model-value="drawerToggled">
  Some Content
</q-drawer>
```

```js
import { useQuasar } from 'quasar'
import { ref } from 'vue'

setup () {
  const $q = useQuasar()
  const drawerIsOpen = ref(true)

  async function drawerToggled () {
    await $q.bex.send('wb.drawer.toggle', {
      open: drawerIsOpen.value // So it knows to make it bigger / smaller
    })

    // Only set this once the promise has resolved so we can see the entire slide animation.
    drawerIsOpen.value = !drawerIsOpen.value
  }

  return { drawerToggled }
}
```

Now you have a Quasar App running in a web page. You can now trigger other events from the Quasar App that the content
script can listen to and interact with the underlying page.

::: warning
Be sure to check your manifest file, especially around the reference to `my-content-script.js`. Note that **you can have multiple content scripts**. Whenever you create a new one, you need to reference it in the manifest file, and in the bex.contentScripts section of the quasar.config file.
:::
---
title: BEX Communication
desc: (@quasar/app-vite) How to communicate between different parts of your Browser Extension (BEX) in Quasar.
---
Allowing a Quasar App to communicate with the various parts of the BEX is essential. Quasar closes this gap using a `bridge`.

There are 4 areas in a BEX which will need a communication layer:

1. The Quasar App itself - this is true for all types of BEX i.e Popup, Options Page, Dev Tools or Web Page
2. Background Script
3. Content Script
4. The web page that the BEX is running on

## Communication Rules

There is a fundamental rule to understand with the communication bridge in Quasar.

**Not all BEX types have a content script** - Only BEX which run in the context of a web page will have a content script. This is how browser extensions in general work. This means if you're adding a listener for an event on a content script and trying to trigger it from a Quasar BEX running as Dev Tools, Options Page or Popup - **it won't work**.

If you want to allow your Dev Tools, Popup or Options Page BEX to communicate with a web page, you will need to use the background script as a proxy. You would do this by:

1. Adding a listener on the background script which in turn emits another event.
2. Add a listener to your Quasar App running in the Web Page context which listens for the event the background script is
raising
2. Emitting the event to your background script from your Dev Tools, Popup or Options Page.

Once you get your head around this concept, there are no limits to how the BEX can communicate with each part.

## The Bridge

The bridge is a promise based event system which is shared between all parts of the BEX and as such allows you to listen for events in your Quasar App, emit them from other parts or vice versa. This is what gives Quasar BEX mode it's power.

To access the bridge from within your Quasar App you can use `$q.bex`. In other areas, the bridge is made available via the `bridge` parameter in the respective hook files.

Let's see how it works.

### Trigger an event and wait for the response

```js
const { data } = await bridge.send('some.event', { someKey: 'aValue' })
console.log('Some response from the other side', data)
```

### Listen for an event and sending a response

You can respond to let the caller know the operation is done. You can optionally return back some data too.

```js
bridge.on('some.event', ({ data, respond }) => {
  console.log('Event receieved, responding...')
  respond(data.someKey + ' hey!')
})
```

::: warning
If you omit `respond()` the promise on `.send()` will not resolve.
:::

The Quasar bridge does some work behind the scenes to convert the normal event based communication into promises and as such, in order for the promise to resolve, we need to call `respond`.

### Clean up your listeners

```js
bridge.off('some.event', this.someFunction)
```

::: tip
The bridge also does some work to split large data which is too big to be transmitted in one go due to the browser extension 60mb data transfer limit. In order for this to happen, the payload must be an array.
:::


---
title: Background Script
desc: (@quasar/app-vite) How to communicate using your background script with other parts of your Browser Extension (BEX).
---

`src-bex/background-script.js` is essentially a standard background script and you are welcome to use it as such. Background scripts can communicate with **all** Web Pages, Dev Tools, Options and Popups running under your BEX.

The added benefit of this file is this function:

```js
import { bexBackground } from 'quasar/wrappers'

export default bexBackground((bridge, activeConnections) => {
  //
})
```

This function is called automatically via the Quasar BEX build chain and injects a bridge which is shared between all parts of the BEX meaning you can communicate with any part of your BEX.

The `bridge` param is the bridge to use for communication. The `activeConnections` param provides a map of all the BEX connections registered via the bridge i.e All the Web Page, Options, Popup and Dev Tools BEX's used by the same Quasar App.

For example, let's say we want to listen for a new tab being opened in the web browser and then react to it in our Quasar App. First, we'd need to listen for the new tab being opened and emit a new event to tell the Quasar App this has happened:

```js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  bridge.send('bex.tab.opened', { url: tab.url })
})
```

Then in our Quasar App, we'd listen for this in one of our component lifecycle hooks, like so:

```js
import { useQuasar } from 'quasar'
import { onBeforeUnmount } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    // Our function which receives the URL sent by the background script.
    function doOnTabOpened (url) {
      console.log('New Browser Tab Openend: ', url)
    }

    // Add our listener
    $q.bex.on('bex.tab.opened', doOnTabOpened)

    // Don't forget to clean it up
    onBeforeUnmount(() => {
      $q.bex.off('bex.tab.opened', doOnTabOpened)
    })

    return {}
  }
}
```

There are wide variety of events available to the browser extension background script - Google is your friend if you're trying to do something in this area.

What if you want to modify the underlying web page content in some way? That's where we'd use content scripts (eg. `my-content-scripts.js`). Let's look at that in the next section.


---
title: Content Scripts
desc: (@quasar/app-vite) How to communicate using your content script with your Quasar App and Background Script in Quasar Browser Extension mode.
---

`src-bex/my-content-script.js` is essentially a standard [content script](https://developer.chrome.com/extensions/content_scripts) and you are welcome to use it as such. Content scripts are able to access the DOM of the underlying webpage and thus you are able to manipulate the content of said page.

::: tip
You can have multiple content scripts with the name of your desire (that includes renaming the default `my-content-script.js`). Each time that you create a new one, please make sure that you reference it in `/src-bex/manifest.json`. Use the `.js` extension even if your filename ends in `.ts`.
:::

The added benefit of this file is this function:

```js
import { bexContent } from 'quasar/wrappers'

export default bexContent((bridge) => {
  //
})
```

This function is called automatically via the Quasar BEX build chain and injects a bridge which is shared between your Quasar App instance and the background script of the BEX.

For example, let's say we want to react to a button being pressed on our Quasar App and highlight some text on the underlying web page, this would be done via the content scripts like so:

```js Quasar App, /src
setup () {
  const $q = useQuasar()

  async function myButtonClickHandler () {
    await $q.bex.send('highlight.content', { selector: '.some-class' })
    $q.notify('Text has been highlighted')
  }

  return { myButtonClickHandler }
}
```

```css src-bex/assets/content.css
.bex-highlight {
    background-color: red;
}
```

```js /src-bex/my-content-script.js:
import { bexContent } from 'quasar/wrappers'

export default bexContent((bridge) => {
  bridge.on('highlight.content', ({ data, respond }) => {
    const el = document.querySelector(data.selector)
    if (el !== null) {
      el.classList.add('bex-highlight')
    }

    // Let's resolve the `send()` call's promise, this way we can await it on the other side then display a notification.
    respond()
  })
})
```

Content scripts live in an [isolated world](https://developer.chrome.com/extensions/content_scripts#isolated_world), allowing a content script to makes changes to its JavaScript environment without conflicting with the page or additional content scripts.

Isolated worlds do not allow for content scripts, the extension, and the web page to access any variables or functions created by the others. This also gives content scripts the ability to enable functionality that should not be accessible to the web page.

This is where the `dom-script` comes in.
---
title: DOM Script
desc: (@quasar/app-vite) How to communicate to the underlying web page using dom hooks in Quasar Browser Extension mode.
---

`src-bex/dom.js` is a file that is injected into the underlying web page automatically by Quasar but as with all the other hook files has access to the bridge via:

```js
import { bexDom } from 'quasar/wrappers'

export default bexDom((bridge) => {
  //
})
```

If you ever find yourself needing to inject a JS file into your underlying web page, you can use the dom script instead as it means you can maintain that chain of communication in the BEX.

For example, lets say you wanted to write a BEX that detects whether or not a Quasar app is running on a page, the only way to do this is by running some javascript in the context of the web page.

```js
// We create a new folder + file:
// src-bex/dom/detect-quasar.js

function initQuasar (bridge, quasarInstance) {
  bridge.send('quasar.detect', {
    version: quasarInstance.version,
    dark: {
      isActive: quasarInstance.dark ? quasarInstance.dark.isActive : void 0
    },
    umd: quasarInstance.umd,
    iconSet: {
      name: quasarInstance.iconSet.name,
      __installed: quasarInstance.iconSet.__installed
    },
    lang: {
      rtl: quasarInstance.lang.rtl
    }
  })
  window.__QUASAR_DEVTOOLS__ = {
    Quasar: quasarInstance
  }
}

export default function detectQuasar (bridge) {
  if (window.Quasar) { // UMD
    initQuasar(bridge, {
      version: window.Quasar.version,
      dark: window.Quasar.Dark,
      ...window.Quasar,
      umd: true
    })
  }
  else { // CLI
    let isVue3 = false
    setTimeout(() => {
      const all = document.querySelectorAll('*')
      let el
      for (let i = 0; i < all.length; i++) {
        if (all[i].__vue__ || all[i].__vue_app__) {
          el = all[i]
          isVue3 = all[i].__vue_app__ !== void 0
          break
        }
      }

      if (el) {
        const Vue = isVue3 ? el.__vue_app__ : Object.getPrototypeOf(el.__vue__).constructor

        const quasar = isVue3 ? Vue.config.globalProperties.$q : Vue.prototype.$q
        if (quasar) {
          initQuasar(bridge, quasar)
        }
      }
    }, 100)
  }
}
```

```js /src-bex/dom.js:
import { bexDom } from 'quasar/wrappers'
import detectQuasar from './dom/detect-quasar'

export default bexDom((bridge) => {
  detectQuasar(bridge)
})
```

The bridge above will notify all listeners in the BEX that Quasar has been found and along with that send the instance information.
