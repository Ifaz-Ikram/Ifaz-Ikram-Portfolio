import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import Achievements from "./components/Achievements";
import Leadership from "./components/Leadership";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import ThemeToggle from "./components/ThemeToggle";
import { AnimatePresence } from 'framer-motion';

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <ThemeToggle />
          <Home />
          <About />
          <Portofolio />
          <Achievements />
          <Leadership />
          <ContactPage />
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ThemeToggle />
    <ProjectDetails />
    <footer className="w-full border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark font-mono">
        <span>© 2026 Ifaz Ikram. Built with engineering precision.</span>
      </div>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;