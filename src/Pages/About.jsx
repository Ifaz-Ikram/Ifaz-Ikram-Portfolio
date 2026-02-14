import React, { useEffect, useState, useCallback, memo, useMemo } from "react";
import { FileText, Code, Trophy, Globe, ArrowUpRight } from "lucide-react";
import { db, collection, getDocs } from "../firebase";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = memo(() => (
  <div className="w-full text-center mb-12 md:mb-24 relative">
    <h2
      className="text-3xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark"
      data-aos="zoom-in-up"
      data-aos-duration="600"
    >
      About Me
    </h2>
    <div className="absolute top-1/2 left-0 w-full h-px bg-border-light dark:bg-border-dark -z-10"></div>

  </div>
));

const ProfileImage = memo(() => (
  <div
    className="lg:col-span-5 flex justify-center lg:justify-end relative"
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    <div className="absolute inset-0 border border-dashed border-border-light dark:border-border-dark rounded-full scale-110 pointer-events-none"></div>
    <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-border-light dark:border-border-dark p-1 bg-surface-light dark:bg-surface-dark group">
      <img
        src="/ifaz.jpeg"
        alt="Ifaz Ikram Headshot"
        className="w-full h-full object-cover rounded-full hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, value, label, description, animation }) => (
  <div
    data-aos={animation}
    data-aos-duration={1300}
    className="group border border-border-light dark:border-border-dark p-6 flex flex-col justify-between h-48 hover:border-primary dark:hover:border-primary transition-colors bg-surface-light dark:bg-surface-dark hover:scale-105 duration-300"
  >
    <div className="flex justify-between items-start">
      <div className="bg-background-light dark:bg-background-dark p-2 rounded text-text-secondary-light dark:text-text-secondary-dark transition-transform group-hover:rotate-6">
        <Icon className="w-6 h-6" />
      </div>
      <span
        className="font-mono text-5xl font-bold text-primary"
        data-aos="fade-up-left"
        data-aos-duration="1500"
        data-aos-anchor-placement="top-bottom"
      >
        {value}
      </span>
    </div>
    <div>
      <h3
        className="text-sm font-bold uppercase tracking-wider text-text-light dark:text-text-dark"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-anchor-placement="top-bottom"
      >
        {label}
      </h3>
      <div className="flex justify-between items-end mt-1">
        <p
          className="text-xs text-text-secondary-light dark:text-text-secondary-dark"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-anchor-placement="top-bottom"
        >
          {description}
        </p>
        <ArrowUpRight className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  const [stats, setStats] = useState(() => {
    const experience = (() => {
      const startDate = new Date("2025-01-01");
      const today = new Date();
      let years = today.getFullYear() - startDate.getFullYear();
      let months = today.getMonth() - startDate.getMonth();
      if (months < 0) {
        years--;
        months += 12;
      }
      if (years < 1) {
        return months > 0 ? `${months}m` : "New";
      }
      return years;
    })();

    if (typeof window === "undefined") {
      return { totalProjects: 6, totalAchievements: 5, yearsExperience: experience };
    }

    let projectsCount = 6;
    let achievementsCount = 5;

    try {
      const cachedProjects = JSON.parse(localStorage.getItem("projects"));
      if (Array.isArray(cachedProjects)) projectsCount = cachedProjects.length || projectsCount;
    } catch { }

    try {
      const cachedAchievements = JSON.parse(localStorage.getItem("achievements_v1"));
      if (Array.isArray(cachedAchievements)) achievementsCount = cachedAchievements.length || achievementsCount;
    } catch { }

    return {
      totalProjects: projectsCount,
      totalAchievements: achievementsCount,
      yearsExperience: experience
    };
  });

  // Calculate experience from January 1, 2025
  const calculateExperience = useCallback(() => {
    const startDate = new Date("2025-01-01");
    const today = new Date();

    // Calculate years and months
    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    // Return years, or if less than 1 year, show as fraction
    if (years < 1) {
      return months > 0 ? `${months}m` : "New";
    }
    return years;
  }, []);

  // Fetch counts from Firestore (background refresh)
  const fetchStats = useCallback(async () => {
    try {
      // Fetch projects count
      const projectsSnapshot = await getDocs(collection(db, "projects"));
      const projectsCount = projectsSnapshot.size;

      // Fetch achievements count
      const achievementsSnapshot = await getDocs(collection(db, "achievements"));
      const achievementsCount = achievementsSnapshot.size;

      // Calculate experience
      const experience = calculateExperience();

      setStats((prev) => ({
        totalProjects: projectsCount || prev.totalProjects || 6,
        totalAchievements: achievementsCount || prev.totalAchievements || 5,
        yearsExperience: experience
      }));
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Fallback values
      setStats((prev) => ({
        totalProjects: prev.totalProjects || 6,
        totalAchievements: prev.totalAchievements || 5,
        yearsExperience: calculateExperience()
      }));
    }
  }, [calculateExperience]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 100,
      duration: 1000,
    });

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => AOS.init({ once: false }), 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const statsData = useMemo(
    () => [
      {
        icon: Code,
        value: stats.totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        animation: "fade-right",
      },
      {
        icon: Trophy,
        value: stats.totalAchievements,
        label: "Achievements",
        description: "Competition wins & recognition",
        animation: "fade-up",
      },
      {
        icon: Globe,
        value: stats.yearsExperience,
        label: "Years of Experience",
        description: "Continuous learning journey",
        animation: "fade-left",
      },
    ],
    [stats]
  );

  return (
    <main
      className="flex-grow flex flex-col items-center justify-start min-h-screen max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-6 pb-12 lg:pb-20 w-full"
      id="About"
    >
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Content Section */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div>
            <span
              className="text-primary font-mono text-sm tracking-wide mb-2 block font-semibold"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              WHO I AM
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-text-light dark:text-text-dark"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              Hello, I'm <br />
              <span
                className="text-text-light dark:text-text-dark"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Ifaz Ikram
              </span>
            </h1>
          </div>

          <p
            className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed text-lg max-w-2xl border-l-2 border-primary pl-4"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            I am a Computer Science and Engineering undergraduate at the
            University of Moratuwa with a strong interest in web development,
            full-stack engineering, and backend systems. I have hands-on
            experience with Kotlin Multiplatform, Cloudflare Workers, and modern
            web technologies, and I actively participate in hackathons,
            inter-university competitions, and open-source development.
          </p>

          <div
            className="flex flex-wrap gap-4 pt-4"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <a href="/Ifaz_Ikram_CV.pdf" download="Ifaz_Ikram_CV.pdf">
              <button className="flex items-center space-x-2 bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded text-sm font-semibold transition-all shadow-none border border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-900 hover:scale-105 duration-300">
                <FileText className="w-5 h-5" />
                <span>Download CV</span>
              </button>
            </a>
            <a href="#Portofolio">
              <button
                className="flex items-center space-x-2 bg-transparent border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark hover:border-primary px-6 py-3 rounded text-sm font-semibold transition-all hover:scale-105 duration-300"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <Code className="w-5 h-5" />
                <span>View Projects</span>
              </button>
            </a>
          </div>
        </div>

        {/* Profile Image */}
        <ProfileImage />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-20">
        {statsData.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </main>
  );
};

export default memo(AboutPage);
