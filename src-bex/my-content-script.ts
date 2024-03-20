// Hooks added here have a bridge allowing communication between
// the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

import { bexContent } from 'quasar/wrappers'
import { contentScriptListener } from './core/utils'

export default bexContent((bridge) => {
  // Hook into the bridge to listen for events sent from the client BEX.
  bridge.once('insert.text', ({ data, respond }) => {
    contentScriptListener(data)
    respond({ ok: true })
  })
})
