import type { Category } from '@/types/work'

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}年${month}月${day}日`
}

export function getWordCount(text: string): number {
  const chineseChars = text.replace(/[^\u4e00-\u9fa5]/g, '').length
  const otherChars = text.replace(/[\u4e00-\u9fa5\s]/g, '').length
  return chineseChars + Math.ceil(otherChars / 2)
}

export function getCategoryColor(category: Category): string {
  const colorMap: Record<Category, string> = {
    poetry: '#B54434',
    prose: '#A68A56',
    fiction: '#2C2C2C'
  }
  return colorMap[category] || '#B54434'
}
