export type ContextType = 'all' | 'page' | 'frame' | 'selection' | 'link' | 'editable' | 'image' | 'video' | 'audio' | 'launcher' | 'browser_action' | 'page_action' | 'action';
// See also:
// declare namespace chrome.contextMenus
// interface CreateProperties
export interface MainMenuItem {
  id: string
  title: string,
  contexts: ContextType | ContextType[],
}

export interface MenuItem extends MainMenuItem{
  parentId?: string
}
