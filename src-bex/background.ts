/* eslint-disable no-console */
import { bexBackground } from 'quasar/wrappers'
import { MenuManager } from './MenuManager'

const manager = new MenuManager()
manager.reGenerateMenu()

// this one is executed every time new page opens.
export default bexBackground((bridge /* , allActiveConnections */) => {
  manager.initialize(bridge)
  manager.reGenerateMenu()

  bridge.on('update.menu', () => {
    manager.reGenerateMenu()
  })
})
