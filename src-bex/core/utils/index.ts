import { EventData } from '../types'

export const contentScriptListener = (data: EventData) => {
  const { activeElement } = document

  const content = `${data?.text?.content}`
  if (activeElement && ['INPUT', 'TEXTAREA'].includes(activeElement.tagName) && (activeElement as HTMLInputElement | HTMLTextAreaElement).value !== undefined) {
    (activeElement as HTMLInputElement | HTMLTextAreaElement).value += content
    activeElement.dispatchEvent(new Event('input', { bubbles: true })) // To trigger any bound event listeners
  }
}
