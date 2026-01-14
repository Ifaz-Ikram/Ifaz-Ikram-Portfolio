import React, { useEffect, useState, useCallback, memo } from "react";
import { Users, Calendar, Briefcase, Heart, Wallet } from "lucide-react";
import { db, collection, getDocs, query, orderBy } from "../firebase";
import AOS from "aos";
import "aos/dist/aos.css";

// Fallback hardcoded leadership experiences
const hardcodedExperiences = [
    {
        id: "dept-rep",
        title: "Department Representative",
        organization: "CSE Batch '23 – University of Moratuwa",
        period: "2025 – Present",
        description: "Representing students for Semesters 2 & 3, strengthening communication between faculty and the student body to ensure academic concerns are addressed effectively.",
        icon: "Users",
        order: 1
    },
    {
        id: "robogames-finance",
        title: "Finance Committee Lead",
        organization: "IESL RoboGames 25/26",
        period: "2025",
        description: "Sponsorship outreach & financial planning for the robotics competition, ensuring strict budget adherence and securing vital funding for event logistics.",
        icon: "Briefcase",
        order: 2
    },
    {
        id: "sliot-finance",
        title: "Finance Committee Member",
        organization: "SLIoT Challenge 2026",
        period: "2025 – 2026",
        description: "Budgeting and sponsorship coordination for the IoT innovation challenge, managing resource allocation and vendor payments.",
        icon: "Wallet",
        order: 3
    },
    {
        id: "adscai-logistics",
        title: "Organizing Committee",
        organization: "ADSCAI 2025 (Logistics)",
        period: "2025",
        description: "Delegate handling & event logistics for the AI conference. Ensuring smooth operations on-site, including registration and venue management.",
        icon: "Calendar",
        order: 4
    },
    {
        id: "muslim-majlis",
        title: "Executive Member",
        organization: "Muslim Majlis (UoM)",
        period: "2023 – Present",
        description: "Active participation in community organization and events. Planning religious and cultural gatherings to foster community spirit.",
        icon: "Heart",
        order: 5
    },
];

const ICON_MAP = {
    Users: Users,
    Calendar: Calendar,
    Briefcase: Briefcase,
    Heart: Heart,
    Wallet: Wallet,
};

const LeadershipCard = memo(({ experience, index, isReversed }) => {
    const Icon = ICON_MAP[experience.icon] || Users;

    return (
        <div
            className="group border-b border-border-light dark:border-border-dark py-12 md:py-16"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={index * 100}
        >
            <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-start md:items-center gap-8 md:gap-12`}>
                {/* Icon Section */}
                <div
                    className={`w-full md:w-1/3 flex justify-center ${isReversed ? 'md:justify-start md:pl-4' : 'md:justify-end md:pr-4'}`}
                    data-aos={isReversed ? "fade-left" : "fade-right"}
                    data-aos-duration="1000"
                >
                    <div className="relative">
                        {experience.imageUrl ? (
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-border-light dark:border-border-dark group-hover:scale-105 transition-transform duration-300">
                                <img
                                    src={experience.imageUrl}
                                    alt={experience.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-surface-light dark:bg-surface-dark flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-border-light dark:border-border-dark">
                                <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-text-secondary-light dark:text-text-secondary-dark" />
                            </div>
                        )}
                        {/* Arrow indicator */}
                        <div className={`absolute -bottom-2 ${isReversed ? '-left-2' : '-right-2'} w-8 h-8 bg-primary rounded-full flex items-center justify-center`}>
                            <svg className="w-4 h-4 text-white transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div
                    className={`w-full md:w-2/3 flex flex-col ${isReversed ? 'items-start md:items-end md:text-right' : 'items-start'}`}
                    data-aos={isReversed ? "fade-right" : "fade-left"}
                    data-aos-duration="1000"
                >
                    {/* Period badge */}
                    <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs font-medium uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark bg-surface-light dark:bg-surface-dark px-2 py-1 rounded border border-border-light dark:border-border-dark">
                            {experience.period}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-1 group-hover:text-primary transition-colors">
                        {experience.title}
                    </h3>

                    {/* Organization */}
                    <div className="text-primary font-mono text-sm mb-4 font-medium">
                        {experience.organization}
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed max-w-xl">
                        {experience.description}
                    </p>
                </div>
            </div>
        </div>
    );
});

const Leadership = () => {
    const [experiences, setExperiences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            once: false,
        });
    }, []);

    const fetchExperiences = useCallback(async () => {
        setIsLoading(true);
        try {
            const leadershipRef = collection(db, "leadership");
            const leadershipQuery = query(leadershipRef, orderBy("order", "asc"));
            const snapshot = await getDocs(leadershipQuery);

            let data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            // Fallback to hardcoded if Firestore is empty
            if (data.length === 0) {
                data = hardcodedExperiences;
            }

            setExperiences(data);
        } catch (error) {
            console.error("Error fetching leadership:", error);
            setExperiences(hardcodedExperiences);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchExperiences();
    }, [fetchExperiences]);

    return (
        <main
            className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 pt-6 lg:pt-20 pb-12 lg:pb-20 min-h-screen flex flex-col justify-start"
            id="Leadership"
        >
            {/* Header */}
            <header className="text-center mb-12 md:mb-20">
                <h1
                    className="text-3xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4"
                    data-aos="zoom-in-up"
                    data-aos-duration="600"
                >
                    Leadership & Volunteer
                </h1>
                <p
                    className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto"
                    data-aos="zoom-in-up"
                    data-aos-duration="800"
                >
                    Making an impact through community involvement and student representation.
                </p>
            </header>

            {/* Leadership cards container */}
            <div className="flex flex-col border-t border-border-light dark:border-border-dark">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    experiences.map((experience, index) => (
                        <LeadershipCard
                            key={experience.id || index}
                            experience={experience}
                            index={index}
                            isReversed={index % 2 !== 0}
                        />
                    ))
                )}
            </div>
        </main>
    );
};

export default memo(Leadership);