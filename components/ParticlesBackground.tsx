import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
}

interface ParticlesBackgroundProps {
  count?: number;
  className?: string;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ count = 80, className = "" }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = [];
    for (let i = 0; i < count; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        delay: Math.random() * 8
      });
    }
    setParticles(generated);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-blue-500"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `float ${6 + p.delay}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
