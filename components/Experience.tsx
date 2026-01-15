import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceProps {
  items: ExperienceItem[];
}

const ExperienceCard: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 50 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
      className={`relative flex items-center justify-between md:justify-normal gap-8 w-full ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Spacer for desktop layout centering */}
      <div className="hidden md:block w-5/12" />

      {/* Center Dot */}
      <div className="absolute left-0 md:left-1/2 w-8 h-8 flex items-center justify-center transform -translate-x-1/2 z-10">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-4 h-4 bg-dark border-2 border-accent rounded-full shadow-[0_0_15px_rgba(0,243,255,0.8)]"
        />
      </div>

      {/* Content Card */}
      <div className="w-full pl-10 md:pl-0 md:w-5/12">
        <motion.div
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
          className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-accent/50 transition-all duration-300 shadow-lg group relative overflow-hidden"
        >
          {/* Subtle gradient flash on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

          <div className="flex flex-col gap-1 mb-4 relative z-10">
            <h3 className="text-2xl font-display font-bold text-white group-hover:text-accent transition-colors">
              {item.role}
            </h3>
            <div className="flex items-center gap-2 text-secondary font-semibold">
              <Briefcase size={16} />
              <span>{item.company}</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 bg-black/40 px-3 py-1.5 rounded-full mb-6 border border-white/5">
            <Calendar size={12} />
            {item.period}
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {item.skills.map(skill => (
              <span key={skill} className="px-3 py-1 text-xs font-medium rounded-md bg-accent/10 text-accent border border-accent/20">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Experience: React.FC<ExperienceProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative py-10">
      {/* Animated Vertical Line */}
      <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2">
        <motion.div 
          style={{ scaleY, transformOrigin: "top" }}
          className="w-full h-full bg-gradient-to-b from-accent via-secondary to-accent"
        />
      </div>

      <div className="flex flex-col gap-24">
        {items.map((item, index) => (
          <ExperienceCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Experience;