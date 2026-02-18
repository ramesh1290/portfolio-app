import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Particle effect for background
const Particle = ({ x, y, size = 2, delay = 0 }) => (
  <motion.div
    className="absolute bg-white rounded-full"
    style={{ width: size, height: size }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      x: x + Math.random() * 100 - 25,
      y: y + Math.random() * 100 - 25,
      opacity: [0, 0.8, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      delay,
      repeat: Infinity,
      repeatType: "mirror",
    }}
  />
);

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://portfolio-app-2-3emc.onrender.com/api/projects/");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  if (!projects || projects.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
        <p>Loading...</p>
      </section>
    );
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8, rotateY: 90 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: { type: "spring", stiffness: 140, damping: 20 },
    },
    hover: {
      scale: 1.15,
      rotateY: 15,
      rotateX: -8,
      boxShadow: "0 0 120px rgba(0,255,255,0.7)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <section className="min-h-screen bg-gray-900 text-white relative overflow-hidden px-6 py-16">
      {/* Background floating particles - LOTS of them */}
      {Array.from({ length: 150 }).map((_, i) => (
        <Particle
          key={i}
          x={Math.random() * window.innerWidth}
          y={Math.random() * window.innerHeight}
          size={Math.random() * 3 + 1}
          delay={Math.random() * 3}
        />
      ))}

      {/* Section Title - static, no animation */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 relative z-10">
        My Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10 justify-items-center">
        <AnimatePresence>
          {projects.map((proj, i) => (
            <motion.div
              key={proj.id}
              className="bg-gray-800 p-6 rounded-3xl shadow-lg relative cursor-pointer w-full max-w-xs flex flex-col items-center text-center"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.7, rotateY: 90 }}
              whileHover="hover"
            >
              {/* Project Image */}
              {proj.image && (
                <motion.img
                  src={proj.image}
                  alt={proj.title}
                  className="w-48 h-48 rounded-2xl object-cover mb-6 shadow-xl border-4 border-white"
                  initial={{ y: -20, rotate: 0 }}
                  animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                />
              )}

              <motion.h3
                className="text-2xl font-semibold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                {proj.title}
              </motion.h3>

              <motion.div
                className="text-gray-300 text-sm mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.3 }}
              >
                {proj.desc.split("\n").map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </motion.div>

              <motion.a
                href={proj.link}
                target="_blank"
                className="text-cyan-400 hover:underline font-bold"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                View Project
              </motion.a>

              {/* Mini floating particles inside card */}
              {Array.from({ length: 4 }).map((_, p) => (
                <motion.div
                  key={p}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  animate={{
                    x: [0, Math.random() * 8 - 4, 0],
                    y: [0, Math.random() * 8 - 4, 0],
                    opacity: [1, 0.3, 1],
                  }}
                  transition={{ duration: 2 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
                />
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
