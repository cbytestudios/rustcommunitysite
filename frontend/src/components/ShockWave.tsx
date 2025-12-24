import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ShockWaveProps {
  trigger?: boolean;
}

export const ShockWave: React.FC<ShockWaveProps> = ({ trigger = false }) => {
  const [waves, setWaves] = useState<number[]>([]);

  const createWave = () => {
    const newId = Date.now();
    setWaves((prev) => [...prev, newId]);
    setTimeout(() => {
      setWaves((prev) => prev.filter((id) => id !== newId));
    }, 1200);
  };

  useEffect(() => {
    if (trigger) {
      createWave();
    }
  }, [trigger]);

  const handleRandomShock = () => {
    createWave();
  };

  return (
    <>
      {waves.map((waveId) => (
        <motion.div
          key={waveId}
          className="fixed pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            width: '100px',
            height: '100px',
            marginLeft: '-50px',
            marginTop: '-50px',
            zIndex: 40,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="w-full h-full rounded-full border-2 border-[#e04d1a] shadow-lg shadow-[#e04d1a]/50"></div>
        </motion.div>
      ))}

      {waves.map((waveId) => (
        <motion.div
          key={`glow-${waveId}`}
          className="fixed pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            width: '150px',
            height: '150px',
            marginLeft: '-75px',
            marginTop: '-75px',
            zIndex: 39,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="w-full h-full rounded-full bg-[#e04d1a] blur-xl"></div>
        </motion.div>
      ))}

      {waves.map((waveId) => (
        <motion.div
          key={`particles-${waveId}`}
          className="fixed pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            zIndex: 38,
          }}
        >
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const distance = 150;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 bg-[#e04d1a] rounded-full shadow-lg shadow-[#e04d1a]"
                style={{
                  left: 0,
                  top: 0,
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{ x, y, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            );
          })}
        </motion.div>
      ))}
    </>
  );
};

export default ShockWave;
