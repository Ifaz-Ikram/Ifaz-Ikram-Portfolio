import React, { useEffect, memo, useMemo } from "react";
import { FileText, Code, Award, Globe, ArrowUpRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = memo(() => (
  <div className="w-full text-center mb-12 relative">
    <h2
      className="text-3xl md:text-4xl font-bold tracking-tight text-text-light dark:text-text-dark"
      data-aos="zoom-in-up"
      data-aos-duration="600"
    >
      About Me
    </h2>
    <div className="absolute top-1/2 left-0 w-full h-px bg-border-light dark:bg-border-dark -z-10"></div>
    <div
      className="inline-block bg-background-light dark:bg-background-dark px-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 uppercase tracking-widest"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      Engineer Profile
    </div>
  </div>
));

const ProfileImage = memo(() => (
  <div
    className="lg:col-span-5 flex justify-center lg:justify-end relative"
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    <div className="absolute inset-0 border border-dashed border-border-light dark:border-border-dark rounded-full scale-110 pointer-events-none"></div>
    <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-border-light dark:border-border-dark p-1 bg-white dark:bg-slate-800 group">
      <img
        src="/ifaz.jpeg"
        alt="Ifaz Ikram Headshot"
        className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
        loading="lazy"
      />
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, value, label, description, animation }) => (
  <div
    data-aos={animation}
    data-aos-duration={1300}
    className="group border border-border-light dark:border-border-dark p-6 flex flex-col justify-between h-48 hover:border-primary dark:hover:border-blue-400 transition-colors bg-white dark:bg-transparent hover:scale-105 duration-300"
  >
    <div className="flex justify-between items-start">
      <div className="bg-neutral-100 dark:bg-slate-800 p-2 rounded text-neutral-700 dark:text-slate-300 transition-transform group-hover:rotate-6">
        <Icon className="w-6 h-6" />
      </div>
      <span
        className="font-mono text-5xl font-bold text-primary dark:text-blue-400"
        data-aos="fade-up-left"
        data-aos-duration="1500"
        data-aos-anchor-placement="top-bottom"
      >
        {value}
      </span>
    </div>
    <div>
      <h3
        className="text-sm font-bold uppercase tracking-wider text-neutral-800 dark:text-white"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-anchor-placement="top-bottom"
      >
        {label}
      </h3>
      <div className="flex justify-between items-end mt-1">
        <p
          className="text-xs text-neutral-500 dark:text-slate-400"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-anchor-placement="top-bottom"
        >
          {description}
        </p>
        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-primary dark:group-hover:text-blue-400 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(
      localStorage.getItem("certificates") || "[]"
    );

    const startDate = new Date("2023-09-01");
    const today = new Date();
    const experience =
      today.getFullYear() -
      startDate.getFullYear() -
      (today <
        new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate())
        ? 1
        : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience,
    };
  }, []);

  useEffect(() => {
    AOS.init({
      once: false,
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
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        animation: "fade-right",
      },
      {
        icon: Award,
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
      {
        icon: Globe,
        value: YearExperience,
        label: "Years of Experience",
        description: "Continuous learning journey",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates, YearExperience]
  );

  return (
    <main
      className="flex-grow flex flex-col items-center justify-center max-w-7xl mx-auto px-6 py-12 w-full"
      id="About"
    >
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Content Section */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div>
            <span
              className="text-primary dark:text-blue-400 font-mono text-sm tracking-wide mb-2 block font-semibold"
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
                className="text-neutral-800 dark:text-white"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Ifaz Ikram
              </span>
            </h1>
          </div>

          <p
            className="text-neutral-600 dark:text-slate-300 leading-relaxed text-lg max-w-2xl border-l-2 border-primary dark:border-blue-500 pl-4"
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
            <a href="">
              <button className="flex items-center space-x-2 bg-primary hover:bg-blue-900 text-white px-6 py-3 rounded text-sm font-semibold transition-all shadow-none border border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-900 hover:scale-105 duration-300">
                <FileText className="w-5 h-5" />
                <span>Download CV</span>
              </button>
            </a>
            <a href="#Portofolio">
              <button
                className="flex items-center space-x-2 bg-transparent border border-primary dark:border-blue-400 text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:bg-blue-400 dark:hover:text-slate-900 px-6 py-3 rounded text-sm font-semibold transition-all hover:scale-105 duration-300"
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
