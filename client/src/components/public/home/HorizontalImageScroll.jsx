"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HorizontalImageScroll({ images }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // progress through the tall section (0 → 1)
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
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "300vh" }} // increase if you have many images
    >
      {/* Sticky full-screen container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="relative min-w-full h-full flex-shrink-0"
            >
              <Image
                src={img}
                alt={`Horizontal image ${index + 1}`}
                fill
                className="object-cover object-center"
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