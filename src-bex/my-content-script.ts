import { bexContent } from 'quasar/wrappers'
import { EventData } from './types'

// TODO: fix later
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const listener = ({ data, respond } : {data: EventData, respond: any}) => {
  const { activeElement } = document

  if (activeElement && 'value' in activeElement) {
    const contentToAdd = data?.text?.content || ''
    activeElement.value += contentToAdd

    activeElement.dispatchEvent(new Event('input', { bubbles: true }))
  }

  respond({ ok: true })
}

export default bexContent((bridge) => {
  bridge.off('insert.text', listener)
  bridge.on('insert.text', listener)
})
