import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Feather, BookOpen, ScrollText } from 'lucide-react';
import { useWorks } from '@/context/WorksContext';

const iconMap: Record<string, React.ComponentType<{ className?: string; color?: string }>> = {
  feather: Feather,
  'book-open': BookOpen,
  'scroll-text': ScrollText,
};

const CategoryNav = () => {
  const { works, categories: catConfig } = useWorks();
  const categoryEntries = Object.entries(catConfig);

  return (
    <section className="section-padding bg-cream-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-display-md text-ink-700 mb-4">探索文字的世界</h2>
          <div className="decorative-line mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categoryEntries.map(([key, category], index) => {
            const IconComponent = iconMap[category.icon];
            const workCount = works.filter(
              (work) => work.category === key
            ).length;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <Link
                  to={`/works/${key}`}
                  className="group block h-full"
                >
                  <div
                    className="relative h-full rounded-sm bg-white border-elegant p-8 md:p-10 transition-all duration-500 ease-elegant hover:-translate-y-2 hover:shadow-card-hover"
                    style={{
                      borderColor: `${category.color}20`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        category.color;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        `${category.color}20`;
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${category.color}15`,
                      }}
                    >
                      {IconComponent && (
                        <IconComponent
                          className="w-7 h-7 transition-colors duration-300"
                          color={category.color}
                        />
                      )}
                    </div>

                    <h3
                      className="font-display-sm text-ink-700 mb-3 transition-colors duration-300 group-hover:text-vermilion-600"
                    >
                      {category.name}
                    </h3>

                    <p className="text-body-base text-ink-500 mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    <div
                      className="flex items-center gap-2 text-sm font-medium transition-colors duration-300"
                      style={{ color: category.color }}
                    >
                      <span>{workCount} 篇作品</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ color: category.color }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;
