// Hooks added here have a bridge allowing communication between
// the Web Page and the BEX Content Script.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/dom-hooks
import { bexDom } from 'quasar/wrappers'

console.log('dom1')

export default bexDom((/* bridge */) => {
  console.log('dom2')

  /*
  bridge.send('message.to.quasar', {
    worked: true
  })
  */
})
