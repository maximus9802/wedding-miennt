'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingConfig.event.isoDateTime).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent('Đám cưới Xuân Phú & Nguyễn Miền');
    const details = encodeURIComponent('Lễ Thành Hôn & Tiệc Cưới Xuân Phú & Nguyễn Miền');
    const location = encodeURIComponent(`${weddingConfig.event.venueName}, ${weddingConfig.event.venueAddress}`);
    const dates = '20261122T020000Z/20261122T050000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const timeUnits = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg mx-auto mt-12 text-center"
    >
      <div className="text-xs font-serif uppercase tracking-[0.25em] text-[#8C6D52] mb-3 font-semibold">
        ĐẾM NGƯỢC NGÀY CHUNG ĐÔI
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 p-4 rounded-2xl bg-white border border-[#B89673]/30 shadow-md">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: index * 0.08,
            }}
            className="flex flex-col items-center p-2 rounded-xl bg-[#FAF6F0]"
          >
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#634832]">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-[#7A695E] uppercase tracking-wider mt-1">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons: Add to Calendar & Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-5 flex items-center justify-center gap-3 flex-wrap"
      >
        <a
          href={createGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#634832] text-white text-xs font-medium tracking-wide shadow-md hover:bg-[#78583E] transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          Lưu vào Lịch Google
        </a>

        <a
          href="#event-details"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#B89673]/50 text-[#634832] text-xs font-medium tracking-wide shadow-sm hover:bg-[#FAF6F0] transition-all cursor-pointer"
        >
          <MapPin className="w-3.5 h-3.5 text-[#8C6D52]" />
          Xem Địa Điểm
        </a>
      </motion.div>
    </motion.div>
  );
}
