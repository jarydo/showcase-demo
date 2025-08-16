"use client";

import Mosaic from "../../public/mosaic.png";

interface ProgressiveMosaicProps {
  progress: number; // 0-100
  className?: string;
}

export default function ProgressiveMosaic({
  progress,
  className = "",
}: ProgressiveMosaicProps) {
  return (
    <div
      className={`relative max-w-4xl overflow-hidden rounded-lg ${className}`}
    >
      {/* Base mosaic image */}
      <img src={Mosaic.src} alt="Mosaic" className="w-full h-auto block" />

      {/* Black overlay that slides from left to right */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black transition-all duration-700 ease-out"
        style={{
          transform: `translateX(${progress}%)`,
        }}
      />
    </div>
  );
}
