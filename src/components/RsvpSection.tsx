'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Heart, Users, MessageSquareHeart, ChevronDown, Check } from 'lucide-react';
import { GuestInfo, RsvpSubmission } from '@/types/wedding';
import { submitRsvp } from '@/lib/api';
import CountdownTimer from '@/components/CountdownTimer';

interface RsvpSectionProps {
  guestInfo: GuestInfo | null;
}

const guestOptions = [
  { value: 0, label: 'Đi một mình (0 người đi cùng)' },
  { value: 1, label: '1 người đi cùng (+1 người)' },
  { value: 2, label: '2 người đi cùng (+2 người)' },
  { value: 3, label: '3 người đi cùng (+3 người)' },
  { value: 4, label: 'Đi cùng cả gia đình (4+ người)' },
];

const sideOptions: Array<{ value: 'Nhà trai' | 'Nhà gái'; label: string; desc: string }> = [
  { value: 'Nhà trai', label: 'Nhà Trai', desc: 'Chú rể Xuân Phú' },
  { value: 'Nhà gái', label: 'Nhà Gái', desc: 'Cô dâu Nguyễn Miền' },
];

export default function RsvpSection({ guestInfo }: RsvpSectionProps) {
  const [formData, setFormData] = useState<RsvpSubmission>(() => ({
    fullName: guestInfo?.name || '',
    guestId: guestInfo?.id,
    isAttending: true,
    accompanyingGuests: 0,
    side: 'Nhà trai',
    wishes: '',
  }));

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [isSideDropdownOpen, setIsSideDropdownOpen] = useState(false);
  const guestDropdownRef = useRef<HTMLDivElement>(null);
  const sideDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target as Node)) {
        setIsGuestDropdownOpen(false);
      }
      if (sideDropdownRef.current && !sideDropdownRef.current.contains(event.target as Node)) {
        setIsSideDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const prevGuestIdRef = useRef<string | undefined>(guestInfo?.id);
  useEffect(() => {
    if (guestInfo && guestInfo.id !== prevGuestIdRef.current) {
      prevGuestIdRef.current = guestInfo.id;
      const timer = setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          guestId: guestInfo.id,
          fullName: prev.fullName || guestInfo.name,
        }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [guestInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const result = await submitRsvp(formData);

    setLoading(false);

    if (result.success) {
      setSubmitted(true);

      // Trigger warm latte & mocha confetti
      confetti({
        particleCount: 130,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8C6D52', '#B89673', '#634832', '#D4B996', '#EFE8E0', '#FFFDF9'],
      });
    } else {
      setErrorMsg(result.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <section id="rsvp" className="py-16 px-4 bg-[#EFE8E0] relative overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <div className="text-xs font-serif uppercase tracking-[0.25em] text-[#8C6D52] mb-2 font-semibold">
            SỔ LƯU BÚT & XÁC NHẬN
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#4A3425]">
            Gửi Lời Chúc & Xác Nhận Tham Dự
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#B89673] to-transparent mx-auto my-3 origin-center"
          />
          <p className="text-xs sm:text-sm text-[#7A695E]">
            Sự hiện diện của bạn là niềm vui trọn vẹn của chúng mình. Hãy phản hồi sớm để tụi mình chuẩn bị chu đáo nhất nhé!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="paper-card rounded-3xl p-6 sm:p-8 bg-white border border-[#B89673]/30 shadow-xl"
        >
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border-2 border-[#B89673] flex items-center justify-center mx-auto text-[#634832] shadow-sm">
                <Heart className="w-8 h-8 fill-current text-[#634832]" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#4A3425]">
                Cảm Ơn Bạn Rất Nhiều!
              </h3>
              <p className="text-xs sm:text-sm text-[#7A695E] max-w-md mx-auto leading-relaxed">
                Những lời chúc phúc chân thành và sự đồng hành của bạn sẽ là động lực tuyệt vời để Xuân Phú & Nguyễn Miền cùng nhau bước vào hành trình hôn nhân hạnh phúc!
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData((prev) => ({
                      ...prev,
                      wishes: '',
                    }));
                  }}
                  className="text-xs font-medium text-[#8C6D52] hover:text-[#4A3425] underline underline-offset-4 cursor-pointer"
                >
                  Gửi thêm một lời chúc khác
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-[#2E241E] uppercase tracking-wider mb-1.5">
                  Họ và tên của bạn <span className="text-[#634832]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn A, Bạn Minh..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#B89673]/40 bg-[#FAF6F0] text-sm text-[#2E241E] focus:outline-none focus:ring-2 focus:ring-[#8C6D52]/30 focus:border-[#634832]"
                />
              </div>

              {/* Attendance Options */}
              <div>
                <label className="block text-xs font-medium text-[#2E241E] uppercase tracking-wider mb-2">
                  Bạn sẽ tham dự chứ?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isAttending: true })}
                    className={`py-3 px-4 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.isAttending
                        ? 'border-[#634832] bg-[#634832] text-white shadow-sm'
                        : 'border-[#B89673]/35 bg-[#FAF6F0] text-[#7A695E] hover:bg-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Xác nhận tham dự
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isAttending: false, accompanyingGuests: 0 })}
                    className={`py-3 px-4 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      !formData.isAttending
                        ? 'border-[#634832] bg-[#634832] text-white shadow-sm'
                        : 'border-[#B89673]/35 bg-[#FAF6F0] text-[#7A695E] hover:bg-white'
                    }`}
                  >
                    <span>Rất tiếc không thể đến</span>
                  </button>
                </div>
              </div>

              {/* Accompanying Guests & Side (only when attending) */}
              {formData.isAttending && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Number of Guests Custom Dropdown */}
                  <div className="relative" ref={guestDropdownRef}>
                    <label className="block text-xs font-medium text-[#2E241E] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#8C6D52]" />
                      Số người đi cùng
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsGuestDropdownOpen((prev) => !prev);
                        setIsSideDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#B89673]/40 bg-[#FAF6F0] text-sm text-[#2E241E] flex items-center justify-between hover:bg-white hover:border-[#634832]/50 focus:outline-none focus:ring-2 focus:ring-[#8C6D52]/30 transition-all text-left shadow-xs cursor-pointer"
                    >
                      <span className="truncate">
                        {guestOptions.find((o) => o.value === formData.accompanyingGuests)?.label || 'Đi một mình (0 người đi cùng)'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8C6D52] shrink-0 ml-2 transition-transform duration-200 ${
                          isGuestDropdownOpen ? 'rotate-180 text-[#634832]' : ''
                        }`}
                      />
                    </button>

                    {isGuestDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-[#B89673]/40 shadow-xl py-1 z-30 max-h-60 overflow-y-auto">
                        {guestOptions.map((opt) => {
                          const isSelected = formData.accompanyingGuests === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, accompanyingGuests: opt.value });
                                setIsGuestDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-xs sm:text-sm text-left flex items-center justify-between transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#FAF6F0] text-[#634832] font-semibold'
                                  : 'text-[#2E241E] hover:bg-[#FAF6F0] hover:text-[#634832]'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {isSelected && <Check className="w-4 h-4 text-[#634832] shrink-0 ml-2" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Side (Nhà trai / Nhà gái) Custom Selection */}
                  <div className="relative" ref={sideDropdownRef}>
                    <label className="block text-xs font-medium text-[#2E241E] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-[#8C6D52]" />
                      Bạn là khách của
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSideDropdownOpen((prev) => !prev);
                        setIsGuestDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#B89673]/40 bg-[#FAF6F0] text-sm text-[#2E241E] flex items-center justify-between hover:bg-white hover:border-[#634832]/50 focus:outline-none focus:ring-2 focus:ring-[#8C6D52]/30 transition-all text-left shadow-xs cursor-pointer"
                    >
                      <span className="truncate">
                        {formData.side === 'Nhà trai'
                          ? 'Nhà Trai (Chú rể Xuân Phú)'
                          : 'Nhà Gái (Cô dâu Nguyễn Miền)'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8C6D52] shrink-0 ml-2 transition-transform duration-200 ${
                          isSideDropdownOpen ? 'rotate-180 text-[#634832]' : ''
                        }`}
                      />
                    </button>

                    {isSideDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-[#B89673]/40 shadow-xl py-1 z-30 overflow-y-auto">
                        {sideOptions.map((opt) => {
                          const isSelected = formData.side === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, side: opt.value });
                                setIsSideDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-xs sm:text-sm text-left flex items-center justify-between transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#FAF6F0] text-[#634832] font-semibold'
                                  : 'text-[#2E241E] hover:bg-[#FAF6F0] hover:text-[#634832]'
                              }`}
                            >
                              <span>
                                {opt.label} ({opt.desc})
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-[#634832] shrink-0 ml-2" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Wishes */}
              <div>
                <label className="block text-xs font-medium text-[#2E241E] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MessageSquareHeart className="w-3.5 h-3.5 text-[#8C6D52]" />
                  Lời chúc gửi đến Cô dâu & Chú rể
                </label>
                <textarea
                  rows={3}
                  value={formData.wishes}
                  onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                  placeholder="Gửi gắm lời chúc phúc thân thương nhất..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#B89673]/40 bg-[#FAF6F0] text-sm text-[#2E241E] focus:outline-none focus:ring-2 focus:ring-[#8C6D52]/30 focus:border-[#634832]"
                />
              </div>

              {errorMsg && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-full bg-[#634832] text-white font-medium text-xs uppercase tracking-widest shadow-md hover:bg-[#78583E] transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span>Đang gửi phản hồi...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#E8DFD3]" />
                    <span>Gửi Lời Chúc & Xác Nhận</span>
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Countdown Timer Block moved right below the wish & RSVP form */}
        <CountdownTimer />
      </div>
    </section>
  );
}
