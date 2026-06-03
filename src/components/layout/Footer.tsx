import { motion } from 'framer-motion';
import { Feather, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-cream-200/50 border-t border-cream-300">
      <div className="container-custom py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Feather className="w-5 h-5 text-vermilion-500" />
            <h3 className="font-display text-xl font-semibold text-ink-700 tracking-wide">
              墨染
            </h3>
          </div>

          <p className="font-body text-base text-ink-500 italic mb-8">
            以文字为舟，渡红尘之海
          </p>

          <div className="flex items-center justify-center mb-8">
            <div className="decorative-line" />
            <Heart className="w-4 h-4 text-vermilion-500 mx-4 animate-pulse-slow" />
            <div className="decorative-line" />
          </div>

          <p className="font-body text-sm text-ink-400 tracking-wide">
            © {currentYear} 墨染 · 保留所有权利
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze-400/40 to-transparent" />
    </footer>
  );
}
