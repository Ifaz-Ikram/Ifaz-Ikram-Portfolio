import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    <div className="inline-flex items-center space-x-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark px-3 py-1.5 rounded text-xs font-mono text-text-secondary-light dark:text-text-secondary-dark">
      <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
      <span>Ready to Innovate</span>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
      <span className="relative inline-block">
        <span className="text-text-light dark:text-text-dark">
          Web
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="text-primary">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-sm text-text-secondary-light dark:text-text-secondary-dark font-mono rounded hover:border-primary hover:text-primary transition-colors cursor-default">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon, primary }) => (
  <a href={href}>
    <button className={`group relative inline-flex items-center justify-center px-8 py-3 font-medium rounded transition-all duration-300 ${primary
      ? "bg-primary hover:bg-blue-700 text-white"
      : "bg-transparent border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark hover:border-primary"
      }`}>
      <span>{text}</span>
      <Icon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="w-10 h-10 flex items-center justify-center border border-border-light dark:border-border-dark rounded text-text-secondary-light dark:text-text-secondary-dark hover:text-primary hover:border-primary bg-surface-light dark:bg-surface-dark transition-colors">
      <Icon className="w-5 h-5" />
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["CSE Undergraduate @ UoM", "Tech Enthusiast"];
const TECH_STACK = ["Kotlin", "TypeScript", "React", "Vue"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/Ifaz-Ikram" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/ifaz-ikram" },
  { icon: Instagram, link: "https://instagram.com/ifaz_ikram" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${isHovering
      ? "scale-[180%] sm:scale-[160%] md:scale-[150%] lg:scale-[145%] rotate-2"
      : "scale-[175%] sm:scale-[155%] md:scale-[145%] lg:scale-[140%]"
      }`,
  };

  return (
    <div className="min-h-screen overflow-hidden font-sans" id="Home">
      {/* Decorative Elements */}
      <div className="absolute right-0 top-1/4 w-1/3 h-1/2 border-l border-t border-border-light dark:border-border-dark opacity-50 pointer-events-none hidden lg:block"></div>
      <div className="absolute right-20 bottom-20 w-24 h-24 border border-dashed border-primary/30 pointer-events-none hidden lg:block"></div>

      <div
        className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-[0%] min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
            {/* Left Column */}
            <div
              className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div
                  className="h-8 flex items-center"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <span className="text-xl md:text-2xl text-text-secondary-light dark:text-text-secondary-dark font-mono font-medium">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-primary ml-1 animate-pulse"></span>
                </div>

                {/* Description */}
                <p
                  className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl leading-relaxed"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  Building scalable full-stack and cross-platform solutions
                  with modern web technologies. Focused on performance, clean architecture, and maintainable code.
                </p>

                {/* Tech Stack */}
                <div
                  className="flex flex-wrap gap-3 justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1200"
                >
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div
                  className="flex flex-col sm:flex-row gap-4 w-full justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1400"
                >
                  <CTAButton
                    href="#Portofolio"
                    text="View Projects"
                    icon={ExternalLink}
                    primary={true}
                  />
                  <CTAButton href="#Contact" text="Contact Me" icon={Mail} primary={false} />
                </div>

                {/* Social Links */}
                <div
                  className="hidden sm:flex gap-4 justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1600"
                >
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Optimized Lottie Animation */}
            <div
              className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full opacity-90">
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                    }`}
                ></div>

                <div
                  className={`relative z-10 w-full opacity-90 transform transition-transform duration-500 ${isHovering ? "scale-105" : "scale-100"
                    }`}
                >
                  <DotLottieReact {...lottieOptions} />
                </div>

                <div
                  className={`absolute inset-0 pointer-events-none transition-all duration-700 ${isHovering ? "opacity-50" : "opacity-20"
                    }`}
                >
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-primary/10 to-blue-400/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${isHovering ? "scale-110" : "scale-100"
                      }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative SVG */}
      <div className="hidden lg:block absolute right-10 bottom-10 opacity-10 dark:opacity-20 text-text-light dark:text-text-dark">
        <svg fill="none" height="200" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="99" stroke="currentColor" strokeWidth="1"></circle>
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1"></circle>
          <path d="M100 0V200" stroke="currentColor" strokeWidth="1"></path>
          <path d="M0 100H200" stroke="currentColor" strokeWidth="1"></path>
          <rect height="30" stroke="currentColor" strokeWidth="1" width="30" x="85" y="85"></rect>
        </svg>
      </div>
    </div>
  );
};

export default memo(Home);
