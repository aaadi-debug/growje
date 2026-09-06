"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import HorizontalImageScroll from "./HorizontalImageScroll";

const images = [
    "/assets/images/home/approach_1.png",
    "/assets/images/home/approach_2.png",
    "/assets/images/home/approach_3.png",
    "/assets/images/home/approach_4.png"
]

export default function Approach() {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    if (!images || images.length === 0) return null;

    return (
        <>
            {/* <section className="bg-black/70 px-6 lg:px-10 py-16 lg:py-24">
                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-white">
                            04 — Our approach
                        </p>
                    </div>

                    <div className="lg:col-span-8 lg:col-start-5">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.05em] text-white">
                            Strategy first.
                            <br />
                            Creativity always.
                            <br />
                            <span className="italic font-serif">
                                Results matter.
                            </span>
                        </h2>

                        <div className="mt-20 border-t border-white/20">
                            {[
                                {
                                    number: "01",
                                    title: "Understand",
                                    text: "We dig into your business, audience and ambitions before we design anything.",
                                },
                                {
                                    number: "02",
                                    title: "Define",
                                    text: "We find the positioning, visual language and digital direction that makes you different.",
                                },
                                {
                                    number: "03",
                                    title: "Create",
                                    text: "We turn strategy into identities, websites and experiences built to perform.",
                                },
                                {
                                    number: "04",
                                    title: "Launch",
                                    text: "We refine every detail and deliver an experience your audience remembers.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.number}
                                    className="
                                        grid
                                        grid-cols-12
                                        gap-4
                                        py-8
                                        border-b
                                        border-white/20
                                        hover:bg-white/10
                                        transition
                                        duration-300
                                    "
                                >
                                    <span className="col-span-2 text-sm text-white/70">
                                        {item.number}
                                    </span>
                                    <h3 className="col-span-4 text-xl md:text-2xl text-white">
                                        {item.title}
                                    </h3>
                                    <p className="col-span-6 text-white/50 leading-relaxed max-w-md">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section> */}

            <HorizontalImageScroll images={images} />

            
        </>
    )
}