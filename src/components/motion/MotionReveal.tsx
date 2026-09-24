"use client";

import React from "react";
import { m, type HTMLMotionProps, type Variants } from "motion/react";

interface MotionRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  amount?: number | "some" | "all";
  once?: boolean;
}

const emptySubscribe = () => () => {};

export function MotionReveal({
  children,
  className = "",
  delay = 0,
  yOffset = 24,
  duration = 0.65,
  amount = 0.15,
  once = true,
  ...props
}: MotionRevealProps) {
  const isClient = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </m.div>
  );
}

interface MotionStaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  amount?: number | "some" | "all";
  once?: boolean;
}

export function MotionStaggerContainer({
  children,
  className = "",
  staggerChildren = 0.08,
  delayChildren = 0,
  amount = 0.15,
  once = true,
  ...props
}: MotionStaggerContainerProps) {
  const isClient = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      {...props}
    >
      {children}
    </m.div>
  );
}

interface MotionStaggerItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
}

export function MotionStaggerItem({
  children,
  className = "",
  yOffset = 24,
  duration = 0.65,
  ...props
}: MotionStaggerItemProps) {
  const isClient = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <m.div className={className} variants={itemVariants} {...props}>
      {children}
    </m.div>
  );
}
