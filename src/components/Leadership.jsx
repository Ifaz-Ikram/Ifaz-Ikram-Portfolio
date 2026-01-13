import React, { useEffect, memo } from "react";
import { Users, Calendar, Briefcase, Heart, ArrowUpRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const experiences = [
    {
        title: "Department Representative",
        organization: "CSE Batch '23 – University of Moratuwa",
        period: "2025 – Present",
        description: "Representing students for Semesters 2 & 3, strengthening communication between department and students.",
        icon: Users,
        color: "from-[#6366f1] to-[#a855f7]",
    },
    {
        title: "Finance Committee Lead",
        organization: "IESL RoboGames 25/26",
        period: "2025",
        description: "Sponsorship outreach & financial planning for the robotics competition.",
        icon: Briefcase,
        color: "from-[#a855f7] to-[#6366f1]",
    },
    {
        title: "Finance Committee Member",
        organization: "SLIoT Challenge 2026",
        period: "2025 – 2026",
        description: "Budgeting and sponsorship coordination for IoT innovation challenge.",
        icon: Briefcase,
        color: "from-[#6366f1] to-[#a855f7]",
    },
    {
        title: "Organizing Committee",
        organization: "ADSCAI 2025 (Logistics)",
        period: "2025",
        description: "Delegate handling & event logistics for the AI conference.",
        icon: Calendar,
        color: "from-[#a855f7] to-[#6366f1]",
    },
    {
        title: "Executive Member",
        organization: "Muslim Majlis (UoM)",
        period: "2023 – Present",
        description: "Active participation in community organization and events.",
        icon: Heart,
        color: "from-[#6366f1] to-[#a855f7]",
    },
];

const ExperienceCard = memo(({ experience, index }) => {
    const Icon = experience.icon;
    const animations = ["fade-right", "fade-up", "fade-left"];

    return (
        <div
            data-aos={animations[index % 3]}
            data-aos-duration={1000 + (index % 3) * 200}
            className="relative group"
        >
            <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
                <div
                    className={`absolute -z-10 inset-0 bg-gradient-to-br ${experience.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>

                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6 flex-shrink-0">
                        <Icon className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <p
                                className="text-lg font-semibold text-white truncate"
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-anchor-placement="top-bottom"
                            >
                                {experience.title}
                            </p>
                        </div>

                        <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] font-medium mb-1">
                            {experience.organization}
                        </p>

                        <p className="text-xs text-gray-500 mb-2">{experience.period}</p>

                        <div className="flex items-center justify-between">
                            <p
                                className="text-sm text-gray-400 line-clamp-2"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-anchor-placement="top-bottom"
                            >
                                {experience.description}
                            </p>
                            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors flex-shrink-0 ml-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const Leadership = () => {
    useEffect(() => {
        AOS.init({
            once: false,
        });
    }, []);

    return (
        <div
            className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
            id="Leadership"
        >
            <div className="text-center lg:mb-8 mb-2 px-[5%]">
                <div className="inline-block relative group">
                    <h2
                        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
                        data-aos="zoom-in-up"
                        data-aos-duration="600"
                    >
                        Leadership & Volunteer
                    </h2>
                </div>
                <p
                    className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg"
                    data-aos="zoom-in-up"
                    data-aos-duration="800"
                >
                    Making an impact through community involvement and student representation
                </p>
            </div>

            <div className="w-full mx-auto pt-8 sm:pt-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experiences.map((experience, index) => (
                        <ExperienceCard key={index} experience={experience} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(Leadership);
