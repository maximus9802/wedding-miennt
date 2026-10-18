'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Mail } from 'lucide-react';

interface FooterSectionProps {
  onOpenGiftBox: () => void;
  onOpenEnvelope: () => void;
}

export default function FooterSection({ onOpenGiftBox, onOpenEnvelope }: FooterSectionProps) {
  return (
    <footer className="py-16 px-4 bg-[#241A14] text-[#FAF6F0] text-center relative overflow-hidden">
      <div className="max-w-xl mx-auto space-y-6 relative z-10">
        {/* Monogram or couple initial */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FAF6F0]/10 border border-[#B89673]/50 text-[#E8DFD3] font-serif font-bold text-lg shadow-sm"
        >
          P & M
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs sm:text-sm text-[#E8DFD3]/85 leading-relaxed max-w-md mx-auto"
        >
          Cảm ơn bạn đã luôn yêu thương, đồng hành và sẻ chia những khoảnh khắc quý giá cùng Xuân Phú & Nguyễn Miền trong chặng đường phía trước.
        </motion.p>

        {/* Action Buttons in Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="pt-2 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={onOpenGiftBox}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B89673] text-[#241A14] text-xs font-semibold hover:bg-[#C4A88F] transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
          >
            <Gift className="w-4 h-4 text-[#634832]" />
            Gửi Quà Mừng Cưới (VietQR)
          </button>

          <button
            onClick={onOpenEnvelope}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-[#B89673]/40 text-[#FAF6F0] text-xs font-medium hover:bg-white/20 transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#B89673]" />
            Xem Lại Phong Bì Mời
          </button>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-24 h-px bg-[#B89673]/30 mx-auto my-6 origin-center"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[11px] text-[#E8DFD3]/60 space-y-1"
        >
          <p>Lễ Thành Hôn • Xuân Phú & Nguyễn Miền</p>
          <p>15.11.2026 • Hải Phòng</p>
        </motion.div>
      </div>
    </footer>
  );
}
