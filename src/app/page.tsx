'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { GuestInfo } from '@/types/wedding';
import { fetchGuestInfo } from '@/lib/api';
import { weddingConfig } from '@/config/wedding';

import EnvelopeModal from '@/components/EnvelopeModal';
import AudioPlayer from '@/components/AudioPlayer';
import HeroSection from '@/components/HeroSection';
import CoupleSection from '@/components/CoupleSection';
import EventDetails from '@/components/EventDetails';
import TimelineSection from '@/components/TimelineSection';
import GallerySection from '@/components/GallerySection';
import RsvpSection from '@/components/RsvpSection';
import FooterSection from '@/components/FooterSection';
import GiftBoxModal from '@/components/GiftBoxModal';
import FloatingWishes from '@/components/FloatingWishes';

function WeddingApp() {
  const searchParams = useSearchParams();
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);
  const [isGiftBoxOpen, setIsGiftBoxOpen] = useState(false);

  useEffect(() => {
    // Read ?to={id} or ?id={id} or ?name={name}
    const guestId = searchParams.get('to') || searchParams.get('id') || searchParams.get('name');
    if (guestId) {
      fetchGuestInfo(guestId).then((info) => {
        if (info) setGuestInfo(info);
      });
    }
  }, [searchParams]);

  const handleOpenInvitation = () => {
    setIsEnvelopeOpen(false);
    setShouldPlayAudio(true);
  };

  return (
    <main className="relative min-h-screen bg-[#EFE8E0] text-[#2E241E] selection:bg-[#B89673]/30 selection:text-[#4A3425] overflow-x-hidden">
      {/* Global Subtle Watermark Background Image */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-[0.07] sm:opacity-[0.10] transform-gpu will-change-transform"
        style={{
          backgroundImage: `url('${weddingConfig.backgroundUrl || "https://pub-f12e2b7fbdae45ef90b8185660b81476.r2.dev/image/background.jpg"}')`,
        }}
      />
      {/* Ambient gradient overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#EFE8E0]/50 via-transparent to-[#EFE8E0]/70" />

      {/* Content wrapper with relative z-10 */}
      <div className="relative z-10">
        {/* Personalized Wax-sealed Envelope Intro Modal (optional preview) */}
        <EnvelopeModal
          guestInfo={guestInfo}
          isOpen={isEnvelopeOpen}
          onOpen={handleOpenInvitation}
          onClose={() => setIsEnvelopeOpen(false)}
        />

        {/* Background Audio Player with Floating Control Button */}
        <AudioPlayer shouldPlay={shouldPlayAudio} />

        {/* Main Wedding Landing Page Sections */}
        <HeroSection
          guestInfo={guestInfo}
          onOpenEnvelopeModal={() => setIsEnvelopeOpen(true)}
        />

        <CoupleSection />

        <EventDetails />

        <TimelineSection />

        <GallerySection />

        <RsvpSection guestInfo={guestInfo} />

        <FooterSection
          onOpenGiftBox={() => setIsGiftBoxOpen(true)}
          onOpenEnvelope={() => setIsEnvelopeOpen(true)}
        />

        {/* Online Gift Box Modal (VietQR) */}
        <GiftBoxModal
          isOpen={isGiftBoxOpen}
          onClose={() => setIsGiftBoxOpen(false)}
        />

        {/* Floating Romantic Wishes Stream */}
        {!isEnvelopeOpen && <FloatingWishes />}
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#EFE8E0] text-[#543D2B]">
          <div className="animate-pulse font-serif text-lg tracking-wider">Đang tải thiệp cưới...</div>
        </div>
      }
    >
      <WeddingApp />
    </Suspense>
  );
}
