import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Feather, Settings } from 'lucide-react';

const navLinks = [
  { name: '首页', path: '/' },
  { name: '全部作品', path: '/works' },
  { name: '关于', path: '/about' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream-100/90 backdrop-blur-md border-b border-cream-300 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom flex items-center justify-between h-16 md:h-18">
        <Link to="/" className="flex items-center gap-2 group">
          <Feather className="w-5 h-5 text-vermilion-500 transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-display text-xl font-semibold text-ink-700 tracking-wide">
            墨染文集
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative py-1 text-sm tracking-widest uppercase transition-colors duration-300 link-underline ${
                location.pathname === link.path
                  ? 'text-vermilion-600 after:w-full'
                  : 'text-ink-500 hover:text-vermilion-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            className={`relative py-1 text-sm tracking-widest uppercase transition-colors duration-300 link-underline flex items-center gap-1.5 ${
              location.pathname === '/admin'
                ? 'text-bronze-600 after:w-full'
                : 'text-ink-400 hover:text-bronze-600'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">管理</span>
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-ink-600 hover:text-vermilion-600 transition-colors"
          aria-label="切换菜单"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-cream-100/95 backdrop-blur-lg border-b border-cream-300 overflow-hidden"
          >
            <div className="container-custom py-4 space-y-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-2 px-4 rounded-sm text-base tracking-wide transition-all duration-300 ${
                      location.pathname === link.path
                        ? 'bg-vermilion-50 text-vermilion-600 font-medium'
                        : 'text-ink-600 hover:bg-cream-200 hover:text-vermilion-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
              >
                <Link
                  to="/admin"
                  className={`block py-2 px-4 rounded-sm text-base tracking-wide transition-all duration-300 flex items-center gap-2 ${
                    location.pathname === '/admin'
                      ? 'bg-bronze-100 text-bronze-700 font-medium'
                      : 'text-ink-600 hover:bg-cream-200 hover:text-bronze-600'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  管理
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
