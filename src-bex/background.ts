/* eslint-disable no-console */
import { bexBackground } from 'quasar/wrappers'
import { MenuManager } from './MenuManager'

console.warn('BG: bg1')

console.log('BG: create menu manager')
const manager = new MenuManager()
manager.reGenerateMenu()

// this one is executed every time new page opens.
export default bexBackground((bridge /* , allActiveConnections */) => {
  console.log('BG: bg3 bex background 1')
  manager.initialize(bridge)
  manager.reGenerateMenu()

  bridge.on('update.menu', () => {
    console.warn('BG: update  menu')
    manager.reGenerateMenu()
  })
  console.log('BG: bg4 bex backround 0')
})
