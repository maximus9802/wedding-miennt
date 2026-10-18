'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, Heart, X } from 'lucide-react';
import { GuestInfo } from '@/types/wedding';

interface EnvelopeModalProps {
  guestInfo: GuestInfo | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose?: () => void;
}

export default function EnvelopeModal({ guestInfo, isOpen, onOpen, onClose }: EnvelopeModalProps) {
  const [isOpening, setIsOpening] = useState(false);

  const fireConfetti = () => {
    // Warm taupe, latte, mocha & champagne gold confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#B89673', '#8C6D52', '#634832', '#D4B996', '#E8DFD3', '#FAF6F0'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);
    fireConfetti();

    // Trigger main audio & open site
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  if (!isOpen) return null;

  const displayName = guestInfo?.name || 'Quý Khách & Người Thương';
  const groupLabel = guestInfo?.group || 'Khách Quý';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241A14]/85 backdrop-blur-md overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose || onOpen}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 text-[#FAF6F0] hover:bg-white/30 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient background glow */}
        <div className="absolute w-96 h-96 rounded-full bg-[#B89673]/15 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md mx-auto flex flex-col items-center">
          {/* Top greeting badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 text-center"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF6F0]/15 border border-[#B89673]/40 text-[#E8DFD3] text-xs font-medium tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C4A88F]" />
              Thiệp Cưới Online
            </span>
            <h2 className="mt-2 text-2xl font-serif text-[#FAF6F0] tracking-wide">
              Xuân Phú & Nguyễn Miền
            </h2>
          </motion.div>

          {/* Envelope Card Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="relative w-full bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#B89673]/40 overflow-hidden paper-card"
          >
            {/* Elegant foiled inner border */}
            <div className="m-3 p-6 sm:p-8 rounded-xl border border-dashed border-[#B89673]/60 flex flex-col items-center text-center relative bg-gradient-to-b from-[#FFFDF9] to-[#FAF6F0]">
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#B89673]/70" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#B89673]/70" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#B89673]/70" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#B89673]/70" />

              {/* Envelope Icon / Monogram */}
              <div className="text-xs font-serif tracking-[0.25em] text-[#8C6D52] uppercase mb-1 font-semibold">
                WEDDING INVITATION
              </div>

              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89673] to-transparent my-2" />

              {/* Recipient invitation name */}
              <p className="text-xs text-[#7A695E] uppercase tracking-wider mt-2">
                Trân trọng kính mời
              </p>
              
              <div className="my-3 py-2 px-4 rounded-lg bg-[#EFE8E0]/70 border border-[#B89673]/30 shadow-inner w-full">
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#4A3425] leading-snug">
                  {displayName}
                </h3>
                {groupLabel && (
                  <span className="inline-block mt-1 text-xs text-[#8C6D52] font-medium tracking-wide">
                    ❖ {groupLabel} ❖
                  </span>
                )}
              </div>

              {guestInfo?.customGreeting ? (
                <p className="text-xs sm:text-sm text-[#7A695E] italic my-2 max-w-xs leading-relaxed">
                  &ldquo;{guestInfo.customGreeting}&rdquo;
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-[#7A695E] my-2 leading-relaxed">
                  Đến chung vui trong ngày trọng đại cùng gia đình chúng tôi!
                </p>
              )}

              <div className="text-xs text-[#2E241E] font-medium mt-1">
                Vào lúc <span className="font-semibold text-[#634832]">09:00</span> • Ngày <span className="font-semibold text-[#634832]">22.11.2026</span>
              </div>

              {/* Wax Seal Button (Interactive trigger) */}
              <div className="mt-6 flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenEnvelope}
                  disabled={isOpening}
                  className="relative group cursor-pointer focus:outline-none"
                  aria-label="Mở thiệp cưới"
                >
                  {/* Warm Mocha Wax Seal Circle */}
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#8C6D52] via-[#634832] to-[#3B2A1E] flex items-center justify-center wax-seal-shadow transition-transform">
                    {/* Ring border inside seal */}
                    <div className="w-13 h-13 rounded-full border border-dashed border-[#E8DFD3]/50 flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-serif font-bold text-[#E8DFD3] tracking-tighter leading-none">
                        P & M
                      </span>
                      <Heart className="w-2.5 h-2.5 text-[#E8DFD3]/80 fill-current mt-0.5" />
                    </div>
                  </div>

                  {/* Pulsing ring indicator */}
                  <div className="absolute -inset-1 rounded-full border border-[#B89673]/60 animate-ping opacity-40 pointer-events-none" />
                </motion.button>

                <button
                  onClick={handleOpenEnvelope}
                  disabled={isOpening}
                  className="mt-3 text-xs font-semibold text-[#634832] uppercase tracking-widest hover:text-[#8C6D52] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#8C6D52]" />
                  <span>{isOpening ? 'Đang mở thiệp...' : 'Chạm để mở thiệp'}</span>
                </button>
              </div>
            </div>
          </motion.div>

          <p className="mt-4 text-[11px] text-[#E8DFD3]/75 text-center">
            * Âm nhạc lãng mạn sẽ tự động phát khi bạn mở thiệp
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
