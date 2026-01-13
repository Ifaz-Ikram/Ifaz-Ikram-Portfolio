import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");

    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Portofolio", label: "Portfolio" },
        { href: "#Achievements", label: "Achievements" },
        { href: "#Leadership", label: "Leadership" },
        { href: "#Contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = navItems.map(item => {
                const section = document.querySelector(item.href);
                if (section) {
                    return {
                        id: item.href.replace("#", ""),
                        offset: section.offsetTop - 550,
                        height: section.offsetHeight
                    };
                }
                return null;
            }).filter(Boolean);

            const currentPosition = window.scrollY;
            const active = sections.find(section =>
                currentPosition >= section.offset &&
                currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-300 border-b
            ${scrolled || isOpen
                    ? "bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-border-light dark:border-border-dark shadow-sm"
                    : "bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-sm border-border-light/50 dark:border-border-dark/50"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">

                {/* Logo */}
                <div className="font-bold text-lg tracking-tight text-primary">
                    <a href="#Home" onClick={(e) => scrollToSection(e, "#Home")}>
                        Ifaz Ikram
                    </a>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8 text-sm font-medium">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href.substring(1);
                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={`transition-colors duration-200 ${isActive
                                    ? "text-primary border-b-2 border-primary pb-0.5"
                                    : "text-text-secondary-light hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary"
                                    }`}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-text-light dark:text-text-dark p-1"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark shadow-lg px-6 py-4 flex flex-col space-y-4 animate-in slide-in-from-top-5 duration-200">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href.substring(1);
                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={`block text-sm font-medium transition-colors ${isActive
                                    ? "text-primary"
                                    : "text-text-secondary-light hover:text-primary dark:text-text-secondary-dark dark:hover:text-primary"
                                    }`}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                </div>
            )}
        </nav>
    );
};

export default Navbar;