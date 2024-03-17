import {
  CategoryEntity, CategoryEntityStub, TextEntity, TextEntityStub,
} from './BaseTypes'
import { randomParagraph, randomTitle, randomUID } from './TextUtils'

export class TextService {
  static textFactory(text: TextEntityStub = {}): TextEntity {
    return {
      id: randomUID(),
      title: randomTitle(),
      content: randomParagraph(),
      category: null,
      ...text,
    }
  }

  // create category
  static categoryFactory(category: CategoryEntityStub = {}): CategoryEntity {
    const res = {
      id: randomUID(),
      title: randomTitle(),
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
