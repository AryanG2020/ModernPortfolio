import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Terminal, Zap } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING KERNEL...");

  const LOADING_TEXTS = [
    "LOADING ASSETS...",
    "ESTABLISHING SECURE CONNECTION...",
    "DECRYPTING PORTFOLIO DATA...",
    "OPTIMIZING NEURAL NETWORKS...",
    "RENDERING 3D ENVIRONMENT...",
    "ACCESS GRANTED"
  ];

  useEffect(() => {
    // Progress Timer
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800); 
          return 100;
        }
        // Random increment for realistic "loading" feel
        const increment = Math.random() * 3 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    // Text changing timer
    const textTimer = setInterval(() => {
      setText(LOADING_TEXTS[Math.floor(Math.random() * LOADING_TEXTS.length)]);
    }, 450);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Top Shutter */}
      <motion.div 
        className="absolute top-0 left-0 w-full bg-[#050505] z-0"
        initial={{ height: "50%" }}
        exit={{ height: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
      />
      
      {/* Bottom Shutter */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full bg-[#050505] z-0"
        initial={{ height: "50%" }}
        exit={{ height: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
      />

      {/* Content Container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
      >
        {/* Main Percentage */}
        <div className="relative mb-8">
          <motion.h1 
            className="text-8xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 tracking-tighter"
          >
            {Math.floor(progress)}
          </motion.h1>
          <span className="absolute top-0 -right-8 text-2xl font-mono text-accent">%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
          <motion.div 
            className="h-full bg-accent shadow-[0_0_15px_rgba(0,243,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Info Text */}
        <div className="flex justify-between w-full font-mono text-xs text-accent/80 mb-8">
          <span>{text}</span>
          <span>{progress === 100 ? "COMPLETE" : "LOADING"}</span>
        </div>

        {/* Tech Decor elements */}
        <div className="grid grid-cols-4 gap-4 w-full opacity-30">
          <Code2 size={20} className="animate-pulse" />
          <Cpu size={20} className="animate-pulse delay-75" />
          <Terminal size={20} className="animate-pulse delay-150" />
          <Zap size={20} className="animate-pulse delay-300" />
        </div>

        {/* Decorative Lines */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
