import React from 'react';

export const EmberParticles: React.FC = () => {
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    duration: 3 + Math.random() * 2,
    delay: Math.random() * 2,
    left: Math.random() * 100,
    size: 4 + Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#e04d1a] ember-particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: '-10px',
            animation: `ember-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size}px rgba(224, 77, 26, 0.8)`,
          }}
        />
      ))}
    </div>
  );
};

export default EmberParticles;
