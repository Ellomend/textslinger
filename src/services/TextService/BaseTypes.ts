export interface TextEntity {
  id: string
  title: string
  content: string
  category: string | null
}

export interface CategoryEntity {
  id: string
  title: string
}

export interface TextEntityStub {
  id?: string
  title?: string
  content?: string
  category?: string | null
}

export interface CategoryEntityStub {
  id?: string
  title?: string
}
