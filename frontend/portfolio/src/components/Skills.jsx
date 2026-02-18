import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Education from "./Education";



// Particle effect for the background
const Particle = ({ x, y }) => (
  <motion.div
    className="absolute w-1 h-1 bg-white rounded-full"
    initial={{ opacity: 1, scale: 1 }}
    animate={{ y: y + Math.random() * 20, x: x + Math.random() * 20, opacity: 0, scale: 0 }}
    transition={{ duration: 1 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
  />
);

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get("https://portfolio-app-2-3emc.onrender.com/api/skills/")
      .then((res) => setSkills(res.data))
      .catch((err) => console.log(err));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.7, rotateY: 90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { type: "spring", stiffness: 150, damping: 20 },
    },
    hover: {
      scale: 1.15,
      rotateY: 12,
      rotateX: -8,
      boxShadow: "0 0 60px rgba(255,255,255,0.6)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden px-4 py-20">
        {/* Floating background particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <Particle key={i} x={Math.random() * window.innerWidth} y={Math.random() * window.innerHeight} />
        ))}

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-12 text-center relative z-10"
          initial={{ opacity: 0, y: -80, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 80 }}
        >
          My Skills
        </motion.h2>

        {/* Skills Grid (closer boxes) */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-5xl z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <AnimatePresence>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center justify-center h-24 w-24 mb-8 md:h-28 md:w-28 ml-10 rounded-xl shadow-2xl cursor-pointer font-bold text-white ${skill.color}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.7, rotateY: 90 }}
                whileHover="hover"
              >
                <motion.span
                  className="text-center text-sm md:text-lg"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  {skill.name}
                </motion.span>

                {/* Floating mini particle inside card */}
                <motion.div
                  className="absolute w-2 h-2 bg-white rounded-full"
                  animate={{
                    x: [0, Math.random() * 8 - 4, 0],
                    y: [0, Math.random() * 8 - 4, 0],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 2 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
      <Education />
    </>
  );
};

export default Skills;
