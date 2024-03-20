// Hooks added here have a bridge allowing communication between
// the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

import { bexContent } from 'quasar/wrappers'
import { EventData } from './types'

const listener = ({ data, respond } : {data: EventData, respond: any}) => {
  console.log('CS: listener1')

  const { activeElement } = document

  const content = `${data?.text?.content}`
  if (activeElement && ['INPUT', 'TEXTAREA'].includes(activeElement.tagName) && (activeElement as HTMLInputElement | HTMLTextAreaElement).value !== undefined) {
    (activeElement as HTMLInputElement | HTMLTextAreaElement).value += content
    activeElement.dispatchEvent(new Event('input', { bubbles: true })) // To trigger any bound event listeners
  }
  console.log('CS: listener9')
  respond({ ok: true })
}
console.log('CS: 1')

export default bexContent((bridge) => {
  console.log('CS: bexContent 1')

  console.log('CS: off 1')

  bridge.off('insert.text', listener)

  // bridge.on('insert.text', ({ data, respond }) => {
  //   insertTextIntoField(data)
  //   respond({ ok: true })
  // })
  console.log('CS: on1')
  bridge.on('insert.text', listener)
  console.log('CS: bexContent 0')
})
