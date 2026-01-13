import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, User, Globe } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const IconButton = ({ Icon, label, href }) => (
  <a
    href={href}
    aria-label={label}
    className="group flex flex-col items-center transition-opacity hover:opacity-70"
  >
    <Icon className="w-8 h-8 md:w-10 md:h-10 text-text-light dark:text-text-dark" />
  </a>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 800);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const fadeInVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-background-light dark:bg-background-dark z-50"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-grid-pattern-light dark:bg-grid-pattern-dark bg-grid-pattern"></div>

          {/* Main Content */}
          <motion.main
            className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8 max-w-4xl w-full mx-auto"
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
          >
            {/* Icons */}
            <div className="flex space-x-12 mb-10">
              <IconButton Icon={Code2} label="Projects" href="#Portofolio" />
              <IconButton Icon={User} label="About Me" href="#About" />
              <IconButton Icon={Github} label="GitHub" href="https://github.com/Ifaz-Ikram" />
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 text-text-light dark:text-text-dark font-display">
                Welcome To My
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-500 dark:text-neutral-400 font-display">
                Portfolio Website
              </h2>
            </div>

            {/* Website Link */}
            <div className="mt-4">
              <a
                href="https://ifaz.site"
                className="flex items-center space-x-2 text-primary hover:underline transition-all group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span className="text-lg font-medium tracking-wide font-mono">
                  <TypewriterEffect text="www.ifaz.site" />
                </span>
              </a>
            </div>
          </motion.main>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
