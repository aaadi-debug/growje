"use client";

import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

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
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const next = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), 500);
    };

    // Auto play
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [current]);

    return (
        <section className="relative bg-white text-white px-6 lg:px-10 py-16 lg:py-28 overflow-hidden">
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

            <div className="relative z-10 ">
                {/* Header */}
                <div className="relative z-10 w-full mx-auto">
                    {/* Header */}
                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-3">
                            <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                                05 — Testimonials
                            </p>
                        </div>

                        <div className="lg:col-span-8 lg:col-start-5">
                            <h2 className="text-black text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.05em] font-medium">
                                Real words from real  our partners.
                            </h2>

                            {/* Testimonial Card */}
                            {/* <div className="relative max-w-3xl mx-auto"> */}
                                <div className="mt-8 bg-black/[0.03] border border-black/10 rounded-3xl p-8 backdrop-blur-sm">
                                    {/* Quote Icon */}
                                    <div className="mb-6">
                                        <Quote className="w-8 h-8 text-black/20" strokeWidth={1.5} />
                                    </div>

                                    {/* Content with animation */}
                                    <div
                                        key={current}
                                        className="animate-fade-in"
                                    >
                                        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light text-black/90 mb-4">
                                            “{testimonials[current].content}”
                                        </p>

                                        {/* Rating */}
                                        <div className="flex gap-1 mb-2">
                                            {[...Array(testimonials[current].rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className="fill-yellow-400 text-yellow-400"
                                                />
                                            ))}
                                        </div>

                                        {/* Author */}
                                        <div>
                                            <p className="text-lg font-semibold text-primary">{testimonials[current].name}</p>
                                            <p className="text-sm text-black/50 mt-1">
                                                {testimonials[current].role}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex items-center justify-between mt-10">
                                    {/* Dots */}
                                    <div className="flex gap-2">
                                        {testimonials.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrent(index)}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${index === current
                                                    ? "w-8 bg-primary"
                                                    : "w-1.5 bg-black/30 hover:bg-black/50"
                                                    }`}
                                                aria-label={`Go to testimonial ${index + 1}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Arrows */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={prev}
                                            className="w-11 h-11 rounded-full border border-black/20 bg-primary flex items-center justify-center
                                            hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                                            aria-label="Previous testimonial"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={next}
                                            className="w-11 h-11 rounded-full border border-black/20 bg-primary flex items-center justify-center
                                            hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                                            aria-label="Next testimonial"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}