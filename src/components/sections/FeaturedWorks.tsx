import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import worksData from '@/data/works.json';

const FeaturedWorks = () => {
  const featuredWorks = worksData.works
    .filter((work) => work.isFeatured)
    .slice(0, 3);

  return (
    <section className="section-padding bg-gradient-to-b from-cream-100 to-cream-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-display-md text-ink-700 mb-4">精选推荐</h2>
          <div className="decorative-line mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Link to={`/work/${work.id}`} className="group block h-full">
                <article className="card-work h-full flex flex-col p-8 transition-all duration-500 ease-elegant hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide"
                      style={{
                        backgroundColor:
                          `${worksData.categories[work.category as keyof typeof worksData.categories]?.color}15`,
                        color:
                          worksData.categories[work.category as keyof typeof work.categories]?.color || '#2C2C2C',
                      }}
                    >
                      {work.categoryLabel}
                    </span>
                    <time
                      className="flex items-center gap-1.5 text-xs text-ink-400 font-body"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      {work.createdAt}
                    </time>
                  </div>

                  <h3 className="font-display-sm text-ink-700 mb-4 group-hover:text-vermilion-600 transition-colors duration-300 line-clamp-2">
                    {work.title}
                  </h3>

                  <p className="text-body-base text-ink-500 leading-relaxed mb-6 flex-grow line-clamp-3">
                    {work.summary}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-cream-300">
                    <span className="text-sm text-bronze-600 font-medium group-hover:text-vermilion-600 transition-colors duration-300 inline-flex items-center gap-2">
                      阅读全文
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="text-xs text-ink-400 font-body">
                      {work.wordCount} 字
                    </span>
                  </div>

                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-vermilion-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
