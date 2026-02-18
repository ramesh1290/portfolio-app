import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Testimonials from "./Testimonials";

// Floating particle effect
const Particle = ({ x, y }) => (
  <motion.div
    className="absolute w-1 h-1 bg-white rounded-full"
    initial={{ opacity: 1, scale: 1 }}
    animate={{
      y: y + Math.random() * 20,
      x: x + Math.random() * 20,
      opacity: 0,
      scale: 0,
    }}
    transition={{ duration: 1 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
  />
);

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/education/")
      .then((res) => setEducation(res.data))
      .catch((err) => console.log(err));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { type: "spring", stiffness: 140, damping: 20 },
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      rotateX: -3,
      boxShadow: "0 0 40px rgba(255,255,255,0.4)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden px-6 py-20">
        {/* Background particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <Particle key={i} x={Math.random() * window.innerWidth} y={Math.random() * window.innerHeight} />
        ))}

        {/* Section Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-12 text-center relative z-10"
          initial={{ opacity: 0, y: -80, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 80 }}
        >
          Education
        </motion.h2>

        {/* Education Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <AnimatePresence>
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="relative bg-slate-700 rounded-xl p-6 shadow-2xl border-l-8 border-indigo-200 cursor-pointer"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                whileHover="hover"
              >
                <motion.h3
                  className="text-xl md:text-2xl font-semibold mb-2"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                >
                  {edu.degree} - {edu.institution}
                </motion.h3>
                <motion.p
                  className="text-gray-300 mb-1"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                >
                  {edu.field_of_study}
                </motion.p>
                <motion.p
                  className="text-gray-400 text-sm"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                >
                  {edu.year}
                </motion.p>

                {/* Floating mini particle inside card */}
                <motion.div
                  className="absolute w-2 h-2 bg-white rounded-full"
                  animate={{
                    x: [0, Math.random() * 6 - 3, 0],
                    y: [0, Math.random() * 6 - 3, 0],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 2 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
      <Testimonials />
    </>
  );
};

export default Education;
