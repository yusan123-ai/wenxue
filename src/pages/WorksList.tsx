import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, BookOpen } from 'lucide-react'
import WorkGrid from '@/components/sections/WorkGrid'
import type { Category, Work } from '@/types/work'
import { useWorks } from '@/context/WorksContext'

const categories: { key: Category | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'poetry', label: '诗歌' },
  { key: 'prose', label: '散文' },
  { key: 'fiction', label: '小说' }
]

export default function WorksList() {
  const { category } = useParams<{ category?: string }>()
  const { works, categories: catConfig } = useWorks()
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(
    (category as Category) || 'all'
  )

  const filteredWorks = useMemo(() => {
    if (activeCategory === 'all') {
      return works
    }
    return works.filter((work) => work.category === activeCategory)
  }, [works, activeCategory])

  const pageTitle = activeCategory === 'all'
    ? '文学作品'
    : catConfig[activeCategory as Category]?.name || '文学作品'

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* 顶部区域 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display-md text-ink-600 mb-2">
                {pageTitle}
              </h1>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-ink-400 hover:text-vermilion-600 transition-colors text-sm"
              >
                <Home className="w-4 h-4" />
                返回首页
              </Link>
            </div>
            <BookOpen className="w-8 h-8 text-vermilion-500 opacity-50" />
          </div>

          {/* 筛选栏 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-lg p-4 shadow-card">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.key
                      ? 'bg-vermilion-500 text-white shadow-elegant'
                      : 'bg-cream-100 text-ink-500 hover:bg-cream-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <span className="text-ink-400 text-sm">
              共 <span className="text-vermilion-600 font-medium">{filteredWorks.length}</span> 篇作品
            </span>
          </div>
        </motion.div>

        {/* 作品网格或空状态 */}
        <AnimatePresence mode="wait">
          {filteredWorks.length > 0 ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WorkGrid works={filteredWorks} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <BookOpen className="w-16 h-16 text-ink-200 mx-auto mb-4" />
              <h3 className="font-display-sm text-ink-400 mb-2">暂无作品</h3>
              <p className="text-ink-300 text-body-sm">
                该分类下还没有作品，敬请期待
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
