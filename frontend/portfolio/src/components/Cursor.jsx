import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Smooth motion with spring
  const cursorX = useMotionValue(mousePos.x);
  const cursorY = useMotionValue(mousePos.y);

  const springX = useSpring(cursorX, { damping: 15, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 15, stiffness: 200 });

  useEffect(() => {
    cursorX.set(mousePos.x);
    cursorY.set(mousePos.y);
  }, [mousePos, cursorX, cursorY]);

  return (
    <>
      {/* Outer glow circle */}
      <motion.div
        className="fixed pointer-events-none z-50 border-2 border-cyan-400 rounded-full"
        style={{
          width: 35,
          height: 35,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
          opacity: 0.7,
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 45, -45, 0],
        }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-50 bg-cyan-400 rounded-full"
        style={{
          width: 12,
          height: 12,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
};

export default Cursor;
