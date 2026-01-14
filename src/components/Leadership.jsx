import React, { useEffect, useState, useCallback, memo } from "react";
import { Users, Calendar, Briefcase, Heart, Wallet, Expand } from "lucide-react";
import { db, collection, getDocs, query, orderBy } from "../firebase";
import ImageLightbox from "./ImageLightbox";
import AOS from "aos";
import "aos/dist/aos.css";

// Fallback hardcoded leadership experiences
const hardcodedExperiences = [
    {
        id: "dept-rep",
        title: "Department Representative (Semester 2 & 3)",
        organization: "Department of Computer Science & Engineering - University of Moratuwa",
        period: "Mar 2025 – Jan 2026",
        description: "Served as a Department Representative for Semesters 2 & 3 of the Department of Computer Science & Engineering (CSE 23). Represented batch interests, coordinated with lecturers and peers, fostered strong batch unity, and contributed to creating a supportive and memorable student experience through teamwork and leadership.",
        icon: "Users",
        imageUrl: "/images/Leadership & Volunteer/Rep/Rep1.jpg",
        gallery: ["/images/Leadership & Volunteer/Rep/Rep2.jpg"],
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
            <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}>
                {/* Icon/Image Section */}
                <div
                    className={`w-full md:w-1/2 flex justify-center ${isReversed ? 'md:justify-start' : 'md:justify-end'}`}
                    data-aos={isReversed ? "fade-left" : "fade-right"}
                    data-aos-duration="1000"
                >
                    <div className="relative w-full max-w-full">
                        {experience.imageUrl ? (
                            (() => {
                                const images = [experience.imageUrl, ...(experience.gallery || [])].filter(Boolean);
                                return (
                                    <LeadershipImageCarousel
                                        experience={experience}
                                        images={images}
                                        onClick={(img) => experience.onImageClick && experience.onImageClick(images)}
                                    />
                                );
                            })()
                        ) : (
                            <div className="w-full bg-surface-light dark:bg-surface-dark flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-border-light dark:border-border-dark p-8 rounded-xl aspect-video md:aspect-auto min-h-[300px]">
                                <Icon className="w-16 h-16 text-text-secondary-light dark:text-text-secondary-dark" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div
                    className={`w-full md:w-1/2 flex flex-col ${isReversed ? 'items-start md:items-end md:text-right' : 'items-start'}`}
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

// Helper component for slideshow to adhere to Hook rules
const LeadershipImageCarousel = ({ experience, images, onClick }) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImgIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        // Canvas: Grid wrapper, invisible, fixed height (by tallest content), vertically centered items
        <div
            className="w-full relative group/canvas grid grid-cols-1 items-center cursor-pointer"
            onClick={() => onClick(images)}
        >
            {/* Render all images, each wrapped in its own 'Container' */}
            {images.map((imgSrc, idx) => (
                <div
                    key={idx}
                    className={`col-start-1 row-start-1 w-full relative rounded-xl overflow-hidden border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-lg transition-all duration-500 ease-in-out group-hover/canvas:scale-105 ${idx === currentImgIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                >
                    <img
                        src={imgSrc}
                        alt={`${experience.title} - ${idx + 1}`}
                        className="w-full h-auto object-contain"
                    />

                    {/* Expand button - inside the container so it stays with the image */}
                    <button
                        className="absolute top-3 left-3 p-2 bg-black/50 hover:bg-primary text-white rounded-lg opacity-0 group-hover/canvas:opacity-100 transition-all duration-300 z-20 cursor-pointer"
                        title="View full image"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick(images);
                        }}
                    >
                        <Expand className="w-4 h-4" />
                    </button>

                    {/* Gallery Indicator */}
                    {images.length > 1 && (
                        <div className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-md z-20 pointer-events-none opacity-0 group-hover/canvas:opacity-100 transition-opacity duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 22H4a2 2 0 0 1-2-2V6" />
                                <path d="M22 2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
                                <path d="M11 14l2.5-3 2.5 3" />
                                <path d="M8 10l2 4" />
                            </svg>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const Leadership = () => {
    const [experiences, setExperiences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState('');

    // Handler for opening lightbox
    const handleImageClick = useCallback((images) => {
        setLightboxImage(images); // Now storing array
        setLightboxOpen(true);
    }, []);

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
                            experience={{ ...experience, onImageClick: handleImageClick }}
                            index={index}
                            isReversed={index % 2 !== 0}
                        />
                    ))
                )}
            </div>

            {/* Lightbox for viewing full images */}
            <ImageLightbox
                images={Array.isArray(lightboxImage) ? lightboxImage : [lightboxImage]}
                currentIndex={0}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                title="Leadership"
            />
        </main>
    );
};

export default memo(Leadership);