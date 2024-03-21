import { bexContent } from 'quasar/wrappers'
import { EventData } from './types'

// TODO: fix later
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const listener = ({ data, respond } : {data: EventData, respond: any}) => {
  const { activeElement } = document

  const content = `${data?.text?.content}`
  if (activeElement && ['INPUT', 'TEXTAREA'].includes(activeElement.tagName) && (activeElement as HTMLInputElement | HTMLTextAreaElement).value !== undefined) {
    (activeElement as HTMLInputElement | HTMLTextAreaElement).value += content
    activeElement.dispatchEvent(new Event('input', { bubbles: true })) // To trigger any bound event listeners
  }
  respond({ ok: true })
}

export default bexContent((bridge) => {
  bridge.off('insert.text', listener)
  bridge.on('insert.text', listener)
})
