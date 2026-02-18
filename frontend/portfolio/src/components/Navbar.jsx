import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarContents=["Home", "About", "Projects", "Contact"]


  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full flex justify-center z-50 bg-slate-900/80 backdrop-blur-md">
        <div className="w-[92%] max-w-6xl flex justify-between items-center px-8 py-4">
          
          {/* Logo */}
          <h2 className="text-2xl font-semibold text-white tracking-wide">
            Portfolio
          </h2>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 text-gray-300 text-md">
            {navbarContents.map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-400 origin-center group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-white text-2xl"
            >
              <FiMenu />
            </button>
          )}
        </div>
      </nav>

      {/* BACKDROP */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-56 bg-slate-950 text-white z-50 p-8 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-2xl"
        >
          <FiX />
        </button>

        {/* Sidebar Links */}
        <div className="flex flex-col space-y-8 mt-16 text-md">
          {navbarContents.map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="hover:text-cyan-400 transition"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
