import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ExternalLink } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Servers', href: '/#servers' },
    { label: 'Shop', href: '/shop' },
    { label: 'Rules', href: '/rules' },
    { label: 'Staff', href: '/staff' },
  ];

  const isActive = (href: string) => location.pathname === href || location.hash === href;

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/98 border-b border-[#e04d1a]/30 shadow-lg shadow-[#e04d1a]/10'
          : 'bg-[#0f0f0f]/50 border-b border-[#e04d1a]/10'
      } backdrop-blur-xl`}
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group relative"
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="/logo.png"
              alt="Rustcommunity"
              className="h-10 w-10 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <motion.div
              className="absolute inset-0 bg-[#e04d1a] rounded-full blur-md opacity-0 group-hover:opacity-50"
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <motion.span
            className="text-xl md:text-2xl font-bold text-[#e04d1a] tracking-wider neon-text"
            whileHover={{ textShadow: '0 0 20px #e04d1a, 0 0 40px #e04d1a' }}
            transition={{ duration: 0.3 }}
          >
            RUSTCOMMUNITY
          </motion.span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={navVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                to={item.href}
                className={`font-inter text-sm font-bold transition-all duration-300 relative group ${
                  isActive(item.href)
                    ? 'text-[#e04d1a]'
                    : 'text-gray-400 hover:text-[#ff6a33]'
                }`}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#e04d1a] to-[#ff6a33]"
                  initial={{ width: 0 }}
                  animate={{
                    width: isActive(item.href) ? '100%' : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
          <motion.a
            href="https://discord.gg/rustcommunity"
            target="_blank"
            rel="noreferrer"
            className="btn-primary flex items-center gap-2 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">DISCORD</span>
            <ExternalLink className="w-4 h-4 relative z-10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30"
              animate={{ x: [-100, 100] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </motion.a>
        </div>

        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#e04d1a] p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </nav>

      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? 'auto' : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border-t border-[#e04d1a]/20"
      >
        <div className="p-5 space-y-3">
          {navItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-all font-inter text-sm font-bold ${
                  isActive(item.href)
                    ? 'bg-[#e04d1a]/20 text-[#e04d1a] border border-[#e04d1a]/50'
                    : 'text-gray-300 hover:text-[#e04d1a] hover:bg-[#e04d1a]/10'
                }`}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <motion.a
            href="https://discord.gg/rustcommunity"
            target="_blank"
            rel="noreferrer"
            className="btn-primary w-full text-center flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            DISCORD <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
