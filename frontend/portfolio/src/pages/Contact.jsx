import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Particle Component
const Particle = ({ x, y, size = 2, color = "white", duration = 2 }) => {
  const randX = x + Math.random() * 100 - 50;
  const randY = y + Math.random() * 100 - 50;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{ width: size, height: size, backgroundColor: color }}
      animate={{
        x: [x, randX, x],
        y: [y, randY, y],
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{ duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    />
  );
};

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [bgParticles, setBgParticles] = useState([]);
  const [mouseTrail, setMouseTrail] = useState([]);
  const [clickBlasts, setClickBlasts] = useState([]);

  // Initialize background particles
  useEffect(() => {
    const particles = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      color: ["#0ff", "#f0f", "#ff0", "#0f0"][Math.floor(Math.random() * 4)],
      duration: 2 + Math.random() * 3,
    }));
    setBgParticles(particles);
  }, []);

  // Mouse trail
  const handleMouseMove = (e) => {
    setMouseTrail((prev) => [
      ...prev.slice(-20),
      { x: e.clientX, y: e.clientY, size: Math.random() * 4 + 2, color: "#0ff" },
    ]);
  };

  // Click explosion
  const handleClick = (e) => {
    const blasts = Array.from({ length: 50 }).map(() => ({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 4 + 2,
      color: ["#0ff", "#f0f", "#ff0", "#0f0"][Math.floor(Math.random() * 4)],
      dx: (Math.random() - 0.5) * 200,
      dy: (Math.random() - 0.5) * 200,
    }));
    setClickBlasts(blasts);
    setTimeout(() => setClickBlasts([]), 800);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, message };
    try {
      const res = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setTimeout(() => setStatus(""), 2000);

        // WhatsApp
        const phoneNumber = "9779840766524";
        const text = `Hello Ramesh, I am ${name} (${email}). Message: ${message}`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");

        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("Failed to send message to backend.");
        setTimeout(() => setStatus(""), 2000);
      }
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong.");
      setTimeout(() => setStatus(""), 2000);
    }
  };

  return (
    <section
      className="min-h-screen relative overflow-hidden bg-gray-900 text-white px-6 py-16 flex flex-col items-center justify-center"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Background Particles */}
      {bgParticles.map((p, i) => (
        <Particle key={`bg-${i}`} x={p.x} y={p.y} size={p.size} color={p.color} duration={p.duration} />
      ))}

      {/* Mouse Trail */}
      {mouseTrail.map((p, i) => (
        <Particle key={`trail-${i}`} x={p.x} y={p.y} size={p.size} color={p.color} />
      ))}

      {/* Click Blasts */}
      {clickBlasts.map((b, i) => (
        <motion.div
          key={`blast-${i}`}
          className="absolute rounded-full"
          style={{ width: b.size, height: b.size, backgroundColor: b.color }}
          animate={{ x: b.x + b.dx, y: b.y + b.dy, opacity: [1, 0], scale: [1, 0] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}

      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold mb-8 relative z-10"
        initial={{ opacity: 1 }}
      >
        Contact Me
      </motion.h2>

      {status && <p className="mb-6 text-cyan-400 font-medium relative z-10">{status}</p>}

      {/* Form */}
      <motion.form
        className="flex flex-col w-full max-w-md space-y-6 relative z-10"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-cyan-400 focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-cyan-400 focus:outline-none"
          required
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-cyan-400 focus:outline-none"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-cyan-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:scale-110 transition-transform"
        >
          Send Message to WhatsApp
        </button>
      </motion.form>
    </section>
  );
};

export default Contact;
