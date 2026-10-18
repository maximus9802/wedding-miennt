'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, HeartHandshake, Wine, Sparkles, Clock } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

const iconMap: Record<string, React.ReactNode> = {
  Camera: <Camera className="w-5 h-5 text-[#634832] transition-transform duration-300 group-hover:scale-110" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-[#634832] transition-transform duration-300 group-hover:scale-110" />,
  Wine: <Wine className="w-5 h-5 text-[#634832] transition-transform duration-300 group-hover:scale-110" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#634832] transition-transform duration-300 group-hover:scale-110" />,
};

export default function TimelineSection() {
  const { timeline } = weddingConfig;

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12"
      >
        <div className="text-xs font-serif uppercase tracking-[0.25em] text-[#8C6D52] mb-2 font-semibold">
          LỊCH TRÌNH
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#4A3425]">
          Chương Trình Lễ Cưới
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-[#B89673] to-transparent mx-auto my-3 origin-center"
        />
        <p className="text-xs sm:text-sm text-[#7A695E]">
          Những khoảnh khắc ý nghĩa được sắp xếp trọn vẹn trong ngày vui
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        {timeline.map((item, index) => {
          const isLast = index === timeline.length - 1;
          const icon = item.iconName ? iconMap[item.iconName] : <Sparkles className="w-5 h-5 text-[#634832] transition-transform duration-300 group-hover:scale-110" />;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex items-start gap-4 sm:gap-6 group ${!isLast ? 'pb-8 sm:pb-10' : ''}`}
            >
              {/* Vertical Connecting Line */}
              {!isLast && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 + 0.2 }}
                  style={{ transformOrigin: 'top' }}
                  className="absolute left-6 top-6 -bottom-6 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#B89673] via-[#B89673]/80 to-[#B89673]/50 pointer-events-none"
                  aria-hidden="true"
                />
              )}

              {/* Timeline Node Icon Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.15 + 0.1 }}
                className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-white border-2 border-[#B89673] ring-4 ring-[#EFE8E0] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:border-[#634832] group-hover:shadow-[0_6px_20px_rgba(99,72,50,0.18)] transition-all duration-300"
              >
                {icon}
              </motion.div>

              {/* Event Content Card */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 paper-card p-5 sm:p-6 rounded-2xl border border-[#B89673]/25 shadow-sm hover:shadow-md hover:border-[#B89673]/50 transition-all duration-300 bg-white"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#634832] font-serif font-bold text-xs sm:text-sm mb-2.5 border border-[#B89673]/30">
                  <Clock className="w-3.5 h-3.5 text-[#8C6D52]" />
                  <span>{item.time}</span>
                </div>
                <h3 className="text-base sm:text-lg font-serif font-semibold text-[#4A3425] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#7A695E] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
