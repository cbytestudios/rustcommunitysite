import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { SERVER_CONFIG } from '../config';
import ServerCard from './ServerCard';
import { Flame, Swords } from 'lucide-react';

export const ServersSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = React.useState<'all' | 'pvp' | 'pve'>('all');
  const [region, setRegion] = React.useState<'all' | 'NA' | 'EU' | 'AS'>('all');

  const filteredServers = SERVER_CONFIG.filter((server) => {
    if (filter !== 'all' && server.mode.toLowerCase() !== filter) return false;
    if (region !== 'all' && server.region !== region) return false;
    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={containerRef} id="servers" className="w-full py-24 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] relative overflow-hidden">
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-[#e04d1a] rounded-full blur-3xl opacity-10"
        animate={{
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{ x: '-50%', y: '-50%' }}
      ></motion.div>
      <motion.div 
        className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#e04d1a] rounded-full blur-3xl opacity-5"
        animate={{
          opacity: [0.02, 0.08, 0.02],
          x: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#e04d1a] rounded-full blur-3xl opacity-10"
        animate={{
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        style={{ x: '50%', y: '50%' }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#e04d1a] rounded-full blur-3xl opacity-5"
        animate={{
          opacity: [0.02, 0.08, 0.02],
          x: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.320, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-xs md:text-sm font-mono text-[#e04d1a] tracking-[2px] uppercase">
              ⚡ Choose Your Realm ⚡
            </span>
          </motion.div>
          <motion.h2
            className="text-5xl md:text-7xl font-black mb-6 tracking-wider text-white relative"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            animate={{
              textShadow: [
                '0 0 10px #e04d1a, 0 0 20px #e04d1a, 0 0 30px #e04d1a',
                '0 0 20px #e04d1a, 0 0 40px #e04d1a, 0 0 60px #e04d1a, 0 0 80px rgba(224, 77, 26, 0.8)',
                '0 0 30px #e04d1a, 0 0 60px #e04d1a, 0 0 90px rgba(224, 77, 26, 0.6)',
                '0 0 10px #e04d1a, 0 0 20px #e04d1a, 0 0 30px #e04d1a',
              ],
            }}
            transition={{
              opacity: { duration: 0.8, ease: [0.23, 1, 0.320, 1] },
              scale: { duration: 0.8, ease: [0.23, 1, 0.320, 1] },
              y: { duration: 0.8, ease: [0.23, 1, 0.320, 1] },
              textShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
            viewport={{ once: true }}
          >
            <span className="relative inline-block">
              ACTIVE REALMS
              <motion.span
                className="absolute inset-0 text-[#e04d1a] opacity-0"
                animate={{
                  opacity: [0, 0.3, 0.6, 0.3, 0],
                  x: [-2, 2, -2, 2, -2],
                }}
                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
              >
                ACTIVE REALMS
              </motion.span>
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto font-light text-base md:text-lg leading-relaxed"
            variants={itemVariants}
          >
            Choose your battlefield. Fresh wipes, epic events, and endless possibilities await.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-16 px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex gap-2 flex-wrap justify-center">
            {(['all', 'pvp', 'pve'] as const).map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative px-5 py-3 rounded-lg font-bold text-sm transition-all uppercase tracking-widest border-2 overflow-hidden ${
                  filter === f
                    ? 'bg-[#e04d1a] text-white border-[#ff6a33]'
                    : 'bg-[#1a1a1a]/50 text-gray-300 border-[#e04d1a]/30 hover:border-[#e04d1a]/60'
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={filter === f ? { y: 4, boxShadow: '0 12px 24px rgba(224, 77, 26, 0.6), 0 0 30px rgba(224, 77, 26, 0.8)' } : { y: 0, boxShadow: 'none' }}
                transition={filter === f ? { duration: 0.3 } : { duration: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="flex items-center gap-2 relative z-10">
                  {f === 'pvp' && <Swords className="w-4 h-4" />}
                  {f === 'pve' && <Flame className="w-4 h-4" />}
                  {f.toUpperCase()}
                </span>
                {filter === f && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rounded-lg"
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {(['all', 'NA', 'EU', 'AS'] as const).map((r) => (
              <motion.button
                key={r}
                onClick={() => setRegion(r)}
                className={`relative px-5 py-3 rounded-lg font-bold text-sm transition-all uppercase tracking-widest border-2 overflow-hidden ${
                  region === r
                    ? 'bg-[#e04d1a] text-white border-[#ff6a33]'
                    : 'bg-[#1a1a1a]/50 text-gray-300 border-[#e04d1a]/30 hover:border-[#e04d1a]/60'
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={region === r ? { y: 4, boxShadow: '0 12px 24px rgba(224, 77, 26, 0.6), 0 0 30px rgba(224, 77, 26, 0.8)' } : { y: 0, boxShadow: 'none' }}
                transition={region === r ? { duration: 0.3 } : { duration: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="relative z-10">{r}</span>
                {region === r && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rounded-lg"
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {filteredServers.map((server, idx) => (
            <motion.div key={server.id} variants={itemVariants}>
              <ServerCard server={server} />
            </motion.div>
          ))}
        </motion.div>

        {filteredServers.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-400 text-lg">No servers found matching your filters.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServersSection;
