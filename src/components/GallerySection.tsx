'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

export default function GallerySection() {
  const { gallery } = weddingConfig;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPhotoIndex]);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + gallery.length) % gallery.length);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % gallery.length);
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-10 sm:mb-12"
      >
        <div className="text-xs font-serif uppercase tracking-[0.25em] text-[#8C6D52] mb-2 font-semibold">
          ALBUM HÌNH CƯỚI
        </div>
        <h2 className="text-[clamp(1.35rem,5.5vw,2.25rem)] font-serif text-[#4A3425] whitespace-nowrap">
          Khoảnh Khắc Hạnh Phúc
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-[#B89673] to-transparent mx-auto my-3 origin-center"
        />
        <p className="text-xs sm:text-sm text-[#7A695E]">
          Những bức hình ghi lại từng nụ cười và ánh mắt đong đầy yêu thương
        </p>
      </motion.div>

      {/* Photo Grid: 2 ảnh/hàng trên mobile, 4 ảnh/hàng trên desktop with staggered scroll reveal */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {gallery.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.55,
              delay: (index % 4) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md bg-[#FAF6F0] border border-[#B89673]/30 hover:border-[#8C6D52] hover:shadow-xl transition-all duration-300"
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Hover overlay with caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 text-white">
              <span className="text-xs sm:text-sm font-medium tracking-wide drop-shadow line-clamp-2">
                {photo.caption || photo.alt}
              </span>
              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Đóng ảnh"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            <button
              onClick={showPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={showNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Ảnh kế tiếp"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox active photo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={gallery[selectedPhotoIndex].url}
                alt={gallery[selectedPhotoIndex].alt}
                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
              />
              {gallery[selectedPhotoIndex].caption && (
                <p className="mt-3 text-sm text-[#E8DFD3] text-center font-serif">
                  {gallery[selectedPhotoIndex].caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
