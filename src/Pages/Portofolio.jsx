import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-4 py-2
      text-text-secondary-light dark:text-text-secondary-dark
      hover:text-text-light dark:hover:text-text-dark
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-surface-light dark:bg-surface-dark
      hover:bg-background-light dark:hover:bg-background-dark
      border 
      border-border-light dark:border-border-dark
      hover:border-primary
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "kotlin.svg", language: "Kotlin" },
  { icon: "typescript.svg", language: "TypeScript" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "python.svg", language: "Python" },
  { icon: "java.svg", language: "Java" },
  { icon: "cplusplus.svg", language: "C++" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vuejs.svg", language: "Vue.js" },
  { icon: "nuxt.svg", language: "Nuxt" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "git.svg", language: "Git" },
  { icon: "vite.svg", language: "Vite" },
];

// Hardcoded projects for Ifaz Ikram
const hardcodedProjects = [
  {
    id: "leoconnect",
    Title: "LeoConnect",
    Description: "Social networking platform with edge-first backend APIs. Engineered authentication, file storage, and optimized DB migrations using Kotlin Multiplatform and Cloudflare Workers.",
    Img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60",
    Link: "https://github.com/Ifaz-Ikram",
    TechStack: ["Kotlin", "TypeScript", "Cloudflare Workers"]
  },
  {
    id: "ceylon-guides",
    Title: "Ceylon Guides",
    Description: "Tourism & guide discovery platform with responsive web interfaces and scalable backend integrations. Part of the Rexosphere ecosystem.",
    Img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60",
    Link: "#",
    TechStack: ["Vue", "Nuxt", "TypeScript"]
  },
  {
    id: "dept-election",
    Title: "Department Rep Election System",
    Description: "Internal web application for CSE Department Representative elections. Built for reliability and internal usability with academic election workflows.",
    Img: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop&q=60",
    Link: "#",
    TechStack: ["TypeScript", "React", "Firebase"]
  },
  {
    id: "money-splitter",
    Title: "Money-Splitter",
    Description: "Expense management app with designed onboarding flow and undo functionality. Led UI/UX with 7,300+ lines of code refactoring.",
    Img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60",
    Link: "https://github.com/Ifaz-Ikram",
    TechStack: ["Kotlin Multiplatform", "Jetpack Compose"]
  },
  {
    id: "skynest",
    Title: "SkyNest Hotel Management",
    Description: "Full-stack hotel management system with reservation & guest service workflows, REST API & database schema design.",
    Img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
    Link: "https://github.com/Ifaz-Ikram",
    TechStack: ["JavaScript", "PostgreSQL", "PL/pgSQL"]
  },
  {
    id: "nano-processor",
    Title: "Nano Processor Simulation",
    Description: "Custom 4-bit nano processor implementing arithmetic, bitwise, and control operations using VHDL and Xilinx Vivado.",
    Img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
    Link: "#",
    TechStack: ["VHDL", "Xilinx Vivado"]
  }
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState(hardcodedProjects);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      // Use hardcoded projects
      setProjects(hardcodedProjects);

      // Still fetch certificates from Firebase if available
      const certificateCollection = collection(db, "certificates");
      const certificateSnapshot = await getDocs(certificateCollection);
      const certificateData = certificateSnapshot.docs.map((doc) => doc.data());
      setCertificates(certificateData);

      // Store in localStorage for About section stats
      localStorage.setItem("projects", JSON.stringify(hardcodedProjects));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data:", error);
      // Fallback - still use hardcoded projects
      setProjects(hardcodedProjects);
      localStorage.setItem("projects", JSON.stringify(hardcodedProjects));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full overflow-hidden min-h-screen flex flex-col justify-start pt-6 pb-12 lg:pb-20" id="Portofolio">
      {/* Header section */}
      <div className="text-center pb-12 md:pb-24" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-text-light dark:text-text-dark">
          Portfolio Showcase
        </h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* Tab buttons */}
        <div className="flex flex-col sm:flex-row border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark mb-10 overflow-hidden">
          <button
            onClick={() => setValue(0)}
            className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-medium border-r border-border-light dark:border-border-dark last:border-r-0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors ${value === 0
              ? "bg-primary text-white"
              : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark"
              }`}
          >
            <Code className="w-5 h-5" />
            Projects
          </button>
          <button
            onClick={() => setValue(1)}
            className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-medium border-r border-border-light dark:border-border-dark last:border-r-0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors ${value === 1
              ? "bg-primary text-white"
              : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark"
              }`}
          >
            <Award className="w-5 h-5" />
            Certificates
          </button>
          <button
            onClick={() => setValue(2)}
            className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors ${value === 2
              ? "bg-primary text-white"
              : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark"
              }`}
          >
            <Boxes className="w-5 h-5" />
            Tech Stack
          </button>
        </div>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}