'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { WishItem } from '@/types/wedding';
import { fetchWishes } from '@/lib/api';

export default function FloatingWishes() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Fetch wishes on mount and listen to newly submitted wishes
  useEffect(() => {
    let isSubscribed = true;

    const loadWishes = () => {
      fetchWishes().then((data) => {
        if (isSubscribed && data && data.length > 0) {
          setWishes(data);
        }
      });
    };

    loadWishes();

    if (typeof window !== 'undefined') {
      window.addEventListener('wedding:wish-submitted', loadWishes);
    }

    return () => {
      isSubscribed = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener('wedding:wish-submitted', loadWishes);
      }
    };
  }, []);

  // Cycle through wishes sequentially every 5.5 seconds
  useEffect(() => {
    if (wishes.length <= 1 || isPaused || !isVisible) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wishes.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [wishes.length, isPaused, currentIndex, isVisible]);

  if (wishes.length === 0) return null;

  const currentWish = wishes[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % wishes.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
  };

  return (
    <>
      {/* Floating minimized trigger button when closed */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed bottom-20 left-4 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#B89673]/50 shadow-lg text-xs font-serif text-[#634832] hover:scale-105 transition-all group cursor-pointer"
          title="Xem lời chúc phúc từ mọi người"
        >
          <Heart className="w-4 h-4 text-[#634832] fill-current animate-pulse" />
          <span className="font-medium">Xem lời chúc ({wishes.length})</span>
        </button>
      )}

      {/* Floating Heart / Speech Bubble Wish Stream */}
      <AnimatePresence mode="wait">
        {isVisible && currentWish && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 35, scale: 0.92 }}
            animate={{
              opacity: 1,
              y: [0, -6, 0], // Subtle continuous floating drift
              scale: 1,
              transition: {
                y: {
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
              },
            }}
            exit={{ opacity: 0, y: -25, scale: 0.95, transition: { duration: 0.35 } }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="fixed bottom-20 left-4 sm:left-6 z-40 max-w-[320px] sm:max-w-sm pointer-events-auto"
          >
            {/* Romantic Bubble Card */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#B89673]/40 shadow-2xl shadow-[#4A3425]/10 text-left overflow-hidden group">
              {/* Subtle heart background ornament */}
              <div className="absolute -right-3 -bottom-3 text-[#B89673]/10 pointer-events-none">
                <Heart className="w-20 h-20 fill-current" />
              </div>

              {/* Top row: badge & actions */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#B89673]/20">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-serif font-semibold text-[#8C6D52] uppercase tracking-wider">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B89673] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#634832]" />
                  </span>
                  <span>Lời chúc phúc #{currentIndex + 1}</span>
                </div>

                <div className="flex items-center gap-1">
                  {/* Prev / Next mini buttons */}
                  <button
                    onClick={handlePrev}
                    className="p-1 rounded-full text-[#7A695E] hover:text-[#634832] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                    aria-label="Lời chúc trước"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-1 rounded-full text-[#7A695E] hover:text-[#634832] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
                    aria-label="Lời chúc kế tiếp"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  {/* Close button */}
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-1 rounded-full text-[#7A695E]/70 hover:text-[#634832] hover:bg-[#FAF6F0] transition-colors ml-0.5 cursor-pointer"
                    aria-label="Ẩn lời chúc"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Lời chúc */}
              <div className="text-sm sm:text-base font-serif font-medium text-[#4A3425] leading-snug line-clamp-3 select-none">
                &ldquo;{currentWish.wishes}&rdquo;
              </div>

              {/* Tên người gửi */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] sm:text-xs text-[#7A695E]">
                <div className="flex items-center gap-1.5 font-sans font-medium text-[#2E241E]">
                  <span className="text-[#B89673]">✦</span>
                  <span className="tracking-wide">{currentWish.name}</span>
                  {currentWish.side && (
                    <span className="text-[10px] text-[#8C6D52] bg-[#FAF6F0] px-1.5 py-0.2 rounded border border-[#B89673]/30 font-serif">
                      {currentWish.side === 'bride' || currentWish.side === 'Nhà gái' ? 'Nhà gái' : 'Nhà trai'}
                    </span>
                  )}
                </div>

                <Heart className="w-3.5 h-3.5 text-[#B89673] fill-current opacity-70 shrink-0" />
              </div>
            </div>

            {/* Bubble tail */}
            <div className="w-3 h-3 bg-white/95 border-b border-r border-[#B89673]/40 transform rotate-45 ml-6 -mt-1.5 shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
