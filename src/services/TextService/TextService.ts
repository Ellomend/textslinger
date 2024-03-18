import {
  CategoryEntity, TextEntity, TextEntityStub,
} from './BaseTypes'
import { randomUID } from './TextUtils'

export class TextService {
  static createText(text: TextEntityStub = {}): TextEntity {
    return {
      id: randomUID(),
      title: '',
      content: '',
      category: null,
      ...text,
    }
  }

  // create category
  static createCategory(): CategoryEntity {
    const res = {
      id: randomUID(),
      title: '',
    }

    return res
  }

  // add text to category
  static addTextToCategory(category: CategoryEntity, text: TextEntity): TextEntity {
    text.category = category.id
    return text
  }
}
