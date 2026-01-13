import React, { useEffect, memo } from "react";
import { Trophy, Medal, Award, ArrowUpRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const achievements = [
    {
        title: "Champion – BashAway 2025",
        description: "Scripting & Automation Competition (SLIIT FOSS)",
        icon: Trophy,
        color: "from-[#6366f1] to-[#a855f7]",
    },
    {
        title: "Champion – AlgoArena 2025",
        description: "Built LeoConnect (Leo Club of USJ)",
        icon: Trophy,
        color: "from-[#a855f7] to-[#6366f1]",
    },
    {
        title: "Champion – HaXtreme 4.0",
        description: "IEEE Computer Society – University of Ruhuna",
        icon: Trophy,
        color: "from-[#6366f1] to-[#a855f7]",
    },
    {
        title: "1st Runners-Up – J'pura Xtreme 2.0",
        description: "24-hour inter-university coding competition",
        icon: Medal,
        color: "from-[#a855f7] to-[#6366f1]",
    },
    {
        title: "Finalist – SLIIT Xtreme 4.0",
        description: "Topped HackerRank leaderboard in onsite finals",
        icon: Award,
        color: "from-[#6366f1] to-[#a855f7]",
    },
];

const AchievementCard = memo(({ achievement, index }) => {
    const Icon = achievement.icon;
    const animations = ["fade-right", "fade-up", "fade-left"];

    return (
        <div
            data-aos={animations[index % 3]}
            data-aos-duration={1000 + (index % 3) * 200}
            className="relative group"
        >
            <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
                <div
                    className={`absolute -z-10 inset-0 bg-gradient-to-br ${achievement.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>

                <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${achievement.color} animate-pulse`}></div>
                </div>

                <div>
                    <p
                        className="text-lg font-semibold text-white mb-2"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-anchor-placement="top-bottom"
                    >
                        {achievement.title}
                    </p>
                    <div className="flex items-center justify-between">
                        <p
                            className="text-sm text-gray-400"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-anchor-placement="top-bottom"
                        >
                            {achievement.description}
                        </p>
                        <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
});

const Achievements = () => {
    useEffect(() => {
        AOS.init({
            once: false,
        });
    }, []);

    return (
        <div
            className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
            id="Achievements"
        >
            <div className="text-center lg:mb-8 mb-2 px-[5%]">
                <div className="inline-block relative group">
                    <h2
                        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
                        data-aos="zoom-in-up"
                        data-aos-duration="600"
                    >
                        Achievements
                    </h2>
                </div>
                <p
                    className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg"
                    data-aos="zoom-in-up"
                    data-aos-duration="800"
                >
                    Recognition for excellence in competitive programming & hackathons
                </p>
            </div>

            <div className="w-full mx-auto pt-8 sm:pt-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                        <AchievementCard key={index} achievement={achievement} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(Achievements);
