import React from 'react';

const TechStackIcon = ({ TechStackIcon, Language }) => {
  return (
    <div className="group p-6 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary dark:hover:border-blue-400 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer">
      <div className="relative">
        <img
          src={TechStackIcon}
          alt={`${Language} icon`}
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="text-text-secondary-light dark:text-text-secondary-dark font-semibold text-sm md:text-base tracking-wide group-hover:text-text-light dark:group-hover:text-text-dark transition-colors duration-300">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;