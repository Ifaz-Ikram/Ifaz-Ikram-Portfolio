import React from "react";
import {
  Linkedin,
  Github,
  Instagram,
  ExternalLink
} from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/ifaz-ikram",
    isPrimary: true
  },
  {
    name: "GitHub",
    displayName: "GitHub",
    subText: "@Ifaz-Ikram",
    icon: Github,
    url: "https://github.com/Ifaz-Ikram"
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "@ifaz_ikram",
    icon: Instagram,
    url: "https://instagram.com/ifaz_ikram"
  }
];

const SocialLinks = () => {
  const linkedIn = socialLinks.find(link => link.isPrimary);
  const otherLinks = socialLinks.filter(link => !link.isPrimary);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 p-4 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
        <h3 className="text-xl font-semibold text-text-light dark:text-text-dark uppercase tracking-tight">
          Connect With Me
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {/* LinkedIn - Primary Row */}
        <a
          href={linkedIn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between p-6 
             bg-surface-light dark:bg-surface-dark 
             border border-border-light dark:border-border-dark 
             hover:border-primary dark:hover:border-primary 
             transition-all duration-300"
        >
          {/* Content Container */}
          <div className="relative flex items-center gap-4">
            {/* Icon Container */}
            <div className="relative flex items-center justify-center p-3 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark group-hover:border-primary/50 transition-colors">
              <linkedIn.icon
                className="w-8 h-8 text-text-light dark:text-text-dark group-hover:text-primary transition-colors duration-300"
              />
            </div>

            {/* Text Container */}
            <div className="flex flex-col">
              <span className="text-lg font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors duration-300">
                {linkedIn.displayName}
              </span>
              <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark font-mono">
                {linkedIn.subText}
              </span>
            </div>
          </div>

          {/* External Link */}
          <ExternalLink
            className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary transition-colors duration-300"
          />
        </a>

        {/* GitHub & Instagram Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 p-4 
                       bg-surface-light dark:bg-surface-dark 
                       border border-border-light dark:border-border-dark 
                       hover:border-primary dark:hover:border-primary 
                       transition-all duration-300"
            >
              <div className="relative flex items-center justify-center p-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark group-hover:border-primary/50 transition-colors">
                <link.icon
                  className="w-6 h-6 text-text-light dark:text-text-dark group-hover:text-primary transition-colors duration-300"
                />
              </div>

              {/* Text Container */}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors duration-300">
                  {link.displayName}
                </span>
                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-mono truncate">
                  {link.subText}
                </span>
              </div>

              <ExternalLink className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark group-hover:text-primary ml-auto transition-colors duration-300" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;