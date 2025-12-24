import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search, Shield, Swords, Flame, AlertCircle } from 'lucide-react';

export const RulesPage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>('general');
  const [searchQuery, setSearchQuery] = useState('');

  const rules = {
    general: {
      title: 'General Rules',
      icon: Shield,
      color: 'from-[#e04d1a] to-[#ff6a33]',
      items: [
        'No hacking, exploits, or cheating of any kind',
        'Respect all players and admins',
        'No spam in chat or Discord',
        'No hate speech or discriminatory language',
        'English in chat for server communication',
        'No advertising other servers',
      ],
    },
    pve: {
      title: 'PVE Rules',
      icon: Flame,
      color: 'from-[#ff6a33] to-[#e04d1a]',
      items: [
        'No griefing or blocking others',
        'Build away from others when possible',
        'Quarry/mining limits enforce fairness',
        'Share resources in safe zones',
        'No claiming large areas for no reason',
        'Help new players when you can',
      ],
    },
    pvp: {
      title: 'PVP Rules',
      icon: Swords,
      color: 'from-[#e04d1a] to-[#ff6a33]',
      items: [
        'No offline raiding (raiding during off-hours)',
        'Spawnkilling is prohibited',
        'No repeated targeting of new players',
        'Mega base building is allowed but monitored',
        'Clan limits: Max 5 players per clan',
        'TC stacking limited to 2 layers',
      ],
    },
  };

  const getFilteredRules = () => {
    if (!searchQuery.trim()) return rules;

    const query = searchQuery.toLowerCase();
    const filtered: Record<string, any> = {};

    Object.entries(rules).forEach(([key, section]) => {
      const matchedItems = section.items.filter(item =>
        item.toLowerCase().includes(query)
      );

      if (
        section.title.toLowerCase().includes(query) ||
        matchedItems.length > 0
      ) {
        filtered[key] = {
          ...section,
          items: matchedItems.length > 0 ? matchedItems : section.items,
        };
      }
    });

    return Object.keys(filtered).length > 0 ? filtered : rules;
  };

  const filteredRules = useMemo(getFilteredRules, [searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] pt-24 pb-20 relative overflow-hidden">
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
        className="absolute top-1/2 right-0 w-96 h-96 bg-[#e04d1a] rounded-full blur-3xl opacity-10"
        animate={{
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        style={{ x: '50%', y: '-50%' }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#e04d1a] rounded-full blur-3xl opacity-5"
        animate={{
          opacity: [0.02, 0.08, 0.02],
          x: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      ></motion.div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.320, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-xs md:text-sm font-mono text-[#e04d1a] tracking-[2px] uppercase">
              ⚖️ Server Rules ⚖️
            </span>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-8xl font-black mb-6 tracking-wider text-white relative"
            animate={{
                textShadow: [
                  '0 0 10px #e04d1a, 0 0 20px #e04d1a, 0 0 30px #e04d1a',
                  '0 0 20px #e04d1a, 0 0 40px #e04d1a, 0 0 60px #e04d1a, 0 0 80px rgba(224, 77, 26, 0.8)',
                  '0 0 30px #e04d1a, 0 0 60px #e04d1a, 0 0 90px rgba(224, 77, 26, 0.6)',
                  '0 0 10px #e04d1a, 0 0 20px #e04d1a, 0 0 30px #e04d1a',
                ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
              RUSTCOMMUNITY RULES
          </motion.h1>
          <motion.p
            className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto font-light tracking-wide"
            variants={itemVariants}
          >
            Keep the wasteland fair and fun for everyone. Read carefully and follow all guidelines.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative mb-12"
              className="inline-block bg-[#e04d1a] hover:bg-[#ff6a33] text-white font-black py-3 px-8 rounded-lg transition-all duration-300 relative overflow-hidden shadow-lg shadow-[#e04d1a]/60"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
              APPEAL ON DISCORD
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#e04d1a] w-5 h-5" />
            <input
              type="text"
              placeholder="Search rules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#e04d1a]/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#e04d1a] transition-all duration-300 shadow-lg shadow-[#e04d1a]/20"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rounded-lg pointer-events-none"
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {Object.entries(filteredRules).map(([key, section]) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={key}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  className="relative"
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#e04d1a]/20 to-[#ff6a33]/20 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-1000"></div>

                  <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#e04d1a]/50 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpanded(expanded === key ? null : key)}
                      className="w-full p-6 flex items-center justify-between hover:bg-[#e04d1a]/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <IconComponent className="w-8 h-8 text-[#e04d1a]" />
                        </motion.div>
                        <motion.h2 
                          className="text-2xl font-black text-white tracking-wide"
                          animate={{
                            textShadow: expanded === key 
                              ? ['0 0 5px #e04d1a', '0 0 15px #e04d1a', '0 0 5px #e04d1a']
                              : 'none'
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          {section.title}
                        </motion.h2>
                      </div>
                      <motion.div
                        animate={{ rotate: expanded === key ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-6 h-6 text-[#e04d1a]" />
                      </motion.div>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{ height: expanded === key ? 'auto' : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-3 border-t-2 border-[#e04d1a]/30 pt-6">
                        {section.items.map((item: string, idx: number) => (
                          <motion.div 
                            key={item} 
                            className="flex gap-3 items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={expanded === key ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <motion.div 
                              className="w-2 h-2 bg-[#e04d1a] rounded-full mt-2 flex-shrink-0"
                              animate={{
                                boxShadow: ['0 0 5px #e04d1a', '0 0 10px #e04d1a', '0 0 5px #e04d1a'],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            ></motion.div>
                            <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="relative mt-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#e04d1a]/30 to-[#ff6a33]/30 rounded-xl blur opacity-75"></div>
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#e04d1a]/60 rounded-lg p-8 text-center">
            <motion.div
              className="flex justify-center mb-4"
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <AlertCircle className="w-10 h-10 text-[#e04d1a]" />
            </motion.div>
            <motion.h3 
              className="text-3xl font-black text-white mb-4 tracking-wide"
              animate={{
                textShadow: [
                  '0 0 10px #e04d1a',
                  '0 0 20px #e04d1a, 0 0 30px rgba(224, 77, 26, 0.6)',
                  '0 0 10px #e04d1a',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Enforcement
            </motion.h3>
            <p className="text-gray-300 mb-6 text-base leading-relaxed">
              Violations will result in <span className="text-[#e04d1a] font-bold">warnings, mutes, temporary bans, or permanent bans</span> depending on severity. Appeals can be made on our Discord server.
            </p>
            <motion.a
              href="https://discord.gg/rustcommunity"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[#e04d1a] hover:bg-[#ff6a33] text-white font-black py-3 px-8 rounded-lg transition-all duration-300 relative overflow-hidden shadow-lg shadow-[#e04d1a]/60"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 0 15px rgba(224, 77, 26, 0.4)', '0 0 30px rgba(224, 77, 26, 0.8)', '0 0 15px rgba(224, 77, 26, 0.4)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              APPEAL ON DISCORD
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                animate={{ x: ['100%', '-100%'] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RulesPage;
