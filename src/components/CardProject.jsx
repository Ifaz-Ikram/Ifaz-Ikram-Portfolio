import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex flex-col h-full group hover:border-primary dark:hover:border-primary transition-colors duration-300">
      {/* Image Container */}
      <div className="h-48 overflow-hidden border-b border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
        <img
          src={Img}
          alt={Title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2">
          {Title}
        </h3>

        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed mb-6 flex-grow line-clamp-3">
          {Description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {ProjectLink ? (
            <a
              href={ProjectLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLiveDemo}
              className="inline-flex items-center text-sm font-medium text-primary dark:text-primary hover:underline"
            >
              Live Demo <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          ) : (
            <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Demo Not Available</span>
          )}

          {id ? (
            <Link
              to={`/project/${id}`}
              onClick={handleDetails}
              className="inline-flex items-center px-4 py-2 border border-border-light dark:border-border-dark text-sm font-medium text-text-light dark:text-text-dark bg-surface-light dark:bg-surface-dark hover:bg-background-light dark:hover:bg-background-dark hover:border-primary transition-colors"
            >
              Details <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          ) : (
            <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Details Not Available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProject;