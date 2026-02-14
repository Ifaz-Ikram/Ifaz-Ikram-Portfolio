import React, { useEffect, useState, useCallback, memo } from "react";
import { Trophy, Medal, Award, Expand, Images, Code } from "lucide-react";
import { db, collection, getDocs, query, orderBy } from "../firebase";
import ImageLightbox from "./ImageLightbox";
import useAutoCarousel from "../hooks/useAutoCarousel";
import OptimizedImage from "./OptimizedImage";
import AOS from "aos";
import "aos/dist/aos.css";

// Fallback hardcoded achievements (used if Firestore is empty)
const hardcodedAchievements = [

    {
        id: "bashaway-2025-champions",
        title: "🏆 Champions – BashAway 2025",
        description: "Champions of BashAway 2025, the premier inter-university scripting & automation competition organized by the SLIIT FOSS Community. Team Velosphere (University of Moratuwa) secured 1st Place by demonstrating consistency, speed, and strong problem-solving skills throughout the competition, from Round 01 to the Finals.",
        organization: "SLIIT FOSS Community",
        icon: "Trophy",
        imageUrl: "/images/Achievements/Bashaway/bashaway1.jpg",
        gallery: [
            "/images/Achievements/Bashaway/bashaway2.jpg"
        ],
        order: 1
    },
    {
        id: "algoarena-2025-winners",
        title: "🏆 Winners – AlgoArena 2025",
        description: "Secured 1st Place at AlgoArena 2025 as Team Rexosphere, showcasing exceptional skill, innovation, and teamwork. The competition focused on algorithmic problem-solving and real-world system design. Our team built LeoConnect, a scalable unified digital platform connecting Leo Clubs across Sri Lanka and the Maldives, supporting thousands of members across multiple districts with a production-ready solution.",
        organization: "Leo Club of University of Sri Jayewardenepura",
        icon: "Trophy",
        imageUrl: "/images/Achievements/AlgoArena/Algoarena1.jpg",
        gallery: [
            "/images/Achievements/AlgoArena/Algoarena2.jpg"
        ],
        order: 2
    },
    {
        id: "haxtreme-4-champions",
        title: "🏆 Champions – HaXtreme 4.0",
        description: "Secured 1st Place at HaXtreme 4.0 as Team Velosphere, demonstrating strong logical thinking, teamwork, and problem-solving skills under pressure. The competition was organized by the IEEE Student Branch, University of Ruhuna, and concluded with the final round held at the Faculty of Engineering, University of Ruhuna.",
        organization: "IEEE Student Branch, University of Ruhuna",
        icon: "Trophy",
        imageUrl: "/images/Achievements/HaXtreme/Haxtreme1.jpg",
        gallery: [
            "/images/Achievements/HaXtreme/Haxtreme2.jpg",
            "/images/Achievements/HaXtreme/Haxtreme3.jpg"
        ],
        order: 3
    },
    {
        id: "jpura-xtreme-2",
        title: "🥈 1st Runners-Up – J'pura Xtreme 2.0",
        description: "24-hour Programming Competition with Team Velosphere (UOM) alongside Suhas Dissanayake and Kalana Liyanage. Showcased endurance and problem-solving skills in an intense inter-university coding challenge.",
        organization: "IEEE CS - University of Sri Jayewardenepura",
        icon: "Medal",
        imageUrl: "/images/Achievements/JapuraXtreme/JpuraXtreme1.jpg",
        gallery: ["/images/Achievements/JapuraXtreme/JpuraXtreme2.jpg"],
        order: 4
    },
    {
        id: "sliit-xtreme-4-top-finish",
        title: "💻 Top Leaderboard Finish – SLIIT Xtreme 4.0",
        description: "Completed the 24-hour onsite SLIIT Xtreme 4.0 programming competition as Team Velosphere, demonstrating strong focus, endurance, and teamwork under continuous pressure. Finished at the top of the HackerRank leaderboard during the Final Round, showcasing consistent problem-solving and collaboration throughout the event.",
        organization: "SLIIT",
        icon: "Code",
        imageUrl: "/images/Achievements/SliitXtreme/SliitXtreme.jpg",
        order: 5
    },
];

const ICON_MAP = {
    Trophy: Trophy,
    Medal: Medal,
    Award: Award,
    Code: Code
};

const CACHE_KEY = "achievements_v1";

const readCache = () => {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
};

const writeCache = (data) => {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {
        // no-op
    }
};

