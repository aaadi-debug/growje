"use client";

import { useEffect, useRef, useState } from "react";

export default function About({ aboutData = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    if (!aboutData.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "-15% 0px -15% 0px",
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [aboutData]);

  if (!aboutData.length) return null;

  return (
    <section className="relative px-6 lg:px-10 py-10 lg:py-24 bg-primary/10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* ========== LEFT - Sticky Image ========== */}
        <div className="hidden lg:block relative">
          <div className="sticky top-32 h-[calc(100vh-160px)]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100">
              {aboutData.map((section, index) => (
                <img
                  key={index}
                  src={section.image?.url}
                  alt={section.image?.alt || section.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out
                    ${
                      activeIndex === index
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ========== RIGHT - Content ========== */}
        <div>
          {aboutData.map((section, index) => (
            <div
              key={index}
              data-index={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="min-h-[80vh] flex flex-col justify-center py-16 max-sm:py-6"
            >
              {/* Mobile Image */}
              <div className="lg:hidden mb-8">
                {section.image?.url && (
                  <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                    <img
                      src={section.image.url}
                      alt={section.image.alt || section.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <p className="text-xs uppercase tracking-[0.2em] text-blue-600 mb-4">
                About
              </p>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
                {section.title}
              </h2>

              <p className="text-black/70 leading-relaxed mb-6 whitespace-pre-line">
                {section.description}
              </p>

              {section.bullets?.length > 0 && (
                <ul className="space-y-3">
                  {section.bullets.map(
                    (bullet, bIndex) =>
                      bullet && (
                        <li key={bIndex} className="flex items-start gap-3">
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                          <span className="text-black/80">{bullet}</span>
                        </li>
                      )
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}