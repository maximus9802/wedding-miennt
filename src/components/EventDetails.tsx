'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Navigation, Copy, Check } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

export default function EventDetails() {
  const { event } = weddingConfig;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const fullAddress = `${event.venueName}, ${event.venueAddress}`;
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="event-details" className="py-16 px-4 bg-[#EFE8E0] relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="text-xs font-serif uppercase tracking-[0.25em] text-[#8C6D52] mb-2 font-semibold">
            THỜI GIAN & ĐỊA ĐIỂM
          </div>
          <h2 className="text-xl min-[380px]:text-2xl sm:text-3xl md:text-4xl font-serif text-[#4A3425] tracking-tight sm:tracking-normal whitespace-nowrap">
            Lễ Thành Hôn & Tiệc Cưới
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#B89673] to-transparent mx-auto my-3"
          />
          <p className="text-xs sm:text-sm text-[#7A695E]">
            Sự hiện diện của Quý khách là niềm vinh hạnh lớn cho gia đình chúng tôi!
          </p>
        </motion.div>

        {/* Unified Ceremony, Location & Embedded Google Map Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="paper-card rounded-3xl p-4 sm:p-8 md:p-10 bg-white border border-[#B89673]/30 shadow-xl space-y-8"
        >
          {/* Time & Venue Info Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#B89673]/20 text-center md:text-left">
            {/* Time */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-1.5"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#B89673]/30 text-xs font-serif font-medium text-[#634832]">
                <Clock className="w-3.5 h-3.5 text-[#8C6D52]" />
                LỄ THÀNH HÔN
              </div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#4A3425]">
                {event.time}
              </div>
              <div className="text-base font-serif font-medium text-[#2E241E]">
                Chủ Nhật, ngày 15/11/2026
              </div>
              <div className="text-xs text-[#8C6D52] font-medium">
                ({event.lunarDate})
              </div>
            </motion.div>

            {/* Venue & Address */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="space-y-2 md:max-w-md"
            >
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#4A3425] font-serif font-bold text-xl sm:text-2xl">
                <MapPin className="w-6 h-6 text-[#8C6D52] shrink-0" />
                <span>{event.venueName}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#7A695E] leading-relaxed">
                {event.venueAddress}
              </p>
              <p className="text-xs text-[#8C6D52] italic">
                (Hôn lễ và bữa cơm thân mật được tổ chức tại tư gia nhà trai)
              </p>
            </motion.div>
          </div>

          {/* Action Buttons: Direct Google Maps & Copy Address */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#634832] text-white text-xs sm:text-sm font-medium tracking-wide shadow-md hover:bg-[#78583E] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#E8DFD3]" />
              Mở Google Maps Chỉ Đường
            </a>

            <button
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#FAF6F0] border border-[#B89673]/40 text-xs sm:text-sm font-medium text-[#7A695E] hover:text-[#2E241E] hover:bg-white transition-all shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#634832]" />
                  <span className="text-[#634832] font-semibold">Đã sao chép địa chỉ</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#8C6D52]" />
                  <span>Sao chép địa chỉ</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Embedded Google Maps right below the buttons in the same card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="space-y-2"
          >
            <div className="text-xs text-[#7A695E] font-medium flex items-center justify-between px-1">
              <span>📍 Vị trí trực tiếp trên bản đồ:</span>
              <span className="text-[11px] text-[#8C6D52] italic">* Bạn có thể chạm/lướt để phóng to bản đồ</span>
            </div>
            <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-[#B89673]/35 shadow-inner relative bg-[#EAE1D6]">
              <iframe
                src={event.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ vị trí Nhà văn hóa thôn 5"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
