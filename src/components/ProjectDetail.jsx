import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  Layers, Layout, Globe, Package, Cpu, Code, CircuitBoard, Box
} from "lucide-react";
import Swal from 'sweetalert2';

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  Kotlin: Code,
  "Cloudflare Workers": CircuitBoard,
  TypeScript: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];

  return (
    <div className="flex items-center gap-2 px-4 py-2 border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-sm font-medium text-text-light dark:text-text-dark hover:border-primary dark:hover:border-primary cursor-default transition-colors rounded-sm shadow-sm group">
      <Icon className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary transition-colors" />
      <span>{tech}</span>
    </div>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-5 flex items-center gap-5 rounded-sm shadow-sm hover:border-primary/50 transition-colors duration-300">
        <div className="w-12 h-12 flex items-center justify-center bg-background-light dark:bg-background-dark text-primary border border-border-light dark:border-border-dark rounded-sm">
          <Code2 className="w-6 h-6" />
        </div>
        <div>
          <div className="text-3xl font-bold text-text-light dark:text-text-dark leading-none">{techStackCount}</div>
          <div className="text-xs uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-medium mt-1">Total Technologies</div>
        </div>
      </div>
      <div className="border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-5 flex items-center gap-5 rounded-sm shadow-sm hover:border-primary/50 transition-colors duration-300">
        <div className="w-12 h-12 flex items-center justify-center bg-background-light dark:bg-background-dark text-primary border border-border-light dark:border-border-dark rounded-sm">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <div className="text-3xl font-bold text-text-light dark:text-text-dark leading-none">{featuresCount}</div>
          <div className="text-xs uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-medium mt-1">Key Features</div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Source Code Private',
      text: 'Sorry, the source code for this project is private.',
      confirmButtonText: 'Understand',
      confirmButtonColor: '#3B82F6',
      background: '#1A1A1A',
      color: '#E0E0E0'
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const selectedProject = storedProjects.find((p) => String(p.id) === id);

    if (selectedProject) {
      const enhancedProject = {
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || 'https://github.com/Ifaz-Ikram',
      };
      setProject(enhancedProject);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center transition-colors duration-300">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <h2 className="text-xl font-medium text-text-light dark:text-text-dark">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-sans flex items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden">

      {/* Background Animations (Preserved but subtle) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[100px] animate-blob animation-delay-2000" />
      </div>

      <main className="w-full max-w-6xl mx-auto relative z-10 animate-fadeIn">
        <nav className="flex items-center space-x-2 text-sm text-text-secondary-light dark:text-text-secondary-dark mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          <span className="text-border-light dark:text-border-dark">/</span>
          <span className="hover:text-text-light dark:hover:text-text-dark transition-colors cursor-pointer" onClick={() => navigate(-1)}>Projects</span>
          <span className="text-border-light dark:text-border-dark">/</span>
          <span className="font-medium text-text-light dark:text-text-dark">{project.Title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-10 animate-slideInLeft">
            <div className="border-b border-border-light dark:border-border-dark pb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark tracking-tight mb-4">
                {project.Title}
              </h1>
              <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark leading-relaxed max-w-3xl">
                {project.Description}
              </p>
            </div>

            <ProjectStats project={project} />

            <div className="flex flex-wrap gap-4">
              <a
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-primary border border-primary text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-all font-semibold min-w-[160px] shadow-sm rounded-sm"
              >
                <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                Live Demo
              </a>
              <a
                href={project.Github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                className="group flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-white dark:bg-transparent border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-text-light hover:text-text-light dark:hover:border-white dark:hover:text-white transition-all font-semibold min-w-[160px] rounded-sm"
              >
                <Github className="w-5 h-5 fill-current" />
                Github
              </a>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark mb-4">
                <CircuitBoard className="w-5 h-5" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.TechStack.length > 0 ? (
                  project.TechStack.map((tech, index) => (
                    <TechBadge key={index} tech={tech} />
                  ))
                ) : (
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark italic">No specific technologies listed.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 animate-slideInRight">
            <div className="w-full aspect-video bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-sm overflow-hidden relative group shadow-sm">
              <img
                src={project.Img}
                alt={project.Title}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 shadow-sm rounded-sm">
              <h3 className="flex items-center gap-2 font-bold text-text-light dark:text-text-dark mb-4">
                <Star className="w-5 h-5 text-primary" />
                Key Features
              </h3>
              <div className="p-0">
                {project.Features.length > 0 ? (
                  <ul className="space-y-3">
                    {project.Features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-text-secondary-light dark:text-text-secondary-dark group">
                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-8 bg-background-light dark:bg-background-dark border border-dashed border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark text-sm text-center">
                    <span className="block mb-1 text-2xl opacity-20">•</span>
                    No features added yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
