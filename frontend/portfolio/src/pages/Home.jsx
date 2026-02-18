import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Skills from "../components/Skills";

// Particle component
const Particle = ({ x, y, size = 1, delay = 0 }) => (
  <motion.div
    className="absolute bg-white rounded-full"
    style={{ width: size, height: size }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      x: x + Math.random() * 20 - 10,
      y: y + Math.random() * 20 - 10,
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: 2 + Math.random(),
      delay,
      repeat: Infinity,
      repeatType: "mirror",
    }}
  />
);

const Home = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Heading animation control
  const headingControls = useAnimation();

  useEffect(() => {
    headingControls.start({
      y: [0, -10, 0],
      x: [0, 5, -5, 0],
      rotate: [0, 1, -1, 0],
      transition: { yoyo: Infinity, duration: 3, ease: "easeInOut" },
    });
  }, []);

  return (
    <>
      <section className="h-screen relative flex flex-col justify-center items-center bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden px-6">

        {/* Background floating particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <Particle
            key={i}
            x={Math.random() * windowSize.width}
            y={Math.random() * windowSize.height}
            size={Math.random() * 2 + 1}
            delay={Math.random() * 2}
          />
        ))}

        {/* Orbiting mini spark particles around heading */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `50%`,
              left: `50%`,
              transformOrigin: "center center",
            }}
            animate={{
              rotate: [0, 360],
              x: [Math.cos((i / 12) * Math.PI * 2) * 120, Math.cos((i / 12) * Math.PI * 2) * 120],
              y: [Math.sin((i / 12) * Math.PI * 2) * 50, Math.sin((i / 12) * Math.PI * 2) * 50],
            }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          />
        ))}

        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-4 text-center z-10 relative"
          animate={headingControls}
        >
          Hey, I'm Krrish
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mb-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, 0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          I build modern, responsive websites and web apps using React, TailwindCSS, and other cool technologies. Check out my projects below!
        </motion.p>

        {/* Call-to-Action Button */}
        <motion.a
          href="/projects"
          className="bg-cyan-400 text-gray-900 px-6 py-3 rounded-lg font-semibold z-10 shadow-lg"
          whileHover={{
            scale: 1.2,
            boxShadow: "0 0 60px rgba(0,255,255,0.7)",
            rotate: [0, 2, -2, 0],
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          View Projects
        </motion.a>
      </section>

      {/* Skills Section */}
      <Skills />
    </>
  );
};

export default Home;
