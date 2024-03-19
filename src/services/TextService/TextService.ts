import {
  CategoryEntity, CategoryEntityStub, TextEntity, TextEntityStub,
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
  static createCategory(category: CategoryEntityStub = {}): CategoryEntity {
    const res = {
      id: randomUID(),
      title: '',
      ...category,
    }

    return res
  }

  // add text to category
  static addTextToCategory(category: CategoryEntity, text: TextEntity): TextEntity {
    text.category = category.id
    return text
  }
}
