import React from "react";

const Footer = () => {
  const year = new Date().getFullYear(); // dynamic year

  return (
    <footer className="bg-slate-900 text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left side */}
        <p className="text-sm md:text-base mb-4 md:mb-0">
          &copy; {year} Ramesh Chhetri Adhikari. All rights reserved.
        </p>

        {/* Right side - social / links */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/ramesh1290"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://shishupaila.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            Portfolio
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
