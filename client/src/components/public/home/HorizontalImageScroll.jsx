"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function HorizontalImageScroll({ images, mobileImages }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      const progress = Math.min(
        Math.max(-rect.top / (sectionHeight - viewportHeight), 0),
        1
      );

      const maxTranslate = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(${-progress * maxTranslate}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isMobile]);

  const displayImages = isMobile && mobileImages?.length
    ? mobileImages
    : images;

  if (!displayImages || displayImages.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: isMobile ? "250vh" : "300vh" }}
    >
      <div
        className={`sticky w-full overflow-hidden bg-black ${isMobile ? "top-20 h-[calc(100dvh-5rem)]" : "top-0 h-screen"
          }`}
      >
        <div ref={trackRef} className="flex h-full will-change-transform">
          {displayImages.map((img, index) => (
            <div
              key={index}
              className="relative min-w-full h-full flex-shrink-0"
            >
              <Image
                src={img}
                alt={`Approach image ${index + 1}`}
                fill
                className="object-center"
                sizes="100vw"
                quality={90}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}