const AchievementImageCarousel = ({ achievement, onImageClick }) => {
    const images = [achievement.imageUrl, ...(achievement.gallery || [])].filter(Boolean);
    const { ref, currentIndex } = useAutoCarousel(images, 3000);
    const currentSrc = images[currentIndex];
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
    }, [currentSrc]);

    if (!currentSrc) return null;

    return (
        <div ref={ref} className="w-full relative grid grid-cols-1 items-center aspect-[4/3]">
            <div
                className={`col-start-1 row-start-1 w-full h-full relative rounded-xl overflow-hidden border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-lg transition-all duration-500 ease-in-out group-hover:scale-105 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                onClick={() => onImageClick && onImageClick(achievement)}
            >
                <OptimizedImage
                    key={currentSrc}
                    src={currentSrc}
                    alt={`${achievement.title} - ${currentIndex + 1}`}
                    className="w-full h-full object-contain"
                    pictureClassName="block w-full"
                    widths={[320, 640, 960]}
                    sizes="(max-width: 768px) 90vw, 600px"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    onLoad={() => setIsLoaded(true)}
                />
            </div>
        </div>
    );
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
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm md:text-base leading-relaxed mb-4">
                        {achievement.description}
                    </p>
                    <span className="font-mono text-xs text-primary uppercase tracking-widest">
                        {achievement.organization}
                    </span>
                </div>
            </div>

            {/* Image/Icon placeholder - alternates sides */}
            <div
                className={`${isReversed ? 'order-1 md:order-2' : 'order-1'}`}
                data-aos={isReversed ? "fade-left" : "fade-right"}
                data-aos-duration="1000"
            >
                <div className="relative w-full max-w-full">
                    {achievement.imageUrl ? (
                        <>
                            <AchievementImageCarousel
                                achievement={achievement}
                                onImageClick={achievement.onImageClick}
                            />

                            {/* Expand button */}
                            <button
                                onClick={() => achievement.onImageClick && achievement.onImageClick(achievement)}
                                className="absolute top-3 left-3 p-2 bg-black/50 hover:bg-primary text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                                title="View gallery"
                            >
                                <Expand className="w-4 h-4" />
                            </button>
                            {/* Gallery indicator */}
                            {achievement.gallery && achievement.gallery.length > 0 && (
                                <div className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-lg z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Images className="w-4 h-4" />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="w-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex items-center justify-center relative overflow-hidden group hover:border-primary transition-colors rounded-xl p-6 min-h-[300px]">
                            {/* Background pattern */}
                            <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[radial-gradient(var(--tw-gradient-stops))] from-primary/20 to-transparent"></div>

                            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-background-light dark:bg-background-dark rounded-full flex items-center justify-center mb-4 shadow-sm border border-border-light dark:border-border-dark">
                                    <Icon className="w-10 h-10 md:w-12 md:h-12 text-text-light dark:text-text-dark" />
                                </div>
                                <span className="font-mono text-xs md:text-sm text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest">
                                    {achievement.organization}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

const Achievements = () => {
    const [achievements, setAchievements] = useState(() => {
        const cached = readCache();
        return cached && cached.length > 0 ? cached : hardcodedAchievements;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);

    // Handler for opening lightbox with specific achievement images
    const handleImageClick = useCallback((achievement) => {
        const images = [achievement.imageUrl, ...(achievement.gallery || [])].filter(Boolean);
        setCurrentImages(images);
        setLightboxOpen(true);
    }, []);

    useEffect(() => {
        AOS.init({
            once: true,
            offset: 100,
            duration: 1000,
        });
    }, []);

    const fetchAchievements = useCallback(async ({ silent } = {}) => {
        if (!silent) setIsLoading(true);
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
            writeCache(data);
        } catch (error) {
            console.error("Error fetching achievements:", error);
            setAchievements(hardcodedAchievements);
            writeCache(hardcodedAchievements);
        } finally {
            if (!silent) setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const cached = readCache();
        if (Array.isArray(cached) && cached.length > 0) {
            setAchievements(cached);
        }

        fetchAchievements({ silent: true });
    }, [fetchAchievements]);

    return (
        <>
            <main
                className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-6 lg:pt-6 pb-12 lg:pb-20 min-h-screen flex flex-col justify-start relative"
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
                                achievement={{ ...achievement, onImageClick: handleImageClick }}
                                index={index}
                                isReversed={index % 2 === 0}
                            />
                        ))
                    )}
                </div>
            </main>

            {/* Lightbox for viewing full images */}
            <ImageLightbox
                images={currentImages}
                currentIndex={0}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                title="Achievement Gallery"
            />
        </>
    );
};

export default memo(Achievements);
