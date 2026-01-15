import React, { useEffect, useState, useCallback } from "react";
import { db, collection, getDocs, query, orderBy } from "../firebase";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Boxes } from "lucide-react";

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
  {
    category: "Frontend & Mobile",
    items: [
      { icon: "/images/techstack/reactjs.svg", language: "React" },
      { icon: "/images/techstack/nextjs.svg", language: "Next.js" },
      { icon: "/images/techstack/vuejs.svg", language: "Vue.js" },
      { icon: "/images/techstack/nuxt.svg", language: "Nuxt" },
      { icon: "/images/techstack/typescript.svg", language: "TypeScript" },
      { icon: "/images/techstack/javascript.svg", language: "JavaScript" },
      { icon: "/images/techstack/kotlin.svg", language: "Kotlin" },
      { icon: "/images/techstack/jetpackcompose.svg", language: "Jetpack Compose" },
      { icon: "/images/techstack/tailwind.svg", language: "Tailwind CSS" },
      { icon: "/images/techstack/bootstrap.svg", language: "Bootstrap" },
      { icon: "/images/techstack/MUI.svg", language: "Material UI" },
      { icon: "/images/techstack/html.svg", language: "HTML5" },
      { icon: "/images/techstack/css.svg", language: "CSS3" },
    ]
  },
  {
    category: "Backend & Database",
    items: [
      { icon: "/images/techstack/nodejs.svg", language: "Node.js" },
      { icon: "/images/techstack/express.svg", language: "Express.js" },
      { icon: "/images/techstack/python.svg", language: "Python" },
      { icon: "/images/techstack/java.svg", language: "Java" },
      { icon: "/images/techstack/cplusplus.svg", language: "C++" },
      { icon: "/images/techstack/postgresql.svg", language: "PostgreSQL" },
      { icon: "/images/techstack/firebase.svg", language: "Firebase" },
      { icon: "/images/techstack/redis.svg", language: "Redis" },
      { icon: "/images/techstack/sequelize.svg", language: "Sequelize" },
      { icon: "/images/techstack/prisma.svg", language: "Prisma" },
      { icon: "/images/techstack/cloudflare.svg", language: "Cloudflare D1" },
    ]
  },
  {
    category: "DevOps & Tools",
    items: [
      { icon: "/images/techstack/git.svg", language: "Git" },
      { icon: "/images/techstack/github.svg", language: "GitHub" },
      { icon: "/images/techstack/docker.svg", language: "Docker" },
      { icon: "/images/techstack/cloudflareworkers.svg", language: "Cloudflare Workers" },
      { icon: "/images/techstack/vercel.svg", language: "Vercel" },
      { icon: "/images/techstack/vite.svg", language: "Vite" },
      { icon: "/images/techstack/jest.svg", language: "Jest" },]
  }
];

