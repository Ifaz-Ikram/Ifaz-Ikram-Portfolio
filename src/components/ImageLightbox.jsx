import React, { useEffect, useCallback, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Download } from 'lucide-react';

/**
 * ImageLightbox - A reusable lightbox component for viewing full-size images
 * 
 * Usage:
 * <ImageLightbox
 *   images={['url1.jpg', 'url2.jpg']}  // Array of image URLs
 *   currentIndex={0}                    // Starting image index
 *   isOpen={true}                       // Whether lightbox is open
 *   onClose={() => setIsOpen(false)}   // Close handler
 *   title="Project Name"               // Optional title
 * />
 */
const ImageLightbox = ({
    images = [],
    currentIndex = 0,
    isOpen,
    onClose,
    title = ''
}) => {
    const [activeIndex, setActiveIndex] = useState(currentIndex);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Sync activeIndex with currentIndex prop
    useEffect(() => {
        setActiveIndex(currentIndex);
    }, [currentIndex]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'Escape':
                onClose();
                break;
            case 'ArrowLeft':
                setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
                break;
            case 'ArrowRight':
                setActiveIndex((prev) => (prev + 1) % images.length);
                break;
            default:
                break;
        }
    }, [isOpen, onClose, images.length]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen || images.length === 0) return null;

    const hasMultiple = images.length > 1;

    const goNext = () => {
        setIsLoading(true);
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const goPrev = () => {
        setIsLoading(true);
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-fadeIn"
                onClick={onClose}
            />

            {/* Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 md:p-8">

                {/* Header */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/50 to-transparent z-20">
                    {/* Title and counter */}
                    <div className="flex items-center gap-4">
                        {title && (
                            <h3 className="text-white font-semibold text-lg truncate max-w-xs md:max-w-lg">
                                {title}
                            </h3>
                        )}
                        {hasMultiple && (
                            <span className="text-white/70 text-sm font-mono">
                                {activeIndex + 1} / {images.length}
                            </span>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleZoom}
                            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title={isZoomed ? "Fit to screen" : "Zoom in"}
                        >
                            <ZoomIn className="w-5 h-5" />
                        </button>
                        <a
                            href={images[activeIndex]}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="Download image"
                        >
                            <Download className="w-5 h-5" />
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="Close (Esc)"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Main Image */}
                <div
                    className={`relative flex items-center justify-center transition-all duration-300 ${isZoomed ? 'cursor-zoom-out overflow-auto max-w-none max-h-none' : 'cursor-zoom-in max-w-full max-h-[85vh]'
                        }`}
                    onClick={toggleZoom}
                >
                    {/* Loading spinner */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    <img
                        src={images[activeIndex]}
                        alt={`${title} - Image ${activeIndex + 1}`}
                        className={`transition-all duration-300 select-none ${isLoading ? 'opacity-0' : 'opacity-100'
                            } ${isZoomed
                                ? 'max-w-none max-h-none'
                                : 'max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl'
                            }`}
                        onLoad={() => setIsLoading(false)}
                        draggable={false}
                    />
                </div>

                {/* Navigation Arrows */}
                {hasMultiple && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all transform hover:scale-110 z-20"
                            title="Previous (←)"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all transform hover:scale-110 z-20"
                            title="Next (→)"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Thumbnail dots */}
                {hasMultiple && (
                    <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setIsLoading(true); setActiveIndex(idx); }}
                                className={`transition-all duration-300 rounded-full ${idx === activeIndex
                                        ? 'w-8 h-2 bg-primary'
                                        : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                                    }`}
                                title={`Go to image ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Animations */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
        </div>
    );
};

export default ImageLightbox;
