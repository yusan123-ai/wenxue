export type Category = 'poetry' | 'prose' | 'fiction'

export interface Work {
  id: string
  title: string
  category: Category
  categoryLabel: string
  summary: string
  content: string
  createdAt: string
  wordCount: number
  tags: string[]
  isFeatured: boolean
}

export interface WorksData {
  works: Work[]
  categories: Record<Category, {
    name: string
    icon: string
    description: string
    color: string
  }>
  authorInfo: {
    name: string
    bio: string
    avatar: string | null
  }
}
