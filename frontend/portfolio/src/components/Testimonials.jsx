import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Particle effect for cards
const Particle = ({ x, y }) => (
  <motion.div
    className="absolute w-1 h-1 bg-white rounded-full"
    initial={{ opacity: 1, scale: 1 }}
    animate={{ y: y + Math.random() * 20, x: x + Math.random() * 20, opacity: 0, scale: 0 }}
    transition={{ duration: 1 + Math.random(), repeat: Infinity, repeatType: "mirror" }}
  />
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get("https://portfolio-app-backend-gedo.onrender.com/api/testimonials/")
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Card variants for carousel flip + hover glow
  const cardVariants = {
    hidden: { opacity: 0, rotateY: 90, scale: 0.8 },
    visible: { opacity: 1, rotateY: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 15 } },
    hover: {
      scale: 1.08,
      rotateY: 10,
      rotateX: -5,
      boxShadow: "0 0 40px rgba(255,255,255,0.5)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-20 relative overflow-hidden">
      {/* Floating background particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Particle key={i} x={Math.random() * window.innerWidth} y={Math.random() * window.innerHeight} />
      ))}

      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold mb-16 text-center relative z-10"
        initial={{ opacity: 0, y: -80, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring", stiffness: 80 }}
      >
        Testimonials
      </motion.h2>

      {/* Carousel grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <AnimatePresence>
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="relative bg-linear-to-br from-slate-700 via-slate-800 to-slate-700 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            >
              {/* Flipping card front */}
              {t.picture && (
                <motion.img
                  src={t.picture}
                  alt={t.name}
                  className="w-36 h-36 rounded-full mb-6 object-cover shadow-xl border-4 border-white"
                  initial={{ y: -20, rotate: 0 }}
                  animate={{ y: [0, -5, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                />
              )}

              {/* Quote */}
              <motion.p
                className="text-lg italic mb-4 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                "{t.quote}"
              </motion.p>

              {/* Name + Role */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
              >
                <h3 className="font-bold text-xl mb-1">{t.name}</h3>
                <p className="text-gray-400">{t.role}</p>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Testimonials;
