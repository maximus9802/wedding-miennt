'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

export default function CoupleSection() {
  const { groom, bride } = weddingConfig;

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#4A3425] mb-4">
          Thân mời tới dự lễ cưới thân mật của chúng tôi
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-[#B89673] to-transparent mx-auto mb-12 origin-center"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative items-stretch">
        {/* Groom Card (Slides in from Left) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="paper-card w-full h-full p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-between relative group hover:shadow-xl transition-all border border-[#B89673]/30 bg-white"
        >
          <div className="flex flex-col items-center w-full">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#B89673] to-[#EFE8E0] shadow-lg mb-4">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={groom.avatarUrl}
                  alt={groom.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="absolute -bottom-2 right-4 px-3 py-0.5 rounded-full bg-[#634832] text-white text-[11px] font-medium shadow-sm">
                Chú Rể
              </span>
            </div>

            <h3 className="text-2xl font-serif text-[#4A3425] font-semibold mt-2">
              {groom.name}
            </h3>
            <p className="text-xs text-[#8C6D52] uppercase tracking-wider mb-3 font-medium">
              {groom.fullName}
            </p>

            <div className="w-12 h-px bg-[#B89673]/30 my-2" />
          </div>

          <div className="text-xs text-[#7A695E] space-y-1 min-h-[4.5rem] flex flex-col justify-center">
            <p className="font-medium text-[#2E241E]">Đại diện Nhà Trai:</p>
            {groom.fatherName && <p>{groom.fatherName}</p>}
            {groom.motherName && <p>{groom.motherName}</p>}
          </div>
        </motion.div>

        {/* Center Heart Badge (Desktop Pop in) */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -25 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.35 }}
          className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FAF6F0] border-2 border-[#B89673] items-center justify-center shadow-md z-10"
        >
          <Heart className="w-6 h-6 text-[#634832] fill-current animate-pulse" />
        </motion.div>

        {/* Bride Card (Slides in from Right) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="paper-card w-full h-full p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-between relative group hover:shadow-xl transition-all border border-[#B89673]/30 bg-white"
        >
          <div className="flex flex-col items-center w-full">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#B89673] to-[#EFE8E0] shadow-lg mb-4">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={bride.avatarUrl}
                  alt={bride.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="absolute -bottom-2 right-4 px-3 py-0.5 rounded-full bg-[#634832] text-white text-[11px] font-medium shadow-sm">
                Cô Dâu
              </span>
            </div>

            <h3 className="text-2xl font-serif text-[#4A3425] font-semibold mt-2">
              {bride.name}
            </h3>
            <p className="text-xs text-[#8C6D52] uppercase tracking-wider mb-3 font-medium">
              {bride.fullName}
            </p>

            <div className="w-12 h-px bg-[#B89673]/30 my-2" />
          </div>

          <div className="text-xs text-[#7A695E] space-y-1 min-h-[4.5rem] flex flex-col justify-center">
            <p className="font-medium text-[#2E241E]">Đại diện Nhà Gái:</p>
            {bride.fatherName && <p>{bride.fatherName}</p>}
            {bride.motherName && <p>{bride.motherName}</p>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
