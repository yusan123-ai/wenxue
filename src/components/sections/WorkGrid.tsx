import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, FileText } from 'lucide-react'
import type { Work } from '@/types/work'
import { formatDate, getCategoryColor } from '@/utils/helpers'

interface WorkGridProps {
  works: Work[]
  showCategory?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export default function WorkGrid({ works, showCategory = true }: WorkGridProps) {
  if (works.length === 0) {
    return null
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {works.map((work) => {
        const categoryColor = getCategoryColor(work.category)
        
        return (
          <motion.div key={work.id} variants={cardVariants}>
            <Link
              to={`/work/${work.id}`}
              className="group block bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 ease-elegant overflow-hidden hover:-translate-y-1"
            >
              <div
                className="h-1 w-full"
                style={{ backgroundColor: categoryColor }}
              />
              
              <div className="p-6">
                {showCategory && (
                  <span
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-3"
                    style={{
                      backgroundColor: `${categoryColor}15`,
                      color: categoryColor
                    }}
                  >
                    {work.categoryLabel}
                  </span>
                )}
                
                <h3 className="font-display-sm font-medium text-ink-600 mb-3 group-hover:text-vermilion-600 transition-colors">
                  {work.title}
                </h3>
                
                <p className="text-ink-500 text-body-sm line-clamp-3 mb-4">
                  {work.summary}
                </p>
                
                <div className="flex items-center justify-between text-ink-300 text-sm pt-4 border-t border-cream-200">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(work.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    <span>{work.wordCount}字</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
