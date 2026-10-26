"use client";

import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function TestimonialCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const content = item.content || "";
  // ~4 lines ≈ 180–220 characters depending on width; adjust if needed
  const LIMIT = 180;
  const isLong = content.length > LIMIT;

  const displayText =
    !isLong || expanded ? content : content.slice(0, LIMIT).trim() + "…";

  return (
    <div className="h-full bg-black/[0.03] border border-black/10 rounded-3xl p-6 lg:p-8 backdrop-blur-sm flex flex-col">
      <div className="mb-5">
        <Quote className="w-7 h-7 text-black/20" strokeWidth={1.5} />
      </div>

      <div className="flex-1 mb-6 max-sm:mb-2">
        <p className="leading-relaxed font-light text-black/90 max-sm:text-sm">
          “{displayText}”
        </p>

        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 text-sm font-medium text-primary hover:underline cursor-pointer"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      <div className="flex gap-1 mb-4 max-sm:mb-2">
        {[...Array(item.rating || 5)].map((_, i) => (
          <Star
            key={i}
            size={15}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <div>
        <p className="text-base font-semibold text-primary">{item.name}</p>
        {item.role && (
          <p className="text-sm text-black/50 mt-0.5">{item.role}</p>
        )}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_URL}/testimonials/public`);
        const data = await res.json();
        if (data.success) {
          setTestimonials(data.testimonials || []);
        }
      } catch (err) {
        console.error("Fetch Testimonials Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth >= 1440) {
        setVisibleCount(3.5);
      } else if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2.5);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, Math.ceil(testimonials.length - visibleCount));

  const next = () => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (testimonials.length <= visibleCount) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [current, visibleCount, testimonials.length]);

  if (loading) {
    return (
      <section className="px-6 lg:px-10 py-16 text-center text-gray-500">
        Loading testimonials...
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-white text-black px-6 lg:px-10 lg:py-16 md:py-12 py-6 overflow-hidden">
      <div
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.65]
          [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
          [background-size:48px_48px]"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <h2 className="text-3xl lg:text-5xl md:text-4xl tracking-tight text-center mb-6">
          Voices of GROWJE
        </h2>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${current * (100 / visibleCount)}%)`,
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {testimonials.length > visibleCount && (
          <div className="flex items-center justify-between mt-10 max-w-5xl mx-auto">
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === current
                      ? "w-8 bg-primary"
                      : "w-1.5 bg-black/30 hover:bg-black/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-black/20 bg-primary flex items-center justify-center
                           hover:bg-black text-white transition-all duration-300 cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-black/20 bg-primary flex items-center justify-center
                           hover:bg-black text-white transition-all duration-300 cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}