"use client"
import { useState, useRef, useEffect } from "react";

export default function Services({ servicesData }) {
  return (
    <>
      {servicesData?.items?.length > 0 && (
        <section className="relative bg-black/50 text-white px-6 lg:px-10 lg:py-16 md:py-12 py-6 overflow-hidden">
          {/* Soft background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-80"
            style={{
              backgroundImage: "url('assets/images/home/services_bg.avif')",
            }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl md:text-4xl tracking-tight text-center mb-6">
              {servicesData.title}
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
              {servicesData.items.map((item, index) => (
                <ServiceCard key={index} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function ServiceCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Temporarily remove clamp to measure full height
    el.classList.remove("line-clamp-4");
    const fullHeight = el.scrollHeight;

    // Put clamp back
    el.classList.add("line-clamp-4");
    const clampedHeight = el.clientHeight;

    setNeedsToggle(fullHeight > clampedHeight + 2); // +2 for safety
  }, [item.description]);

  return (
    <div
      className="group relative border border-white/10 rounded-3xl p-8 lg:p-10 
                 bg-white/[0.10] hover:bg-white/[0.05] 
                 transition-all duration-500 hover:border-white/20
                 hover:-translate-y-1 flex flex-col"
    >
      {/* Title – reserves space for 2 lines */}
      <h3 className="text-lg font-medium mb-3 text-white/90">
      {/* <h3 className="text-lg font-medium mb-3 text-white/90 min-h-[3.5rem] leading-snug"> */}
        {item.title}
      </h3>

      {/* Description */}
      <p
        ref={textRef}
        className={`text-sm text-white/40 leading-relaxed ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        {item.description}
      </p>

      {/* Only show button if text is longer than 4 lines */}
      {needsToggle && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 text-sm text-white/60 hover:text-white transition-colors self-start"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}

      {/* Bottom line animation */}
      <div
        className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent 
                    scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
      />
    </div>
  );
}