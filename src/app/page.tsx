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
      {images.map((num) => {
        const isSpecial = num === 6;
        const maxWidth = isSpecial ? 'max-w-3xl' : 'max-w-xl';
        const width = isSpecial ? 768 : 300;
        const height = isSpecial ? 512 : 200;

        return (
          <div key={num} className={`flex items-center justify-center ${maxWidth}`}>
            <Image
              src={`/images/landing/landing-${num}.png`}
              alt={`Landing image ${num}`}
              width={width}
              height={height}
              className="h-auto w-full"
              priority={num === 1}
            />
          </div>
        );
      })}
    </div>
  );
}
