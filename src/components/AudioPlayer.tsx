'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

interface AudioPlayerProps {
  shouldPlay?: boolean;
}

export default function AudioPlayer({ shouldPlay }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const userPausedRef = useRef(false);
  const hasInteractedRef = useRef(false);

  // Sync shouldPlay prop from parent
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (shouldPlay && !isPlaying && !userPausedRef.current) {
      audio.play().catch((e) => {
        console.log('Autoplay prevented:', e);
      });
    }
  }, [shouldPlay, isPlaying]);

  // Autoplay on very first interaction anywhere on page (run ONCE on mount)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;

      const audio = audioRef.current;
      // Only autoplay if user hasn't explicitly pressed pause
      if (audio && audio.paused && !userPausedRef.current) {
        audio.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      // User explicitly pauses the music
      userPausedRef.current = true;
      audio.pause();
    } else {
      // User explicitly plays the music
      userPausedRef.current = false;
      audio.play().catch((e) => {
        console.error('Play error:', e);
      });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingConfig.music.audioUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Music Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={togglePlay}
          onTouchStart={(e) => e.stopPropagation()}
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#FAF6F0]/90 backdrop-blur-md border border-[#B89673]/50 shadow-lg text-[#634832] transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
          title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
          aria-label="Điều khiển nhạc"
        >
          {/* Animated spinning outer ring when playing */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-dashed border-[#B89673]/40 ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          />

          {isPlaying ? (
            <div className="flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-[#634832] animate-pulse" />
              {/* Sound waves animation */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B89673] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#634832]"></span>
              </span>
            </div>
          ) : (
            <VolumeX className="w-5 h-5 text-[#7A695E]" />
          )}
        </button>

        {/* Small song label tooltip */}
        {isPlaying && (
          <div className="hidden sm:block absolute right-14 bottom-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md border border-[#B89673]/30 text-xs text-[#7A695E] whitespace-nowrap pointer-events-none animate-fadeIn">
            🎵 {weddingConfig.music.songTitle}
          </div>
        )}
      </div>
    </>
  );
}
