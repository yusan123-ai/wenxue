import { useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Share2,
  Calendar,
  FileText,
  Tag,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react'
import worksData from '@/data/works.json'
import ReadingProgress from '@/components/sections/ReadingProgress'
import { formatDate, getCategoryColor } from '@/utils/helpers'
import type { Work } from '@/types/work'

export default function WorkDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const work = useMemo(() => {
    return worksData.works.find((w) => w.id === id) as Work | undefined
  }, [id])

  const currentIndex = useMemo(() => {
    if (!work) return -1
    return worksData.works.findIndex((w) => w.id === id)
  }, [work, id])

  const prevWork = currentIndex > 0 ? (worksData.works[currentIndex - 1] as Work) : null
  const nextWork = currentIndex < worksData.works.length - 1 
    ? (worksData.works[currentIndex + 1] as Work) 
    : null

  if (!work) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <BookOpen className="w-20 h-20 text-ink-200 mx-auto mb-6" />
          <h1 className="font-display-md text-ink-600 mb-4">作品未找到</h1>
          <p className="text-ink-400 mb-8">
            抱歉，您访问的作品不存在或已被删除
          </p>
          <Link
            to="/works"
            className="inline-flex items-center gap-2 px-6 py-3 bg-vermilion-500 text-white rounded-lg hover:bg-vermilion-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回作品列表
          </Link>
        </motion.div>
      </div>
    )
  }

  const categoryColor = getCategoryColor(work.category)
  const paragraphs = work.content.split('\n\n').filter(Boolean)

  return (
    <div className="min-h-screen bg-cream-100">
      <ReadingProgress />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* 顶部导航 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <button
            onClick={() => navigate('/works')}
            className="inline-flex items-center gap-2 text-ink-400 hover:text-vermilion-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            返回列表
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: work.title,
                  text: work.summary,
                  url: window.location.href
                })
              } else {
                navigator.clipboard.writeText(window.location.href)
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-ink-400 hover:text-vermilion-600 hover:bg-white rounded-lg transition-all"
          >
            <Share2 className="w-4 h-4" />
            分享
          </button>
        </motion.div>

        {/* 头部信息 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <span
            className="inline-block px-4 py-1.5 text-sm font-medium rounded-full mb-4"
            style={{
              backgroundColor: `${categoryColor}15`,
              color: categoryColor
            }}
          >
            {work.categoryLabel}
          </span>

          <h1 className="font-display-md text-ink-600 mb-6 leading-tight">
            {work.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-ink-400 text-body-sm mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(work.createdAt)}</span>
            </div>
            
            <span className="text-ink-200">|</span>
            
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>{work.wordCount}字</span>
            </div>
            
            {work.tags.length > 0 && (
              <>
                <span className="text-ink-200">|</span>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <div className="flex gap-2">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-cream-200 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div
            className="h-px w-full mb-8"
            style={{
              background: `linear-gradient(90deg, ${categoryColor}40 0%, transparent 100%)`
            }}
          />
        </motion.div>

        {/* 正文阅读区 */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="reading-content space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-body-base text-ink-600 leading-relaxed indent-[2em]"
              >
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </motion.article>

        {/* 底部操作区 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div
            className="h-px w-full mb-8"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${categoryColor}40 50%, transparent 100%)`
            }}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* 上一篇/下一篇导航 */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {prevWork ? (
                <Link
                  to={`/work/${prevWork.id}`}
                  className="flex-1 sm:flex-none inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all text-ink-600 hover:text-vermilion-600 group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden sm:inline">上一篇</span>
                </Link>
              ) : (
                <div className="flex-1 sm:flex-none" />
              )}

              {nextWork ? (
                <Link
                  to={`/work/${nextWork.id}`}
                  className="flex-1 sm:flex-none inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all text-ink-600 hover:text-vermilion-600 group"
                >
                  <span className="hidden sm:inline">下一篇</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div className="flex-1 sm:flex-none" />
              )}
            </div>

            {/* 返回作品列表按钮 */}
            <Link
              to="/works"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-vermilion-500 text-white rounded-lg hover:bg-vermilion-600 transition-colors shadow-elegant hover:shadow-elegant-lg"
            >
              <BookOpen className="w-4 h-4" />
              返回作品列表
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
