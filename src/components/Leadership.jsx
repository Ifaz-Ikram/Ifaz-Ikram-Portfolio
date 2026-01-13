import React, { useEffect, memo } from "react";
import { Users, Calendar, Briefcase, Heart, ArrowUpRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const experiences = [
    {
        title: "Department Representative",
        organization: "CSE Batch '23 – University of Moratuwa",
        period: "2025 – Present",
        description: "Representing students for Semesters 2 & 3, strengthening communication between faculty and the student body.",
        icon: Users,
    },
    {
        title: "Finance Committee Lead",
        organization: "IESL RoboGames 25/26",
        period: "2025",
        description: "Sponsorship outreach & financial planning for the robotics competition, ensuring budget adherence.",
        icon: Briefcase,
    },
    {
        title: "Finance Committee Member",
        organization: "SLIoT Challenge 2026",
        period: "2025 – 2026",
        description: "Budgeting and sponsorship coordination for IoT innovation challenge, managing resource allocation.",
        icon: Briefcase,
    },
    {
        title: "Organizing Committee",
        organization: "ADSCAI 2025 (Logistics)",
        period: "2025",
        description: "Delegate handling & event logistics for the AI conference. Ensuring smooth operations on-site.",
        icon: Calendar,
    },
    {
        title: "Executive Member",
        organization: "Muslim Majlis (UoM)",
        period: "2023 – Present",
        description: "Active participation in community organization and events. Planning religious and cultural gatherings.",
        icon: Heart,
    },
];

const ExperienceCard = memo(({ experience, index }) => {
    const Icon = experience.icon;
    const animations = ["fade-right", "fade-up", "fade-left"];

    return (
        <article
            data-aos={animations[index % 3]}
            data-aos-duration={1000 + (index % 3) * 200}
            className="group relative bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-6 flex flex-col hover:border-primary dark:hover:border-primary transition-colors duration-200"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark transition-transform group-hover:rotate-6">
                    <Icon className="w-6 h-6 text-text-light dark:text-text-dark" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

            <h2
                className="text-lg font-bold text-text-light dark:text-text-dark mb-1"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-anchor-placement="top-bottom"
            >
                {experience.title}
            </h2>

            <div className="text-sm font-mono text-primary font-medium mb-1">
                {experience.organization}
            </div>

            <div className="text-xs font-mono text-text-secondary-light dark:text-text-secondary-dark mb-4 uppercase tracking-wide">
                {experience.period}
            </div>

            <p
                className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-bottom"
            >
                {experience.description}
            </p>
        </article>
    );
});

const Leadership = () => {
    useEffect(() => {
        AOS.init({
            once: false,
        });
    }, []);

    return (
        <main
            className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-6 lg:pt-10 pb-12 lg:pb-20 min-h-screen flex flex-col justify-start"
            id="Leadership"
        >
            <header className="mb-12 md:mb-24 text-center max-w-3xl mx-auto">
                <h1
                    className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-text-light dark:text-text-dark"
                    data-aos="zoom-in-up"
                    data-aos-duration="600"
                >
                    Leadership & Volunteer
                </h1>
                <p
                    className="text-text-secondary-light dark:text-text-secondary-dark text-lg leading-relaxed"
                    data-aos="zoom-in-up"
                    data-aos-duration="800"
                >
                    Making an impact through community involvement and student representation.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences.map((experience, index) => (
                    <ExperienceCard key={index} experience={experience} index={index} />
                ))}
            </div>
        </main>
    );
};

export default memo(Leadership);