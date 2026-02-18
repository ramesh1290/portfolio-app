import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

// Particle effect
const Particle = ({ x, y, size = 2, delay = 0 }) => (
  <motion.div
    className="absolute bg-white rounded-full"
    style={{ width: size, height: size }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      x: x + Math.random() * 40 - 20,
      y: y + Math.random() * 40 - 20,
      opacity: [0, 0.8, 0],
      scale: [0, 1, 0],
    }}
    transition={{ duration: 3 + Math.random() * 2, delay, repeat: Infinity, repeatType: "mirror" }}
  />
);

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get("https://portfolio-app-2-3emc.onrender.com/api/about/");
        if (res.data.length > 0) setAbout(res.data[0]);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };
    fetchAbout();
  }, []);

  if (!about) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen relative overflow-hidden bg-gray-900 text-white px-6 py-16 flex flex-col md:flex-row items-center justify-center">
      {/* Background floating particles */}
      {Array.from({ length: 120 }).map((_, i) => (
        <Particle
          key={i}
          x={Math.random() * window.innerWidth}
          y={Math.random() * window.innerHeight}
          size={Math.random() * 3 + 1}
          delay={Math.random() * 3}
        />
      ))}

      {/* Text */}
      <motion.div
        className="md:w-1/2 mb-10 md:mb-0 mt-12 relative z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">{about.title}</h2>
        <div className="text-gray-300 text-sm md:text-base">
          {about.description.split("\n").map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="mb-1"
            >
              {line}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Profile Image */}
      <motion.div
        className="md:w-1/2 flex justify-center relative z-10"
        initial={{ opacity: 0, x: 50, y: 0 }}
        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      >
        {about.image && (
          <div className="relative">
            <img
              src={about.image}
              alt={about.title}
              className="w-64 h-64 md:w-72 md:h-72 rounded-full object-cover shadow-2xl border-4 border-white"
            />
            {/* Floating particles around image */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                animate={{
                  x: [0, Math.random() * 40 - 20, 0],
                  y: [0, Math.random() * 40 - 20, 0],
                  opacity: [1, 0.3, 1],
                  scale: [1, 0.5, 1],
                }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, repeatType: "mirror" }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default About;
