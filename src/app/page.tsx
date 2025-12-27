'use client';

import { useState } from 'react';

import Image from 'next/image';

function getRandomImages() {
  const randomImages = Array.from({ length: 20 }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  return randomImages.includes(6) ? [6] : randomImages;
}

export default function Home() {
  const [images] = useState(getRandomImages);

  return (
    <div className="flex min-h-screen items-center justify-center gap-8 bg-white p-8">
      {images.map((num) => (
        <div
          key={num}
          className={`flex items-center justify-center ${num === 6 ? 'max-w-3xl' : 'max-w-xl'}`}
        >
          <Image
            src={`/images/landing/landing-${num}.png`}
            alt={`Landing image ${num}`}
            width={num === 6 ? 768 : 300}
            height={num === 6 ? 512 : 200}
            className="h-auto w-full"
            priority={num === 1}
          />
        </div>
      ))}
    </div>
  );
}
