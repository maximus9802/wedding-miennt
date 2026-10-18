'use client';

import React, { useState } from 'react';
import { Gift, X, Copy, Check } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

interface GiftBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftBoxModal({ isOpen, onClose }: GiftBoxModalProps) {
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentBank =
    activeTab === 'groom' ? weddingConfig.groom.bank : weddingConfig.bride.bank;
  const currentPerson =
    activeTab === 'groom' ? weddingConfig.groom.name : weddingConfig.bride.name;

  // Auto generate standard VietQR URL
  const qrUrl =
    currentBank.qrUrl ||
    `https://img.vietqr.io/image/${currentBank.bankId}-${currentBank.accountNumber}-compact2.png?amount=&addInfo=${encodeURIComponent('Mung cuoi Phu Mien')}&accountName=${encodeURIComponent(currentBank.ownerName)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentBank.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#241A14]/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#B89673]/40 shadow-2xl overflow-hidden paper-card"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#7A695E] hover:text-[#2E241E] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#B89673]/40 flex items-center justify-center mx-auto mb-2 text-[#634832]">
            <Gift className="w-6 h-6 text-[#634832]" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#4A3425]">
            Hộp Mừng Cưới Online
          </h3>
          <p className="text-xs text-[#7A695E] mt-1 max-w-xs mx-auto">
            Gửi gắm món quà mừng chúc phúc tới Cô dâu & Chú rể
          </p>
        </div>

        {/* Tab switch: Groom / Bride */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#FAF6F0] border border-[#B89673]/30 mb-6">
          <button
            onClick={() => setActiveTab('groom')}
            className={`py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === 'groom'
                ? 'bg-[#634832] text-white shadow-sm'
                : 'text-[#7A695E] hover:text-[#2E241E]'
            }`}
          >
            Mừng Chú Rể (Xuân Phú)
          </button>
          <button
            onClick={() => setActiveTab('bride')}
            className={`py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === 'bride'
                ? 'bg-[#634832] text-white shadow-sm'
                : 'text-[#7A695E] hover:text-[#2E241E]'
            }`}
          >
            Mừng Cô Dâu (Nguyễn Miền)
          </button>
        </div>

        {/* QR Code and Account Info Card */}
        <div className="flex flex-col items-center p-4 rounded-2xl bg-[#FAF6F0] border border-[#B89673]/30 text-center">
          {/* VietQR Image */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white p-2 rounded-xl border border-[#B89673]/30 shadow-inner flex items-center justify-center mb-4">
            <img
              src={qrUrl}
              alt={`Mã VietQR ${currentPerson}`}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="text-xs text-[#7A695E] uppercase tracking-wider font-medium">
            {currentBank.bankName}
          </div>

          <div className="text-base sm:text-lg font-mono font-bold text-[#634832] my-1 flex items-center gap-2">
            <span>{currentBank.accountNumber}</span>
            <button
              onClick={handleCopy}
              className="p-1 rounded-md hover:bg-white text-[#8C6D52] hover:text-[#634832] transition-colors cursor-pointer"
              title="Sao chép số tài khoản"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-700" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="text-xs font-semibold text-[#2E241E] uppercase tracking-wide">
            {currentBank.ownerName}
          </div>

          {copied && (
            <span className="text-[11px] text-green-700 font-medium mt-1 animate-fadeIn">
              ✓ Đã sao chép số tài khoản thành công!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
