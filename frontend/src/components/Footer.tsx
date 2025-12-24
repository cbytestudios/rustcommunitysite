import React from 'react';
import { motion } from 'framer-motion';
import { Github, MessageCircle, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const links = [
    { label: 'Servers', href: '#servers' },
    { label: 'Shop', href: '/shop' },
    { label: 'Rules', href: '/rules' },
    { label: 'Discord', href: 'https://discord.gg/rustcommunity' },
    { label: 'Email', href: 'mailto:support@rustcommunity.com' },
    { label: 'Staff', href: '/staff' },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0a0a0a] border-t border-[#e04d1a]/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#e04d1a] rounded-full blur-3xl opacity-3 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={linkVariants} custom={0}>
            <h3 className="text-2xl font-black text-[#e04d1a] mb-4 neon-text tracking-wider">RUSTBORNE</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Post-apocalyptic PVE/PVP havens with weekly wipes, epic events, and endless possibilities.
            </p>
          </motion.div>

          <motion.div variants={linkVariants} custom={1}>
            <h4 className="font-black text-white mb-6 text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-3">
              {['Servers', 'Shop', 'Rules'].map((link, i) => (
                <motion.li
                  key={link}
                  custom={i}
                  variants={linkVariants}
                >
                  <a
                    href={link === 'Servers' ? '#servers' : `/${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#e04d1a] transition-colors duration-300 text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-[#e04d1a] to-[#ff6a33] group-hover:w-4 transition-all duration-300"></span>
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={linkVariants} custom={2}>
            <h4 className="font-black text-white mb-6 text-sm uppercase tracking-widest">Support</h4>
            <ul className="space-y-3">
              {[
                { label: 'Discord', href: 'https://discord.gg/rustcommunity' },
                { label: 'Email', href: 'mailto:support@rustcommunity.com' },
                { label: 'Staff', href: '/staff' },
              ].map((link, i) => (
                <motion.li
                  key={link.label}
                  custom={i}
                  variants={linkVariants}
                >
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="text-gray-400 hover:text-[#e04d1a] transition-colors duration-300 text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-[#e04d1a] to-[#ff6a33] group-hover:w-4 transition-all duration-300"></span>
                    {link.label}
                    {link.href.startsWith('http') && <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={linkVariants} custom={3}>
            <h4 className="font-black text-white mb-6 text-sm uppercase tracking-widest">Connect</h4>
            <div className="flex gap-4 mb-6">
              <motion.a
                href="https://discord.gg/rustcommunity"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg bg-[#1a1a1a] border border-[#e04d1a]/30 text-[#e04d1a] hover:bg-[#e04d1a] hover:text-white transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://github.com/rustcommunity"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg bg-[#1a1a1a] border border-[#e04d1a]/30 text-[#e04d1a] hover:bg-[#e04d1a] hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#e04d1a]/70">
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ boxShadow: ['0 0 5px #22c55e', '0 0 15px #22c55e', '0 0 5px #22c55e'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>All systems operational</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-[#e04d1a]/20 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p className="font-light">
              &copy; 2025 <span className="text-[#e04d1a] font-bold">Rustborne</span>. All rights reserved.
            </p>
            <motion.p
              className="text-[#e04d1a]/60"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Crafted with ⚡ for the community
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
