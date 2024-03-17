import { CategoryEntity, CategoryEntityStub, TextEntity, TextEntityStub } from './BaseTypes';
import { randomParagraph, randomTitle, randomUID } from './TextUtils';

export class TextService {
  static textFactory(text: TextEntityStub = {}): TextEntity {
    return {
      id: randomUID(),
      title: randomTitle(),
      content: randomParagraph(),
      category: null,
      ...text
    }
  }

  // create category
  static categoryFactory(category: CategoryEntityStub = {}): CategoryEntity {
    const res = {
      id: randomUID(),
      title: randomTitle(),
      ...category
    }
    return res
  }
  // add text to category
  static addTextToCategory(category: CategoryEntity, text: TextEntity): TextEntity {
    text.category = category.id
    return text
  }

  // fake data
  // TODO: for prototyping purposes only, remove after
  static fakeData(): { categories: CategoryEntity[], texts: TextEntity[] } {
    const categories = [
      TextService.categoryFactory(),
      TextService.categoryFactory(),
      TextService.categoryFactory(),
      TextService.categoryFactory(),
    ]
    // for each category add 5 texts using textFactory
    const texts: TextEntity[] = [];

    categories.forEach(category => {
      for (let i = 0; i < 5; i++) {
        let text = this.textFactory();
        text = this.addTextToCategory(category, text);
        texts.push(text);
      }
    });

    return { categories, texts };
  }
}