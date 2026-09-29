"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/* ------------------------------------------------------------------ *
 *  EDIT YOUR CARDS HERE
 *  image : optional path/URL (e.g. "/projects/mahou.jpg"). If omitted,
 *          the gradient in `bg` is used as a placeholder.
 * ------------------------------------------------------------------ */
const ITEMS = [
    { title: "Mahou", href: "/project/mahou", image: "", bg: "linear-gradient(160deg,#0f7a4a,#0a3d2a)" },
    { title: "CUPRA", href: "/project/cupra", image: "", bg: "linear-gradient(160deg,#e9e9e9,#bdbdbd)" },
    { title: "Wallapop", href: "/project/wallapop", image: "", bg: "linear-gradient(160deg,#e8402a,#a8180c)" },
    { title: "Olistic", href: "/project/olistic", image: "", bg: "linear-gradient(160deg,#f3e2b8,#d9b877)" },
    { title: "Typeform", href: "/project/typeform", image: "", bg: "linear-gradient(160deg,#f7a6c0,#e97aa1)" },
    { title: "Volkswagen", href: "/project/volkswagen", image: "", bg: "linear-gradient(160deg,#9fc3ee,#5d8fd0)" },
    { title: "Superlativa", href: "/project/superlativa", image: "", bg: "linear-gradient(160deg,#39e58c,#0b7a45)" },
    { title: "Submer", href: "/project/submer", image: "", bg: "linear-gradient(160deg,#7b4dff,#2c1a7a)" },
];

const MIN_CARDS = 20; // ring is filled up to this many cards (items repeat)
const DURATION = 80; // seconds for one full rotation (higher = slower)
const DIRECTION = 1; // 1 or -1 to flip the rotation direction

export default function RotatingCards() {
    const sectionRef = useRef(null);
    const ringRef = useRef(null);
    const tweenRef = useRef(null);

    // repeat items until the ring has enough cards to look full
    const cards = useMemo(() => {
        let list = [...ITEMS];
        while (list.length < MIN_CARDS) list = list.concat(ITEMS);
        return list;
    }, []);

    // Position every card around the inside of a cylinder
    useEffect(() => {
        const layout = () => {
            const section = sectionRef.current;
            const ring = ringRef.current;
            if (!section || !ring) return;

            const vw = section.clientWidth;
            const n = cards.length;
            const cardW = Math.max(140, Math.min(vw * 0.15, 300));
            const cardH = cardW * 1.38;
            const pitch = cardW * 1.08; // card width + gap
            const radius = pitch / (2 * Math.tan(Math.PI / n));

            section.style.perspective = `${radius * 1.65}px`;

            Array.from(ring.children).forEach((el, i) => {
                const angle = (360 / n) * i;
                el.style.width = `${cardW}px`;
                el.style.height = `${cardH}px`;
                el.style.marginLeft = `${-cardW / 2}px`;
                el.style.marginTop = `${-cardH / 2}px`;
                // rotate around the ring centre, then push the card to the far wall
                // so it faces inward (we look at the inside of the cylinder)
                el.style.transform = `rotateY(${angle}deg) translateZ(${-radius}px)`;
            });
        };

        layout();
        window.addEventListener("resize", layout);
        return () => window.removeEventListener("resize", layout);
    }, [cards]);

    // Continuous rotation
    useGSAP(
        () => {
            tweenRef.current = gsap.to(ringRef.current, {
                rotationY: 360 * DIRECTION,
                duration: DURATION,
                ease: "none",
                repeat: -1,
            });

            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                tweenRef.current.pause();
            }
        },
        { scope: sectionRef }
    );

    // Smoothly stop / resume the rotation
    const setSpeed = (value) => {
        if (!tweenRef.current) return;
        gsap.to(tweenRef.current, {
            timeScale: value,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative h-[90vh] min-h-[520px] w-full overflow-hidden bg-black"
        >
            <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none text-white text-center tracking-wide pt-10">
                The Showcase
            </h2>
            <div
                ref={ringRef}
                className="absolute left-1/2 top-1/2 h-0 w-0 will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
            >
                {cards.map((item, i) => (
                    <Link
                        key={i}
                        href={item.href}
                        aria-label={item.title}
                        onMouseEnter={() => setSpeed(0)}
                        onMouseLeave={() => setSpeed(1)}
                        onFocus={() => setSpeed(0)}
                        onBlur={() => setSpeed(1)}
                        className="group absolute left-1/2 top-1/2 block cursor-pointer"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <div
                            className="relative h-full w-full overflow-hidden rounded-2xl transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            style={{ background: item.bg }}
                        >
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    draggable={false}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="absolute bottom-4 left-4 text-2xl font-medium tracking-tight text-white/90">
                                    {item.title}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
