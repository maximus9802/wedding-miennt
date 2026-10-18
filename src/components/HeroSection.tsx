'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { GuestInfo } from '@/types/wedding';
import CalendarTable from '@/components/CalendarTable';

interface HeroSectionProps {
  guestInfo: GuestInfo | null;
  onOpenEnvelopeModal?: () => void;
}

export default function HeroSection({ guestInfo, onOpenEnvelopeModal }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between text-center px-4 pt-16 pb-12 overflow-hidden bg-gradient-to-b from-[#EFE8E0] via-[#F7F3EE] to-[#EFE8E0]">
      {/* Subtle warm taupe glow */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#B89673]/20 to-transparent pointer-events-none" />

      {/* Top Banner & Personalized Guest Pill */}
      <div className="flex flex-col items-center max-w-xl mx-auto z-10">
        {guestInfo && (
          <motion.button
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onOpenEnvelopeModal}
            className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#B89673]/40 shadow-sm text-xs font-medium text-[#543D2B] hover:border-[#8C6D52] transition-all cursor-pointer hover:shadow-md"
            title="Bấm để xem lại phong bì thư"
          >
            <span>✉️ Kính gửi: <strong className="font-semibold text-[#3B2A1E]">{guestInfo.name}</strong></span>
            <span className="text-[10px] text-[#8C6D52] bg-[#EFE8E0] px-2 py-0.5 rounded-full border border-[#B89673]/30">
              Mở lại thiệp
            </span>
          </motion.button>
        )}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-xs font-serif uppercase tracking-[0.3em] text-[#8C6D52] mb-3 font-semibold"
        >
          SAVE THE DATE
        </motion.div>

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl font-serif text-[#4A3425] tracking-tight leading-tight"
        >
          <span className="block text-[#4A3425]">Xuân Phú</span>
          <span className="inline-flex items-center justify-center my-2 text-2xl sm:text-3xl text-[#B89673] font-script">
            &
          </span>
          <span className="block text-[#4A3425]">Nguyễn Miền</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-[#B89673] to-transparent my-4"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-xs sm:text-sm text-[#7A695E] uppercase tracking-widest font-medium"
        >
          Chủ Nhật, ngày 22 tháng 11 năm 2026
        </motion.p>
      </div>

      {/* Center Hero Photo / Visual Card (Ảnh giới thiệu) */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative my-8 z-10 w-full max-w-sm sm:max-w-md mx-auto"
      >
        <div className="relative p-2.5 rounded-3xl bg-white shadow-xl border border-[#B89673]/35 group">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-inner">
            <img
              src={weddingConfig.heroUrl || 'https://pub-f12e2b7fbdae45ef90b8185660b81476.r2.dev/image/hero.jpg'}
              alt="Xuân Phú & Nguyễn Miền"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle gradient overlay at bottom of photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-6">
              <span className="text-white font-script text-3xl tracking-wide drop-shadow-md">
                Just Married
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Calendar Section right below the intro photo, before couple section */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md mx-auto z-10"
      >
        <CalendarTable />
      </motion.div>
    </section>
  );
}
