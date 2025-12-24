import React from 'react';
import { motion } from 'framer-motion';
import { RANKS } from '../config';
import { ShoppingCart, Crown, Zap, Target } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const handlePurchase = (tier: string, price: number) => {
    window.location.href = `https://rustborne.tebex.io?product=${tier.toLowerCase()}`;
  };

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

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
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
              ⚡ Premium Ranks ⚡
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
            BECOME LEGEND
          </motion.h1>
          <motion.p
            className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto font-light tracking-wide"
            variants={itemVariants}
          >
            Unlock exclusive perks and dominate. Choose your tier and rise above the rest.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {RANKS.map((rank, idx) => (
            <motion.div
              key={rank.tier}
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              className="relative group"
            >
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-[#e04d1a] to-[#ff6a33] rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-1000"
                animate={{
                  opacity: idx === 0 ? [0.3, 0.6, 0.3] : [0, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>

              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#e04d1a]/50 rounded-lg overflow-hidden p-8 text-center h-full flex flex-col">
                {idx === 0 && (
                  <motion.div
                    className="absolute top-0 right-0 bg-[#e04d1a] text-white px-4 py-2 text-xs font-black tracking-wide rounded-bl-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    BEST VALUE
                  </motion.div>
                )}

                <motion.div
                  className="mb-4"
                  animate={{ rotate: [0, -2, 2, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {idx === 0 && <Crown className="w-8 h-8 text-[#e04d1a] mx-auto mb-2" />}
                  {idx === 1 && <Zap className="w-8 h-8 text-[#e04d1a] mx-auto mb-2" />}
                  {idx === 2 && <Target className="w-8 h-8 text-[#e04d1a] mx-auto mb-2" />}
                  {idx === 3 && <ShoppingCart className="w-8 h-8 text-[#e04d1a] mx-auto mb-2" />}
                </motion.div>

                <motion.h3 
                  className="text-3xl font-black mb-3 text-[#e04d1a] tracking-wide"
                  animate={{
                    textShadow: [
                      '0 0 5px #e04d1a',
                      '0 0 15px #e04d1a, 0 0 25px rgba(224, 77, 26, 0.6)',
                      '0 0 5px #e04d1a',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {rank.tier}
                </motion.h3>

                <motion.div className="mb-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    <span className="text-5xl font-black text-white">${rank.price}</span>
                    <span className="text-gray-400 text-sm font-light">/month</span>
                  </motion.div>
                </motion.div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {rank.perks.map((perk, pidx) => (
                    <motion.li 
                      key={perk} 
                      className="flex items-center justify-center gap-3 text-gray-300"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: pidx * 0.05 }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-[#e04d1a] rounded-full flex-shrink-0"
                        animate={{
                          boxShadow: ['0 0 5px #e04d1a', '0 0 15px #e04d1a', '0 0 5px #e04d1a'],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                      <span className="text-sm">{perk}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => handlePurchase(rank.tier, rank.price)}
                  className="w-full bg-[#e04d1a] hover:bg-[#ff6a33] text-white font-black py-3 px-4 rounded-lg transition-all duration-300 relative overflow-hidden shadow-lg shadow-[#e04d1a]/60"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ boxShadow: ['0 0 15px rgba(224, 77, 26, 0.4)', '0 0 30px rgba(224, 77, 26, 0.8)', '0 0 15px rgba(224, 77, 26, 0.4)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    BUY NOW
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { 
              title: 'Exclusive Gear', 
              desc: 'Premium loadouts, custom cosmetics, and unique skins',
              icon: '⚔️'
            },
            { 
              title: 'VIP Treatment', 
              desc: 'Priority server slots, custom titles, and special perks',
              icon: '👑'
            },
            { 
              title: 'Support Us', 
              desc: 'Keep servers running, fund new features, and community events',
              icon: '🚀'
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 border-2 border-[#e04d1a]/40 rounded-lg p-6 backdrop-blur-md h-full hover:border-[#e04d1a]/80 transition-all duration-300">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-black text-[#e04d1a] mb-3 tracking-wide">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e04d1a] to-transparent"
                  animate={{ width: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#e04d1a]/20 to-[#ff6a33]/20 rounded-xl blur opacity-75"></div>
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#e04d1a]/50 rounded-lg p-8 text-center">
            <motion.h2 
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
              Questions?
            </motion.h2>
            <p className="text-gray-300 mb-6">Join our Discord community for support and exclusive announcements.</p>
            <motion.a
              href="https://discord.gg/rustborne"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[#e04d1a] hover:bg-[#ff6a33] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg shadow-[#e04d1a]/60"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              JOIN DISCORD
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopPage;
