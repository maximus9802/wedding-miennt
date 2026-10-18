'use client';

import React from 'react';
import { Heart } from 'lucide-react';

export default function CalendarTable() {
  // Days of week in Vietnamese
  const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  // November 2026 starts on Sunday (1st Nov 2026 is Sunday)
  // Monday to Saturday before 1st Nov are 6 empty slots
  const prefixEmptyDays = 6;
  const totalDaysInNov = 30;
  const weddingDay = 22; // 22nd November 2026

  const days = Array.from({ length: totalDaysInNov }, (_, i) => i + 1);

  return (
    <div className="paper-card rounded-3xl p-6 sm:p-8 bg-white border border-[#B89673]/35 shadow-xl max-w-md mx-auto">
      {/* Month & Year Header */}
      <div className="text-center mb-4 pb-3 border-b border-[#B89673]/25">
        <div className="inline-flex items-center justify-center gap-2.5">
          <span className="w-6 sm:w-8 h-px bg-[#B89673]/40" />
          <h3 className="text-base sm:text-lg font-serif font-bold text-[#543D2B] tracking-wider uppercase">
            Tháng 11 - 2026
          </h3>
          <span className="w-6 sm:w-8 h-px bg-[#B89673]/40" />
        </div>
      </div>

      {/* Calendar Grid Table */}
      <div className="w-full">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
          {daysOfWeek.map((day, idx) => (
            <div
              key={day}
              className={`text-xs font-serif font-semibold py-1.5 ${
                idx === 6 ? 'text-[#8C6D52] font-bold' : 'text-[#7A695E]'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days cells */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-sm">
          {/* Empty cells for Monday-Saturday before 1st Nov */}
          {Array.from({ length: prefixEmptyDays }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square p-1" />
          ))}

          {/* Days 1 to 30 */}
          {days.map((day) => {
            const isWeddingDay = day === weddingDay;
            const dayOfWeekIndex = (prefixEmptyDays + day - 1) % 7;
            const isSunday = dayOfWeekIndex === 6;

            if (isWeddingDay) {
              return (
                <div
                  key={day}
                  className="relative aspect-square p-0.5 flex flex-col items-center justify-center"
                >
                  {/* Wedding Day Highlight Circle in Warm Taupe / Mocha */}
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#8C6D52] via-[#634832] to-[#3B2A1E] text-white flex flex-col items-center justify-center shadow-lg border border-[#E8DFD3]/60 animate-pulse">
                    <span className="text-xs sm:text-sm font-bold font-serif leading-none">
                      {day}
                    </span>
                    <Heart className="w-2.5 h-2.5 text-[#E8DFD3] fill-current mt-0.5" />
                  </div>
                  <span className="absolute -bottom-3 text-[9px] font-bold text-[#634832] whitespace-nowrap tracking-tighter">
                    NGÀY CƯỚI
                  </span>
                </div>
              );
            }

            return (
              <div
                key={day}
                className="aspect-square flex items-center justify-center"
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif transition-colors ${
                    isSunday
                      ? 'text-[#634832] font-semibold bg-[#EFE8E0]'
                      : 'text-[#2E241E] hover:bg-[#EFE8E0]'
                  }`}
                >
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
