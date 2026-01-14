import React, { useEffect, useState, useCallback, memo } from "react";
import { Trophy, Medal, Award, ExternalLink } from "lucide-react";
import { db, collection, getDocs, query, orderBy } from "../firebase";
import AOS from "aos";
import "aos/dist/aos.css";

// Fallback hardcoded achievements (used if Firestore is empty)
const hardcodedAchievements = [
    {
        id: "bashaway-2025",
        title: "Champion – BashAway 2025",
        description: "Scripting & Automation Competition organized by SLIIT FOSS. Demonstrated advanced bash scripting and system automation techniques to secure the top spot among 50+ teams.",
        organization: "SLIIT FOSS",
        icon: "Trophy",
        link: "#",
        linkText: "View Certificate",
        order: 1
    },
    {
        id: "algoarena-2025",
        title: "Champion – AlgoArena 2025",
        description: "Built LeoConnect (Leo Club of USJ). A full-stack solution for managing club activities and member engagement, winning first place for innovation and utility.",
        organization: "Leo Club USJ",
        icon: "Trophy",
        link: "#",
        linkText: "View Project",
        order: 2
    },
    {
        id: "haxtreme-4",
        title: "Champion – HaXtreme 4.0",
        description: "IEEE Computer Society – University of Ruhuna. Solved complex algorithmic problems under time pressure to clinch the championship title.",
        organization: "IEEE CS",
        icon: "Trophy",
        link: "#",
        linkText: "Verify Award",
        order: 3
    },
    {
        id: "jpura-xtreme-2",
        title: "1st Runners-Up – J'pura Xtreme 2.0",
        description: "A grueling 24-hour inter-university coding competition. Showcased endurance and problem-solving skills to secure the second place on the podium.",
        organization: "J'pura",
        icon: "Medal",
        link: "#",
        linkText: "See Standings",
        order: 4
    },
    {
        id: "sliit-xtreme-4",
        title: "Finalist – SLIIT Xtreme 4.0",
        description: "Topped the HackerRank leaderboard during the intense onsite finals. Recognized for writing the most optimized solutions for hard-level problems.",
        organization: "HackerRank",
        icon: "Award",
        link: "#",
        linkText: "Leaderboard",
        order: 5
    },
];

const ICON_MAP = {
    Trophy: Trophy,
    Medal: Medal,
    Award: Award,
};

const AchievementCard = memo(({ achievement, index, isReversed }) => {
    const Icon = ICON_MAP[achievement.icon] || Trophy;

    return (
        <div
            className={`relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24`}
        >
            {/* Timeline dot */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background-light dark:border-background-dark hidden md:block z-20 shadow-sm"></div>

            {/* Content - alternates sides */}
            <div
                className={`${isReversed ? 'order-2 md:order-1 text-left md:text-right' : 'order-2 text-left'} group`}
                data-aos={isReversed ? "fade-right" : "fade-left"}
                data-aos-duration="1000"
            >
                <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-8 md:p-10 transition-all hover:border-primary dark:hover:border-primary">
                    <h2 className="font-mono font-bold text-xl md:text-2xl mb-3 text-text-light dark:text-text-dark group-hover:text-primary transition-colors">
                        {achievement.title}
                    </h2>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm md:text-base leading-relaxed mb-6">
                        {achievement.description}
                    </p>
                    {achievement.link && (
                        <a
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-bold text-primary hover:text-blue-700 dark:hover:text-blue-400 uppercase tracking-wider"
                        >
                            {achievement.linkText || "View Details"}
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                    )}
                </div>
            </div>

            {/* Image/Icon placeholder - alternates sides */}
            <div
                className={`${isReversed ? 'order-1 md:order-2' : 'order-1'}`}
                data-aos={isReversed ? "fade-left" : "fade-right"}
                data-aos-duration="1000"
            >
                <div className="aspect-video md:aspect-square bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex items-center justify-center relative overflow-hidden group hover:border-primary transition-colors">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[radial-gradient(var(--tw-gradient-stops))] from-primary/20 to-transparent"></div>

                    {/* If image exists, show it */}
                    {achievement.imageUrl ? (
                        <img
                            src={achievement.imageUrl}
                            alt={achievement.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        // Show icon placeholder
                        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-background-light dark:bg-background-dark rounded-full flex items-center justify-center mb-4 shadow-sm border border-border-light dark:border-border-dark">
                                <Icon className="w-10 h-10 md:w-12 md:h-12 text-text-light dark:text-text-dark" />
                            </div>
                            <span className="font-mono text-xs md:text-sm text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest">
                                {achievement.organization}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            once: false,
        });
    }, []);

    const fetchAchievements = useCallback(async () => {
        setIsLoading(true);
        try {
            const achievementsRef = collection(db, "achievements");
            const achievementsQuery = query(achievementsRef, orderBy("order", "asc"));
            const snapshot = await getDocs(achievementsQuery);

            let data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            // Fallback to hardcoded if Firestore is empty
            if (data.length === 0) {
                data = hardcodedAchievements;
            }

            setAchievements(data);
        } catch (error) {
            console.error("Error fetching achievements:", error);
            setAchievements(hardcodedAchievements);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAchievements();
    }, [fetchAchievements]);

    return (
        <main
            className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-6 lg:pt-20 pb-12 lg:pb-20 min-h-screen flex flex-col justify-start relative"
            id="Achievements"
        >
            {/* Header */}
            <header className="text-center mb-12 md:mb-24">
                <h1
                    className="text-3xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4"
                    data-aos="zoom-in-up"
                    data-aos-duration="600"
                >
                    Achievements
                </h1>
                <p
                    className="text-lg text-text-secondary-light dark:text-text-secondary-dark font-mono"
                    data-aos="zoom-in-up"
                    data-aos-duration="800"
                >
                    Recognition for excellence in competitive programming & hackathons
                </p>
            </header>

            {/* Timeline container */}
            <div className="relative">
                {/* Timeline line (centered, hidden on mobile) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border-light dark:bg-border-dark -translate-x-1/2 hidden md:block z-0"></div>

                {/* Achievement cards */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    achievements.map((achievement, index) => (
                        <AchievementCard
                            key={achievement.id || index}
                            achievement={achievement}
                            index={index}
                            isReversed={index % 2 === 0}
                        />
                    ))
                )}
            </div>
        </main>
    );
};

export default memo(Achievements);
