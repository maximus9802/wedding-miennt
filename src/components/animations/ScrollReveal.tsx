'use client';

import React from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';

export type AnimationVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'pop'
  | 'fade';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  animation?: AnimationVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
  className?: string;
}

const getVariants = (animation: AnimationVariant, distance: number): Variants => {
  switch (animation) {
    case 'fade-up':
      return {
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0 },
      };
    case 'fade-down':
      return {
        hidden: { opacity: 0, y: -distance },
        visible: { opacity: 1, y: 0 },
      };
    case 'fade-left':
      return {
        hidden: { opacity: 0, x: distance },
        visible: { opacity: 1, x: 0 },
      };
    case 'fade-right':
      return {
        hidden: { opacity: 0, x: -distance },
        visible: { opacity: 1, x: 0 },
      };
    case 'zoom-in':
      return {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      };
    case 'pop':
      return {
        hidden: { opacity: 0, scale: 0.75 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { type: 'spring', stiffness: 260, damping: 20 },
        },
      };
    case 'fade':
    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
  }
};

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
  distance = 32,
  once = true,
  amount = 0.2,
  className = '',
  ...rest
}: ScrollRevealProps) {
  const variants = getVariants(animation, distance);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // easeOutQuint-like smooth bezier
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
