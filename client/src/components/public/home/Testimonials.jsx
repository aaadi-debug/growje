"use client";

import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Founder, Nexa Labs",
    content:
      "Working with this team completely transformed our brand presence. The attention to detail and creative thinking is unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Marketing Head, Bloom Co.",
    content:
      "From strategy to final delivery, everything was seamless. They understood our vision better than we did.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    role: "CEO, Vertex Digital",
    content:
      "The results speak for themselves. Our engagement rates doubled within three months of launching the new identity.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Patel",
    role: "Product Manager, Lumen",
    content:
      "Rare to find a team that balances aesthetics and performance so well. Highly recommended for any serious brand.",
    rating: 5,
  },
  {
    id: 5,
    name: "Sneha Patel",
    role: "Product Manager, Lumen",
    content:
      "Rare to find a team that balances aesthetics and performance so well. Highly recommended for any serious brand.",
    rating: 5,
  },
  {
  
    id: 6,
    name: "Sneha Patel",
    role: "Product Manager, Lumen",
    content:
      "Rare to find a team that balances aesthetics and performance so well. Highly recommended for any serious brand.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  // Update visible cards based on screen size
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth >= 1440) {
        setVisibleCount(3.5); // tablet
      } else if (window.innerWidth >= 1024) {
        setVisibleCount(3); // tablet
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2.5); // tablet
      } else {
        setVisibleCount(1); // mobile
      }
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const next = () => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto play
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [current, visibleCount]);

  return (
    <section className="relative bg-white text-black px-6 lg:px-10 py-12 lg:py-20 overflow-hidden">
      {/* Soft background glow */}
      <div
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
        aria-hidden="true"
      />

      {/* Optional light grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.65]
          [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
          [background-size:48px_48px]"
        aria-hidden="true"
      />

      {/* Floating decorative circles */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-20 h-20 rounded-full absolute left-20 top-20 animate-float-1">
          <Image src="/assets/images/home/t1.jpg" alt="" width={100} height={100} className="rounded-full w-20 h-20 object-cover" />
        </div>
        <div className="w-20 h-20 rounded-full absolute right-20 top-32 animate-float-2">
          <Image src="/assets/images/home/t2.png" alt="" width={100} height={100} className="rounded-full w-20 h-20 object-cover" />
        </div>
        <div className="w-20 h-20 rounded-full absolute top-80 left-40 animate-float-3">
          <Image src="/assets/images/home/t3.jpg" alt="" width={100} height={100} className="rounded-full w-20 h-20 object-cover" />
        </div>
        <div className="w-20 h-20 rounded-full absolute top-96 right-32 animate-float-4">
          <Image src="/assets/images/home/t4.jpg" alt="" width={100} height={100} className="rounded-full w-20 h-20 object-cover" />
        </div>
        <div className="w-20 h-20 rounded-full absolute bottom-40 left-28 animate-float-5">
          <Image src="/assets/images/home/t5.jpg" alt="" width={100} height={100} className="rounded-full w-20 h-20 object-cover" />
        </div>
        <div className="w-20 h-20 rounded-full absolute bottom-28 right-40 animate-float-6">
          <Image src="/assets/images/home/t6.jpg" alt="" width={100} height={100} className="rounded-full w-20 h-20 object-cover" />
        </div>
      </div> */}

      <div className="relative z-10">
        {/* Header */}
        <h2 className="text-black text-center text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.05em] font-medium mb-12 lg:mb-16">
          Real words from real our partners.
        </h2>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${current * (100 / visibleCount)}%)`,
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div className="h-full bg-black/[0.03] border border-black/10 rounded-3xl p-6 lg:p-8 backdrop-blur-sm">
                  <div className="mb-5">
                    <Quote className="w-7 h-7 text-black/20" strokeWidth={1.5} />
                  </div>

                  <p className="leading-relaxed font-light text-black/90 mb-6 max-sm:text-sm max-sm:mb-2">
                    “{item.content}”
                  </p>

                  <div className="flex gap-1 mb-4 max-sm:mb-2">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <div>
                    <p className="text-base font-semibold text-primary">
                      {item.name}
                    </p>
                    <p className="text-sm text-black/50 mt-0.5">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 max-w-5xl mx-auto">
          {/* Dots */}
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

          {/* Arrows */}
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
      </div>
    </section>
  );
}