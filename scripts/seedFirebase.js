/**
 * Firebase Seed Script for Portfolio Data
 * 
 * Run this script to populate Firestore with initial data.
 * 
 * Usage:
 *   1. Make sure you're in the project directory
 *   2. Run: npm run seed
 *   
 * Note: This script uses ES modules. The project's package.json should have "type": "module"
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Firebase configuration (same as your src/firebase.js)
const firebaseConfig = {
    apiKey: "AIzaSyBjX-P4ZebmA4cxdaSncBj-FpRBD4O3NwU",
    authDomain: "ifaz-portfolio.firebaseapp.com",
    projectId: "ifaz-portfolio",
    storageBucket: "ifaz-portfolio.firebasestorage.app",
    messagingSenderId: "548993498498",
    appId: "1:548993498498:web:09e6f0b45baba98195bf22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================
// PROJECTS DATA
// ============================================
const projectsData = [
    {
        Title: "Nano-Processor",
        Description: "A 4-bit RISC processor implemented in VHDL with a custom instruction set supporting arithmetic operations (ADD, NEG), bitwise operations (NOT, AND, OR, XOR), immediate load (MOVI), and conditional jumps (JZR), featuring an 8-register bank and seven-segment display interface for FPGA deployment.",
        Img: "https://raw.githubusercontent.com/Rashmika-Nawanjana/Nano-Processor/main/image.png",
        Link: "https://github.com/Rashmika-Nawanjana/Nano-Processor",
        Github: "https://github.com/Rashmika-Nawanjana/Nano-Processor",
        TechStack: ["VHDL", "Vivado", "FPGA Design", "Digital Logic"],
        Features: [
            "Custom 13-bit instruction set with 8 opcodes",
            "8-register bank (R0-R7) with 4-bit data width",
            "ALU with dual-mode operation (arithmetic/bitwise)",
            "Bitwise operations: NOT, AND, OR, XOR",
            "Arithmetic operations: ADD, NEG (two's complement)",
            "Immediate value loading (MOVI)",
            "Conditional jump on zero (JZR)",
            "Seven-segment display decoder for output",
            "Configurable clock modes (normal/step-by-step)",
            "Overflow and zero flag detection"
        ],
        Gallery: [], // Add additional image URLs here
        order: 1
    },
    {
        Title: "LeoConnect",
        Description: "Social networking platform with edge-first backend APIs. Engineered authentication, file storage, and optimized DB migrations using Kotlin Multiplatform and Cloudflare Workers.",
        Img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60",
        Link: "https://github.com/Ifaz-Ikram",
        Github: "https://github.com/Ifaz-Ikram",
        TechStack: ["Kotlin", "TypeScript", "Cloudflare Workers"],
        Features: [
            "Edge-first backend architecture",
            "Authentication system",
            "File storage integration",
            "Database migrations"
        ],
        Gallery: [],
        order: 2
    },
    {
        Title: "Ceylon Guides",
        Description: "Tourism & guide discovery platform with responsive web interfaces and scalable backend integrations. Part of the Rexosphere ecosystem.",
        Img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60",
        Link: "#",
        Github: "Private",
        TechStack: ["Vue", "Nuxt", "TypeScript"],
        Features: [
            "Guide discovery system",
            "Tour booking interface",
            "Responsive web design",
            "Backend integrations"
        ],
        Gallery: [],
        order: 3
    },
    {
        Title: "Department Rep Election System",
        Description: "Internal web application for CSE Department Representative elections. Built for reliability and internal usability with academic election workflows.",
        Img: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop&q=60",
        Link: "#",
        Github: "Private",
        TechStack: ["TypeScript", "React", "Firebase"],
        Features: [
            "Academic election workflows",
            "Secure voting system",
            "Results tabulation",
            "Admin dashboard"
        ],
        Gallery: [],
        order: 4
    },
    {
        Title: "Money-Splitter",
        Description: "Expense management app with designed onboarding flow and undo functionality. Led UI/UX with 7,300+ lines of code refactoring.",
        Img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60",
        Link: "https://github.com/Ifaz-Ikram",
        Github: "https://github.com/Ifaz-Ikram",
        TechStack: ["Kotlin Multiplatform", "Jetpack Compose"],
        Features: [
            "Expense splitting logic",
            "Undo/redo functionality",
            "Onboarding flow",
            "Cross-platform support"
        ],
        Gallery: [],
        order: 5
    },
    {
        Title: "SkyNest Hotel Management",
        Description: "Full-stack hotel management system with reservation & guest service workflows, REST API & database schema design.",
        Img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
        Link: "https://github.com/Ifaz-Ikram",
        Github: "https://github.com/Ifaz-Ikram",
        TechStack: ["JavaScript", "PostgreSQL", "PL/pgSQL"],
        Features: [
            "Reservation system",
            "Guest service workflows",
            "REST API design",
            "Database schema design"
        ],
        Gallery: [],
        order: 6
    }
];

// ============================================
// ACHIEVEMENTS DATA
// ============================================
const achievementsData = [
    {
        title: "Champion – BashAway 2025",
        description: "Scripting & Automation Competition organized by SLIIT FOSS. Demonstrated advanced bash scripting and system automation techniques to secure the top spot among 50+ teams.",
        organization: "SLIIT FOSS",
        icon: "Trophy",
        link: "#",
        linkText: "View Certificate",
        imageUrl: "", // Add Firebase Storage URL here if you have an image
        order: 1
    },
    {
        title: "Champion – AlgoArena 2025",
        description: "Built LeoConnect (Leo Club of USJ). A full-stack solution for managing club activities and member engagement, winning first place for innovation and utility.",
        organization: "Leo Club USJ",
        icon: "Trophy",
        link: "#",
        linkText: "View Project",
        imageUrl: "",
        order: 2
    },
    {
        title: "Champion – HaXtreme 4.0",
        description: "IEEE Computer Society – University of Ruhuna. Solved complex algorithmic problems under time pressure to clinch the championship title.",
        organization: "IEEE CS",
        icon: "Trophy",
        link: "#",
        linkText: "Verify Award",
        imageUrl: "",
        order: 3
    },
    {
        title: "1st Runners-Up – J'pura Xtreme 2.0",
        description: "A grueling 24-hour inter-university coding competition. Showcased endurance and problem-solving skills to secure the second place on the podium.",
        organization: "J'pura",
        icon: "Medal",
        link: "#",
        linkText: "See Standings",
        imageUrl: "",
        order: 4
    },
    {
        title: "Finalist – SLIIT Xtreme 4.0",
        description: "Topped the HackerRank leaderboard during the intense onsite finals. Recognized for writing the most optimized solutions for hard-level problems.",
        organization: "HackerRank",
        icon: "Award",
        link: "#",
        linkText: "Leaderboard",
        imageUrl: "",
        order: 5
    }
];

// ============================================
// LEADERSHIP DATA
// ============================================
const leadershipData = [
    {
        title: "Department Representative",
        organization: "CSE Batch '23 – University of Moratuwa",
        period: "2025 – Present",
        description: "Representing students for Semesters 2 & 3, strengthening communication between faculty and the student body to ensure academic concerns are addressed effectively.",
        icon: "Users",
        imageUrl: "",
        order: 1
    },
    {
        title: "Finance Committee Lead",
        organization: "IESL RoboGames 25/26",
        period: "2025",
        description: "Sponsorship outreach & financial planning for the robotics competition, ensuring strict budget adherence and securing vital funding for event logistics.",
        icon: "Briefcase",
        imageUrl: "",
        order: 2
    },
    {
        title: "Finance Committee Member",
        organization: "SLIoT Challenge 2026",
        period: "2025 – 2026",
        description: "Budgeting and sponsorship coordination for the IoT innovation challenge, managing resource allocation and vendor payments.",
        icon: "Wallet",
        imageUrl: "",
        order: 3
    },
    {
        title: "Organizing Committee",
        organization: "ADSCAI 2025 (Logistics)",
        period: "2025",
        description: "Delegate handling & event logistics for the AI conference. Ensuring smooth operations on-site, including registration and venue management.",
        icon: "Calendar",
        imageUrl: "",
        order: 4
    },
    {
        title: "Executive Member",
        organization: "Muslim Majlis (UoM)",
        period: "2023 – Present",
        description: "Active participation in community organization and events. Planning religious and cultural gatherings to foster community spirit.",
        icon: "Heart",
        imageUrl: "",
        order: 5
    }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

async function clearCollection(collectionName) {
    console.log(`🗑️  Clearing ${collectionName} collection...`);
    const snapshot = await getDocs(collection(db, collectionName));
    for (const docSnap of snapshot.docs) {
        await deleteDoc(doc(db, collectionName, docSnap.id));
    }
    console.log(`   ✓ Cleared ${snapshot.size} documents`);
}

async function seedCollection(collectionName, data) {
    console.log(`\n📦 Seeding ${collectionName}...`);
    for (const item of data) {
        const docRef = await addDoc(collection(db, collectionName), item);
        console.log(`   ✓ Added: ${item.Title || item.title} (${docRef.id})`);
    }
    console.log(`   ✅ Seeded ${data.length} documents to ${collectionName}`);
}

// ============================================
// MAIN SEED FUNCTION
// ============================================

async function seed() {
    console.log("🚀 Starting Firebase Seed Process...\n");
    console.log("=".repeat(50));

    try {
        // Clear existing data (optional - comment out if you want to keep existing)
        await clearCollection("projects");
        await clearCollection("achievements");
        await clearCollection("leadership");

        // Seed new data
        await seedCollection("projects", projectsData);
        await seedCollection("achievements", achievementsData);
        await seedCollection("leadership", leadershipData);

        console.log("\n" + "=".repeat(50));
        console.log("🎉 Seeding complete!");
        console.log("\nSummary:");
        console.log(`   • Projects: ${projectsData.length}`);
        console.log(`   • Achievements: ${achievementsData.length}`);
        console.log(`   • Leadership: ${leadershipData.length}`);
        console.log("\n💡 Tip: Add imageUrl values in Firestore console after uploading images to Storage");

    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }

    process.exit(0);
}

// Run the seed
seed();
