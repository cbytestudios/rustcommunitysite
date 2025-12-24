import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Clock, Gamepad2, Flame } from 'lucide-react';
import toast from 'react-hot-toast';
import { calculateWipeCountdown, getPlayerPercentage, fetchPlayerCount } from '../services/battlemetrics';
import type { ServerConfig } from '../config';

interface ServerCardProps {
  server: ServerConfig;
}

export const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  const [players, setPlayers] = useState({ current: 0, max: 0 });
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const wipeCountdown = calculateWipeCountdown(server.nextWipe);
  const playerPercentage = getPlayerPercentage(players.current, players.max);
  
  const imageUrl = `/servers/${server.id}.jpg`;

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      const data = await fetchPlayerCount(server.id);
      setPlayers(data);
      setLoading(false);
    };

    fetchPlayers();
    const interval = setInterval(fetchPlayers, 30000);
    return () => clearInterval(interval);
  }, [server.id]);

  const handleConnect = () => {
    const steamConnect = `steam://connect/${server.ip}:${server.port}`;
    navigator.clipboard.writeText(steamConnect);
    toast.success(`Connect command copied! Paste in Steam: ${steamConnect}`);
  };

  const playerRingColor = playerPercentage > 75 ? 'text-red-500' : playerPercentage > 50 ? 'text-yellow-500' : 'text-green-500';

  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    inView: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.23, 1, 0.320, 1] }
    },
    hover: { y: -8, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="card-modern card-hover-modern group relative overflow-hidden"
      initial="initial"
      whileInView="inView"
      whileHover="hover"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      variants={cardVariants}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#e04d1a]/0 via-[#e04d1a]/0 to-[#e04d1a]/0 opacity-0 group-hover:opacity-20"
        animate={isHovering ? { opacity: [0, 0.3, 0] } : { opacity: 0 }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />

      <div className="relative h-40 bg-gradient-to-br from-[#e04d1a] to-[#ff6a33] overflow-hidden">
        {!imageError ? (
          <motion.img
            src={imageUrl}
            alt={server.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            animate={isHovering ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        ) : server.bannerUrl ? (
          <motion.img
            src={server.bannerUrl}
            alt={server.name}
            className="w-full h-full object-cover"
            animate={isHovering ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="absolute inset-0 opacity-30 pattern-bg bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]"></div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        
        <motion.div className="absolute top-3 right-3 flex gap-2">
          {server.features.slice(0, 2).map((feature: string) => (
            <motion.span
              key={feature}
              className="text-xs bg-[#0f0f0f]/90 text-[#e04d1a] px-2 py-1 rounded font-bold border border-[#e04d1a]/50"
              animate={isHovering ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {feature}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className="p-5 bg-gradient-to-b from-[#1a1a1a]/80 to-[#0f0f0f]/80 backdrop-blur-sm">
        <motion.div
          animate={isHovering ? { color: '#ff6a33' } : { color: '#fff' }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-black mb-1 tracking-wide">{server.name}</h3>
        </motion.div>
        <p className="text-sm text-gray-400 mb-4 font-light h-8 line-clamp-2">{server.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <motion.div 
            className="flex items-center gap-2 p-2 rounded bg-[#1a1a1a]/50 border border-[#e04d1a]/20"
            animate={isHovering ? { borderColor: 'rgba(224, 77, 26, 0.6)' } : { borderColor: 'rgba(224, 77, 26, 0.2)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-10 h-10">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="#2d2d2d"
                  strokeWidth="2"
                  fill="none"
                />
                <motion.circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${(playerPercentage / 100) * 100.5} 100.5`}
                  className={`transition-all duration-500 ${playerRingColor}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="w-4 h-4 text-[#e04d1a]" />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Players</p>
              <p className="text-sm font-bold text-white">
                {loading ? '...' : `${players.current}/${players.max}`}
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2 p-2 rounded bg-[#1a1a1a]/50 border border-[#e04d1a]/20"
            animate={isHovering ? { borderColor: 'rgba(224, 77, 26, 0.6)' } : { borderColor: 'rgba(224, 77, 26, 0.2)' }}
            transition={{ duration: 0.3 }}
          >
            <Clock className="w-4 h-4 text-[#e04d1a]" />
            <div>
              <p className="text-xs text-gray-500">Wipe</p>
              <p className="text-sm font-bold text-white">{wipeCountdown}d</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2 p-2 rounded bg-[#1a1a1a]/50 border border-[#e04d1a]/20"
            animate={isHovering ? { borderColor: 'rgba(224, 77, 26, 0.6)' } : { borderColor: 'rgba(224, 77, 26, 0.2)' }}
            transition={{ duration: 0.3 }}
          >
            <Zap className="w-4 h-4 text-[#e04d1a]" />
            <div>
              <p className="text-xs text-gray-500">Rate</p>
              <p className="text-sm font-bold text-white">{server.multiplier}x</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2 p-2 rounded bg-[#1a1a1a]/50 border border-[#e04d1a]/20"
            animate={isHovering ? { borderColor: 'rgba(224, 77, 26, 0.6)' } : { borderColor: 'rgba(224, 77, 26, 0.2)' }}
            transition={{ duration: 0.3 }}
          >
            <Gamepad2 className="w-4 h-4 text-[#e04d1a]" />
            <div>
              <p className="text-xs text-gray-500">Map</p>
              <p className="text-sm font-bold text-white">{server.map.split(' ')[1]}</p>
            </div>
          </motion.div>
        </div>

        <div className="mb-4">
          <div className="w-full h-2 bg-[#2d2d2d] rounded-full overflow-hidden border border-[#e04d1a]/20">
            <motion.div
              className="h-full bg-gradient-to-r from-[#e04d1a] via-[#ff6a33] to-[#e04d1a] shadow-lg shadow-[#e04d1a]/50"
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(5, 100 - wipeCountdown * 3)}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {wipeCountdown > 0 ? `Wipes ${new Date(server.nextWipe).toLocaleDateString()}` : '🔥 Wipe Today!'}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {server.features.map((feature: string) => (
            <motion.span
              key={feature}
              className="text-xs bg-gradient-to-r from-[#e04d1a]/20 to-[#ff6a33]/20 text-[#ff6a33] px-2.5 py-1 rounded border border-[#e04d1a]/30 font-medium"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(224, 77, 26, 0.3)' }}
            >
              {feature}
            </motion.span>
          ))}
        </div>

        <motion.button
          onClick={handleConnect}
          className="btn-primary w-full font-bold relative overflow-hidden"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">CONNECT</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ServerCard;
