import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";


const App = () => {
  return (
    <div className="min-h-screen w-full text-white overflow-x-hidden">
      <Cursor/>
      <Navbar />
          
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
   
      <Footer/>

      
    </div>
  );
};

export default App;
