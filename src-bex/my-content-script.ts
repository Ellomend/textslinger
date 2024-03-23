import { bexContent } from 'quasar/wrappers'
import { EventData } from './types'

// TODO: fix later
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const listener = ({ data, respond } : {data: EventData, respond: any}) => {
  const { activeElement } = document

  // Ensuring the activeElement exists and is either an input or a textarea element.
  if (activeElement && 'value' in activeElement) {
    // Appending the text content from the event data to the value of the active element.
    const contentToAdd = data?.text?.content || ''
    activeElement.value += contentToAdd

    // Dispatching an input event to trigger any bound event listeners, ensuring it bubbles.
    activeElement.dispatchEvent(new Event('input', { bubbles: true }))
  }

  respond({ ok: true })
}

export default bexContent((bridge) => {
  bridge.off('insert.text', listener)
  bridge.on('insert.text', listener)
})
