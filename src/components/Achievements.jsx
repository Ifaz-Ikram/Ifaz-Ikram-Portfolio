import React, { useEffect, memo } from "react";
import { Trophy, Medal, Award, ArrowUpRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const achievements = [
    {
        title: "Champion – BashAway 2025",
        description: "Scripting & Automation Competition (SLIIT FOSS)",
        icon: Trophy,
    },
    {
        title: "Champion – AlgoArena 2025",
        description: "Built LeoConnect (Leo Club of USJ)",
        icon: Trophy,
    },
    {
        title: "Champion – HaXtreme 4.0",
        description: "IEEE Computer Society – University of Ruhuna",
        icon: Trophy,
    },
    {
        title: "1st Runners-Up – J'pura Xtreme 2.0",
        description: "24-hour inter-university coding competition",
        icon: Medal,
    },
    {
        title: "Finalist – SLIIT Xtreme 4.0",
        description: "Topped HackerRank leaderboard in onsite finals",
        icon: Award,
    },
];

const AchievementCard = memo(({ achievement, index }) => {
    const Icon = achievement.icon;
    const animations = ["fade-right", "fade-up", "fade-left"];

    return (
        <article
            data-aos={animations[index % 3]}
            data-aos-duration={1000 + (index % 3) * 200}
            className="group bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-6 hover:border-primary dark:hover:border-primary transition-colors duration-200 cursor-pointer relative flex flex-col h-full"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="bg-background-light dark:bg-background-dark p-3 flex items-center justify-center transition-transform group-hover:rotate-6">
                    <Icon className="w-8 h-8 text-text-light dark:text-text-dark" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </div>

            <div className="mt-auto">
                <h3
                    className="text-lg font-bold text-text-light dark:text-text-dark mb-2 font-mono"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-anchor-placement="top-bottom"
                >
                    {achievement.title}
                </h3>
                <p
                    className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-anchor-placement="top-bottom"
                >
                    {achievement.description}
                </p>
            </div>
        </article>
    );
});

const Achievements = () => {
    useEffect(() => {
        AOS.init({
            once: false,
        });
    }, []);

    return (
        <main
            className="max-w-7xl mx-auto px-6 py-16 md:py-24"
            id="Achievements"
        >
            <header className="text-center mb-16">
                <h1
                    className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4"
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                    <AchievementCard key={index} achievement={achievement} index={index} />
                ))}
            </div>
        </main>
    );
};

export default memo(Achievements);
