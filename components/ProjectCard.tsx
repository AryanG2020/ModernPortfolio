/*
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the tilt
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    
    // Calculate rotation based on cursor position
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Transform percent values to degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
      className="w-full h-[450px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-md overflow-hidden group shadow-xl"
      >
       
        <motion.div 
          style={{ opacity: useTransform(mouseX, [-0.5, 0.5], [0, 0.3]) }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 z-20 pointer-events-none mix-blend-overlay"
        />

      
        <motion.div 
          style={{ transform: "translateZ(20px)" }}
          className="absolute inset-0 h-3/5 overflow-hidden"
        >
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/0 transition-colors" />
        </motion.div>

    
        <motion.div 
          style={{ transform: "translateZ(50px)" }}
          className="absolute bottom-0 inset-x-0 h-2/5 p-6 bg-dark/80 backdrop-blur-md border-t border-white/10 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-display font-bold text-white group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <div className="flex gap-2">
                <a href={project.link} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full hover:bg-accent hover:text-black transition-all text-xs font-semibold border border-white/10 group/btn">
                  <Github size={14} />
                  <span>Repository</span>
                </a>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm line-clamp-2 mb-3">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
*/
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
      className="w-full h-[450px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial="rest"
        whileHover="hover"
        animate="rest"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-md overflow-hidden group shadow-xl"
      >
        <motion.div
          style={{ opacity: useTransform(mouseX, [-0.5, 0.5], [0, 0.3]) }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 z-20 pointer-events-none mix-blend-overlay"
        />

        {/* Floating Image Layer - CHANGED: h-3/5 to h-full */}
        <motion.div
          style={{ transform: "translateZ(20px)" }}
          className="absolute inset-0 h-full overflow-hidden"
        >
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          {/* Dark overlay to ensure text readability when content slides up */}
          <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/50 transition-colors duration-500" />
        </motion.div>

        {/* Content Layer - CHANGED: dynamic height logic */}
        <motion.div
          style={{ transform: "translateZ(50px)" }}
          className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/80 to-transparent border-t border-white/10 flex flex-col justify-end"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-display font-bold text-white group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <div className="flex gap-2">
                <a
                  href={project.link}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full hover:bg-accent hover:text-black transition-all text-xs font-semibold border border-white/10 group/btn"
                >
                  <Github size={14} />
                  <span>Repo</span>
                </a>
              </div>
            </div>

            {/* Description Wrapper - CHANGED: Animates height on hover */}
            <motion.div
              variants={{
                rest: { height: "3em" }, // Approx height for 2 lines
                hover: { height: "auto" },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden mb-3"
            >
              <p className="text-gray-400 text-sm">{project.description}</p>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