// Hardcoded projects for Ifaz Ikram
const hardcodedProjects = [

  // {
  //   id: "ceylon-guides",
  //   Title: "Ceylon Guides",
  //   Description: "Tourism & guide discovery platform with responsive web interfaces and scalable backend integrations. Part of the Rexosphere ecosystem.",
  //   Img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60",
  //   Link: "#",
  //   Github: "Private",
  //   TechStack: ["Vue", "Nuxt", "TypeScript"],
  //   Features: [
  //     "Guide discovery system",
  //     "Tour booking interface",
  //     "Responsive web design",
  //     "Backend integrations"
  //   ],
  //   Gallery: []
  // },

  // {
  //   id: "money-splitter",
  //   Title: "Money-Splitter",
  //   Description: "Expense management app with designed onboarding flow and undo functionality. Led UI/UX with 7,300+ lines of code refactoring.",
  //   Img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60",
  //   Link: "https://github.com/Ifaz-Ikram",
  //   Github: "https://github.com/Ifaz-Ikram",
  //   TechStack: ["Kotlin Multiplatform", "Jetpack Compose"],
  //   Features: [
  //     "Expense splitting logic",
  //     "Undo/redo functionality",
  //     "Onboarding flow",
  //     "Cross-platform support"
  //   ],
  //   Gallery: []
  // },

  {
    id: "cse-election-platform",
    Title: "CSE Department Representative Elections",
    Description: "A secure, role-based digital voting platform built to replace Google Forms for CSE23 Semester 4, 5, and 6 Department Representative elections. Includes domain-restricted Google OAuth, strict voter whitelist, multi-candidate voting with editable ballots before deadline, admin dashboards, live statistics/results controls, exports, and enterprise-grade security (audit logs, rate limiting, CSRF protection, hardened headers).",
    Img: "/images/Projects/Department Rep Election System/Election1.jpg",
    Link: "https://election.cse23.org",
    Github: "https://github.com/Ifaz-Ikram/CSE-Department-Representative-Election",
    TechStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth", "Redis", "Tailwind CSS"],
    Features: [
      "Google OAuth sign-in restricted to CSE student emails",
      "Strict voter whitelist (registry-based access control)",
      "Role-based access control: Voter / Admin / Super Admin",
      "Multi-candidate voting with unlimited edits until deadline",
      "Real-time election countdown and status monitoring",
      "Results visibility controls & Admin dashboards",
      "Candidate presets system with stream-based representation",
      "CSV exports for results, ballots, statistics, and voter lists",
      "Comprehensive audit logs (AUTH, USER, ELECTION, CANDIDATE, VOTE)",
      "Security: CSRF protection, rate limiting, CSP, input sanitization"
    ],
    Gallery: [
      "/images/Projects/Department Rep Election System/Election2.jpg",
      "/images/Projects/Department Rep Election System/Election3.jpg",
      "/images/Projects/Department Rep Election System/Election4.jpg",
      "/images/Projects/Department Rep Election System/Election5.jpg",
      "/images/Projects/Department Rep Election System/Election6.jpg",
      "/images/Projects/Department Rep Election System/Election7.jpg",
      "/images/Projects/Department Rep Election System/Election8.jpg",
      "/images/Projects/Department Rep Election System/Election9.jpg"
    ]
  },

  {
    id: "leoconnect",
    Title: "LeoConnect",
    Description:
      "A production-ready, cross-platform social and management platform built for Leo Multiple District 306, connecting 200+ Leo Clubs and 4000+ members across Sri Lanka and the Maldives. Developed during AlgoArena 2025, LeoConnect delivers social networking, messaging, notifications, and administrative tools through a single Kotlin Multiplatform codebase with an edge-first backend.",
    Img: "/images/Projects/leoconnect/leoconnect1.jpg",
    Link: "https://github.com/Rexosphere/LeoConnect/releases",
    Github: "https://github.com/Rexosphere/LeoConnect",
    TechStack: [
      "Kotlin Multiplatform (KMP)",
      "Jetpack Compose",
      "Material 3",
      "Cloudflare Workers",
      "Cloudflare D1",
      "Cloudflare R2",
      "Firebase Authentication",
      "Google OAuth (PKCE)",
      "FCM (Push Notifications)",
      "Koin",
      "Voyager"
    ],
    Features: [
      "Single shared Kotlin Multiplatform codebase for Android, iOS, and Desktop",
      "Social feed with post creation, likes, comments, and sharing",
      "Club and district discovery with follow system",
      "Direct messaging between Leo members",
      "Real-time push notifications for social and system events",
      "Leo AI powered by Gemini (RAG) for intelligent interactions",
      "Secure Google OAuth authentication with PKCE (desktop supported)",
      "Edge-deployed backend using Cloudflare Workers for ultra-low latency",
      "D1 (SQLite at edge) for structured data and R2 for media storage",
      "Admin dashboard for user, club, and district management",
      "Scalable architecture supporting 12 districts, 200+ clubs, and 4000+ members",
      "Production-grade API with JWT verification and input validation"
    ],
    Gallery: [
      "/images/Projects/leoconnect/demo.mp4"
    ]
  },

  {
    id: "skynest",
    Title: "SkyNest Hotel Management System",
    Description: "SkyNest is an enterprise-grade, production-ready hotel management platform built with modern web technologies. This full-stack application provides comprehensive hotel operations management including room bookings, guest management, housekeeping, billing, payments, and real-time analytics. The system features a beautiful glassmorphism UI design with interactive charts, role-based access control for 5 user types, and advanced security.",
    Img: "/images/Projects/skynest/skynest1.png",
    Link: "",
    Github: "https://github.com/Ifaz-Ikram",
    TechStack: ["React", "Node.js", "Express.js", "PostgreSQL", "Sequelize", "Tailwind CSS", "Vite", "JWT", "Jest"],
    Features: [
      "Core Hotel Management: Room, Guest, Booking, Check-In/Out",
      "Role-Based Access Control (RBAC) with 5 user types",
      "Real-time Analytics Dashboard with sparklines & trends",
      "Billing & Payments with complex database functions",
      "Database with 15 tables, 9 functions, 3 triggers",
      "Glassmorphism UI design with interactive charts",
      "Secure Authentication (JWT, bcrypt, 2FA support)",
      "Reporting System (PDF/Excel exports, 5 interactive reports)"
    ],
    Gallery: [
      "/images/Projects/skynest/skynest2.png",
      "/images/Projects/skynest/skynest3.png",
      "/images/Projects/skynest/skynest4.png",
      "/images/Projects/skynest/skynest5.png",
      "/images/Projects/skynest/skynest6.png",
      "/images/Projects/skynest/skynest7.png",
      "/images/Projects/skynest/skynest8.png",
      "/images/Projects/skynest/skynest9.png",
      "/images/Projects/skynest/skynest10.png"
    ]
  },
  {
    id: "nano-processor",
    Title: "Nano-Processor",
    Description: "A 4-bit RISC processor implemented in VHDL with a custom instruction set supporting arithmetic operations (ADD, NEG), bitwise operations (NOT, AND, OR, XOR), immediate load (MOVI), and conditional jumps (JZR), featuring an 8-register bank and seven-segment display interface for FPGA deployment.",
    Img: "/images/Projects/nanoprocessor/nanoprocessor1.jpg",
    Link: "", // No live demo
    Github: "https://github.com/Rashmika-Nawanjana/Nano-Processor",
    TechStack: ["VHDL", "Vivado", "FPGA Design", "Digital Logic"],
    Features: [
      "Custom 13-bit instruction set with 8 opcodes",
      "8-register bank (R0-R7) with 4-bit data width",
      "ALU with dual-mode operation (arithmetic/bitwise)",
      "Bitwise operations: NOT, AND, OR, XOR",
      "Arithmetic operations: ADD, NEG (two's complement)",
      "Immediate value loading (MOVI)",
      "Conditional jump on zero (JZR)",
      "Seven-segment display decoder for output",
      "Configurable clock modes (normal/step-by-step)",
      "Overflow and zero flag detection"
    ],
    Gallery: [
      "/images/Projects/nanoprocessor/nanoprocessor2.jpg",
      "/images/Projects/nanoprocessor/nanoprocessor3.jpg"
    ]
  },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);
    try {
      // Fetch projects from Firestore
      const projectsRef = collection(db, "projects");
      const projectsQuery = query(projectsRef, orderBy("order", "asc"));
      const projectsSnapshot = await getDocs(projectsQuery);

      let projectsData = projectsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fallback to hardcoded projects if no data in Firestore
      if (projectsData.length === 0) {
        projectsData = hardcodedProjects;
      }
      setProjects(projectsData);

      // Fetch certificates from Firestore
      const certificatesRef = collection(db, "certificates");
      const certificatesQuery = query(certificatesRef, orderBy("order", "asc"));
      const certificatesSnapshot = await getDocs(certificatesQuery);
      const certificatesData = certificatesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCertificates(certificatesData);

      // Store in localStorage for About section stats
      localStorage.setItem("projects", JSON.stringify(projectsData));
      localStorage.setItem("certificates", JSON.stringify(certificatesData));
    } catch (error) {
      console.error("Error fetching data:", error);
      // Fallback - use hardcoded projects
      setProjects(hardcodedProjects);
      localStorage.setItem("projects", JSON.stringify(hardcodedProjects));
    } finally {
      setIsLoading(false);
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
          Explore my journey through projects and technical expertise.
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
            className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors ${value === 1
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
            <div className="container mx-auto flex flex-col justify-center items-center overflow-hidden pb-[5%] gap-12">
              {techStacks.map((category, catIndex) => (
                <div key={catIndex} className="w-full">
                  <div
                    data-aos="fade-up"
                    className="flex items-center gap-4 mb-8"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-text-light dark:text-text-dark whitespace-nowrap">
                      {category.category}
                    </h3>
                    <div className="h-[1px] w-full bg-border-light dark:bg-border-dark opacity-50"></div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                    {category.items.map((stack, index) => (
                      <div
                        key={index}
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                        data-aos-duration="800"
                      >
                        <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}