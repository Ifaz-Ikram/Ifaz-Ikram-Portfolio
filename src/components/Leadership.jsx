import React, { useEffect, useState, useCallback, memo } from "react";
import { Users, Calendar, Briefcase, Heart, Wallet, Expand, Calculator, Drama, Truck, Trophy } from "lucide-react";
import { db, collection, getDocs, query, orderBy } from "../firebase";
import ImageLightbox from "./ImageLightbox";
import AOS from "aos";
import "aos/dist/aos.css";

// Show More / Show Less button (matches Portfolio UI)
const ToggleButton = ({ onClick, isShowingMore }) => (
    <button
        onClick={onClick}
        className="
      px-4 py-2
      text-text-secondary-light dark:text-text-secondary-dark
      hover:text-text-light dark:hover:text-text-dark
      text-sm
      font-medium
      transition-all
      duration-300
      ease-in-out
      flex
      items-center
      gap-2
      bg-surface-light dark:bg-surface-dark
      hover:bg-background-light dark:hover:bg-background-dark
      border
      border-border-light dark:border-border-dark
      hover:border-primary
      group
      relative
      overflow-hidden
    "
    >
        <span className="relative z-10 flex items-center gap-2">
            {isShowingMore ? "See Less" : "See More"}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`
          transition-transform
          duration-300
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
            >
                <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
            </svg>
        </span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </button>
);

// Fallback hardcoded leadership experiences
const hardcodedExperiences = [
    {
        id: "csess-finance-committee",
        title: "Finance Committee Member",
        organization: "Computer Science & Engineering Student Society (CSESS) – University of Moratuwa",
        period: "Sep 2025 – Present",
        description: "Serving as a Finance Committee Member of the Computer Science & Engineering Student Society (CSESS), contributing to financial planning, budgeting support, and coordination for student-led academic and technical initiatives within the Department of Computer Science & Engineering.",
        icon: "Calculator",
        gallery: [
            "/images/Leadership & Volunteer/CSESS Finance Committe Member/CSESS.jpg"
        ],
        order: 0
    },
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
    // {
    //     id: "robogames-finance",
    //     title: "Finance Committee Lead",
    //     organization: "IESL RoboGames 25/26",
    //     period: "2025",
    //     description: "Sponsorship outreach & financial planning for the robotics competition, ensuring strict budget adherence and securing vital funding for event logistics.",
    //     icon: "Briefcase",
    //     order: 2
    // },
    // {
    //     id: "sliot-finance",
    //     title: "Finance Committee Member",
    //     organization: "SLIoT Challenge 2026",
    //     period: "2025 – 2026",
    //     description: "Budgeting and sponsorship coordination for the IoT innovation challenge, managing resource allocation and vendor payments.",
    //     icon: "Wallet",
    //     order: 3
    // },

    // {
    //     id: "muslim-majlis",
    //     title: "Executive Member",
    //     organization: "Muslim Majlis (UoM)",
    //     period: "2023 – Present",
    //     description: "Active participation in community organization and events. Planning religious and cultural gatherings to foster community spirit.",
    //     icon: "Heart",
    //     order: 5
    // },


    {
        id: "moramaths-agm-2025",
        title: "Annual General Meeting (AGM)",
        organization: "Mathematics Society – University of Moratuwa (MoraMaths)",
        period: "Oct 2025",
        description: "Participated in the Annual General Meeting of MoraMaths held on 15th October 2025. The session reflected on past initiatives, discussed future directions, and encouraged active member engagement. Proud to be part of a student-led society that promotes analytical thinking, collaboration, and community involvement.",
        icon: "Users",
        gallery: [
            "/images/Leadership & Volunteer/MORAMATHS AGM/MORAMATHS AGM 1.jpg",
            "/images/Leadership & Volunteer/MORAMATHS AGM/MORAMATHS AGM 2.jpg",
        ],
        order: 2
    },
    {
        id: "iumc-finance-committee",
        title: "Finance Committee Member – Intra-University Mathematics Competition (IUMC)",
        organization: "Mathematics Society – University of Moratuwa (MoraMaths)",
        period: "Sep 2025",
        description: "Contributed to the Intra-University Mathematics Competition (IUMC) organized by MoraMaths as a Finance Committee Member. Responsible for preparing the final budget report of the competition, gaining hands-on experience in financial documentation, budgeting, and supporting large-scale student-led academic events.",
        icon: "Calculator",
        gallery: [
            "/images/Leadership & Volunteer/IUMC/IUMC 1.jpg",
            "/images/Leadership & Volunteer/IUMC/IUMC 2.jpg"
        ],
        order: 3
    },
    {
        id: "enigma-2025-finance-committee",
        title: "Finance Committee Member – ENIGMA 2025",
        organization: "Mathematics Society – University of Moratuwa (MoraMaths)",
        period: "Sep 2025",
        description: "Contributed to ENIGMA 2025, an inter-university coding competition organized by MoraMaths, as a member of the Organizing Committee under the Finance Committee. Supported sponsorship-related communication and assisted during the preparation and execution phases of the event, gaining valuable experience in coordination, professional communication, and teamwork behind a large-scale academic competition.",
        icon: "Calculator",
        gallery: [
            "/images/Leadership & Volunteer/ENIGMA/ENIGMA 1.jpg",
            "/images/Leadership & Volunteer/ENIGMA/ENIGMA 2.jpg",
            "/images/Leadership & Volunteer/ENIGMA/ENIGMA 3.jpg",
            "/images/Leadership & Volunteer/ENIGMA/ENIGMA 4.jpg"
        ],
        order: 4
    },
    {
        id: "cse-24-inauguration-organizing-committee",
        title: "Organizing Committee Member – CSE 24 Inauguration Ceremony",
        organization: "Department of Computer Science & Engineering – University of Moratuwa",
        period: "Sep 2025",
        description: "Served as a member of the Organizing Committee for the Inauguration Ceremony of CSE 24, held on 9th September 2025 and organized by CSE 23. Contributed to planning and executing interactive activities and team-based challenges that fostered a welcoming and engaging environment for the new batch, while gaining valuable experience in coordination, teamwork, and student leadership.",
        icon: "Users",
        gallery: [
            "/images/Leadership & Volunteer/CSE 24 Inaugration/CSE 24 Inaugration 1.jpg",
            "/images/Leadership & Volunteer/CSE 24 Inaugration/CSE 24 Inaugration 2.jpg",
            "/images/Leadership & Volunteer/CSE 24 Inaugration/CSE 24 Inaugration 3.jpg"
        ],
        order: 5
    },
    {
        id: "mawisuru-rangasoba-2025",
        title: "Drama Performer – මැවිසුරු රඟසොබා 2025",
        organization: "Engineering Faculty Students’ Union – University of Moratuwa",
        period: "2025",
        description: "Participated as a drama performer representing CSE 23 at මැවිසුරු රඟසොබා – 2025, a faculty-wide cultural event involving all 12 engineering departments. Represented the Department of Computer Science & Engineering by performing the drama “Titanic”, contributing to a collaborative production that celebrated batch unity, creativity, and student culture through live performance.",
        icon: "Theater",
        gallery: [
            "/images/Leadership & Volunteer/Mawisuru/Mawisuru 1.jpg",
            "/images/Leadership & Volunteer/Mawisuru/Mawisuru 2.jpg",
            "/images/Leadership & Volunteer/Mawisuru/Mawisuru 3.jpg",
            "/images/Leadership & Volunteer/Mawisuru/Mawisuru 4.jpg"
        ],
        order: 6
    },
    {
        id: "csess-first-agm",
        title: "First Annual General Meeting (AGM)",
        organization: "Computer Science & Engineering Student Society (CSESS) – University of Moratuwa",
        period: "2025",
        description: "Participated in the first Annual General Meeting (AGM) of the Computer Science & Engineering Student Society (CSESS), marking a key milestone in strengthening student representation and collaboration within the department. Engaged in discussions that contributed to shaping a shared vision for student-led initiatives and the future growth of CSESS.",
        icon: "Users",
        gallery: [
            "/images/Leadership & Volunteer/CSESS AGM/CSESS AGM 1.jpg",
            "/images/Leadership & Volunteer/CSESS AGM/CSESS AGM 2.jpg",
            "/images/Leadership & Volunteer/CSESS AGM/CSESS AGM 3.jpg"
        ],
        order: 7
    },
    {
        id: "hanthana-batch-trip",
        title: "Hanthana Batch Trip – Finance Committee Representative",
        organization: "Engineering Faculty Students’ Union, University of Moratuwa",
        period: "June 2025",
        description: "Participated in the Hanthana Batch Trip held on June 28 as the Finance Committee Representative from CSE 23. Contributed to financial coordination by supporting departmental communication and assisting with collecting and organizing payments from CSE students. This large-scale event, involving around 500 students from Batch 23, provided valuable experience in coordination, accountability, and teamwork behind the scenes.",
        icon: "Users",
        gallery: [
            "/images/Leadership & Volunteer/Hanthana Batch Trip/Hanthana Batch Trip.jpg"
        ],
        order: 8
    },
    {
        id: "sakura-2025",
        title: "Logistics Team Member",
        organization: "Department of Computer Science & Engineering - University of Moratuwa",
        period: "April 2025",
        description: "Contributed as a member of the Logistics Team for Sakura 2025, an event organized by the Department of Computer Science & Engineering, University of Moratuwa, celebrating 40 years of CSE. Assisted with decorations and on-ground setup while working under the guidance of seniors. Gained hands-on experience in coordination, teamwork, and event execution behind the scenes of a large-scale departmental celebration.",
        icon: "Truck",
        gallery: [
            "/images/Leadership & Volunteer/Sakura/sakura1.jpg",
            "/images/Leadership & Volunteer/Sakura/sakura2.jpg",
            "/images/Leadership & Volunteer/Sakura/sakura3.jpg",
            "/images/Leadership & Volunteer/Sakura/sakura4.jpg",
            "/images/Leadership & Volunteer/Sakura/sakura5.jpg",
            "/images/Leadership & Volunteer/Sakura/sakura6.jpg"

        ],
        order: 9
    },
    {
        id: "cse23-batch-trip-riverston",
        title: "Organizing Committee Member – Finance & Coordination",
        organization: "Department of Computer Science & Engineering - University of Moratuwa",
        period: "April 2025",
        description: "Served as a member of the Organizing Committee for CSE 23 Batch Trip 1.0 held at Riverston, with participation from approximately 150 students. Primarily handled budget planning, finance coordination, and supported overall trip arrangements. Worked closely with the organizing team to ensure smooth execution, gaining valuable experience in large-scale event coordination, responsibility, leadership, and teamwork.",
        icon: "Users",
        gallery: [
            "/images/Leadership & Volunteer/CSE Reverston Trip 1.0/CSE Reverston Trip 1.0.jpg"
        ],
        order: 10
    },
    {
        id: "adscai-2025",
        title: "Organizing Committee Member – Delegates Handling & Logistics",
        organization: "Department of Computer Science & Engineering - University of Moratuwa",
        period: "2025",
        description: "Served as a member of the Organizing Committee for ADSCAI 2025 (Applied Data Science & Artificial Intelligence Symposium), contributing to delegates handling and logistics coordination. Assisted with on-ground logistics, supported delegates throughout the event, and collaborated with committee members to ensure smooth execution. Gained valuable experience in large-scale academic event coordination, teamwork, and professional communication.",
        icon: "Users",
        gallery: [
            "/images/Leadership & Volunteer/AdscAI/AdscAI1.jpg",
            "/images/Leadership & Volunteer/AdscAI/AdscAI2.jpg",
            "/images/Leadership & Volunteer/AdscAI/AdscAI3.jpg"
        ],
        order: 11
    },
    {
        id: "meugc-premier-league-2025",
        title: "Organizing Committee Member – Finance, Sponsorship & Event Coordination",
        organization: "Moratuwa Engineering Undergraduates – Galle Chapter",
        period: "January 2025",
        description: "Served as a member of the Organizing Committee for the MEUGC Premier League Cricket Tournament held on 11th January 2025. Contributed to securing sponsorships, handling financial matters, and supporting overall program organization. Worked closely with multiple teams before and during the event to ensure smooth execution. Gained valuable experience in event management, coordination, responsibility, and teamwork through involvement in this large-scale student-led sports event.",
        icon: "Trophy",
        gallery: [
            "/images/Leadership & Volunteer/MEUGC/MEUGC 1.jpg",
            "/images/Leadership & Volunteer/MEUGC/MEUGC 2.jpg",
            "/images/Leadership & Volunteer/MEUGC/MEUGC 3.jpg",
            "/images/Leadership & Volunteer/MEUGC/MEUGC 4.jpg"
        ],
        order: 12
    },
];

const ICON_MAP = {
    Users: Users,
    Calendar: Calendar,
    Briefcase: Briefcase,
    Heart: Heart,
    Wallet: Wallet,
    Calculator: Calculator,
    Theater: Drama,
    Truck: Truck,
    Trophy: Trophy,
};

const CACHE_KEY = "leadership_v1";

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

// Helper component for slideshow to adhere to Hook rules
const LeadershipImageCarousel = ({ experience, images, onClick }) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [minHeight, setMinHeight] = useState(null);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImgIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    const currentSrc = images[currentImgIndex];
    if (!currentSrc) return null;

    const handleImageLoad = (e) => {
        const height = e.target.getBoundingClientRect().height;
        if (!height) return;
        setMinHeight((prev) => Math.max(prev || 0, height));
    };

    return (
        // Canvas: Grid wrapper, invisible, fixed height (by tallest content), vertically centered items
        <div
            className="w-full relative group/canvas grid grid-cols-1 items-center cursor-pointer"
            style={minHeight ? { minHeight } : undefined}
            onClick={() => onClick(images)}
        >
            <div
                className="col-start-1 row-start-1 w-full relative rounded-xl overflow-hidden border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-lg transition-all duration-500 ease-in-out group-hover/canvas:scale-105"
            >
                <img
                    src={currentSrc}
                    alt={`${experience.title} - ${currentImgIndex + 1}`}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                    onLoad={handleImageLoad}
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
        </div>
    );
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
                        {experience.imageUrl || (experience.gallery && experience.gallery.length > 0) ? (
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

const Leadership = () => {
    const [experiences, setExperiences] = useState(() => {
        const cached = readCache();
        return cached && cached.length > 0 ? cached : hardcodedExperiences;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState('');
    const [showAll, setShowAll] = useState(false);
    const isMobile = window.innerWidth < 768;
    const initialItems = isMobile ? 2 : 3;

    // Handler for opening lightbox
    const handleImageClick = useCallback((images) => {
        setLightboxImage(images); // Now storing array
        setLightboxOpen(true);
    }, []);

    useEffect(() => {
        AOS.init({
            once: true,
            offset: 100,
            duration: 1000,
        });
    }, []);

    const fetchExperiences = useCallback(async () => {
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
            writeCache(data);
        } catch (error) {
            console.error("Error fetching leadership:", error);
            setExperiences(hardcodedExperiences);
            writeCache(hardcodedExperiences);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchExperiences();
    }, [fetchExperiences]);

    const displayedExperiences = showAll ? experiences : experiences.slice(0, initialItems);

    return (
        <main
            className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 pt-6 lg:pt-6 pb-12 lg:pb-20 min-h-screen flex flex-col justify-start"
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
                    displayedExperiences.map((experience, index) => (
                        <LeadershipCard
                            key={experience.id || index}
                            experience={{ ...experience, onImageClick: handleImageClick }}
                            index={index}
                            isReversed={index % 2 !== 0}
                        />
                    ))
                )}
            </div>

            {!isLoading && experiences.length > initialItems && (
                <div className="mt-6 w-full flex justify-center">
                    <ToggleButton
                        onClick={() => setShowAll((prev) => !prev)}
                        isShowingMore={showAll}
                    />
                </div>
            )}

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
