import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, Suspense, lazy } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import LazySection from "./components/LazySection";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import ThemeToggle from "./components/ThemeToggle";
import { AnimatePresence } from 'framer-motion';

const Portofolio = lazy(() => import("./Pages/Portofolio"));
const Achievements = lazy(() => import("./components/Achievements"));
const Leadership = lazy(() => import("./components/Leadership"));
const ContactPage = lazy(() => import("./Pages/Contact"));

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
          <LazySection minHeight="800px">
            <Suspense fallback={null}>
              <Portofolio />
            </Suspense>
          </LazySection>
          <LazySection minHeight="900px">
            <Suspense fallback={null}>
              <Achievements />
            </Suspense>
          </LazySection>
          <LazySection minHeight="900px">
            <Suspense fallback={null}>
              <Leadership />
            </Suspense>
          </LazySection>
          <LazySection minHeight="700px">
            <Suspense fallback={null}>
              <ContactPage />
            </Suspense>
          </LazySection>
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

import ScrollToTop from "./components/ScrollToTop";

// ... imports

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
