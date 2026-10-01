"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

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

const MIN_CARDS = 20;
const DURATION = 80;
const DIRECTION = 1;

// Scale settings — tweak these
const CENTER_SCALE = 1.04; // front card (smaller)
const SIDE_SCALE = 1.35;   // side cards (larger)

export default function RotatingCards() {
    const sectionRef = useRef(null);
    const ringRef = useRef(null);
    const tweenRef = useRef(null);
    const cardEls = useRef([]);

    const cards = useMemo(() => {
        let list = [...ITEMS];
        while (list.length < MIN_CARDS) list = list.concat(ITEMS);
        return list;
    }, []);

    useEffect(() => {
        const layout = () => {
            const section = sectionRef.current;
            const ring = ringRef.current;
            if (!section || !ring) return;

            const vw = section.clientWidth;
            const n = cards.length;
            const cardW = Math.max(160, Math.min(vw * 0.18, 340));
            const cardH = cardW * 1.38;
            const pitch = cardW * 1.20;
            const radius = pitch / (2 * Math.tan(Math.PI / n));

            section.style.perspective = `${radius * 1.65}px`;

            cardEls.current = Array.from(ring.children);

            cardEls.current.forEach((el, i) => {
                const angle = (360 / n) * i;
                el.style.width = `${cardW}px`;
                el.style.height = `${cardH}px`;
                el.style.marginLeft = `${-cardW / 2}px`;
                el.style.marginTop = `${-cardH / 2}px`;
                // store base angle so we can use it later for scaling
                el.dataset.angle = angle;
                el.style.transform = `rotateY(${angle}deg) translateZ(${-radius}px)`;
            });
        };

        layout();
        window.addEventListener("resize", layout);
        return () => window.removeEventListener("resize", layout);
    }, [cards]);

    // Continuously update scale of each card based on its current angle from the front
    useGSAP(
        () => {
            const ring = ringRef.current;
            if (!ring) return;

            tweenRef.current = gsap.to(ring, {
                rotationY: 360 * DIRECTION,
                duration: DURATION,
                ease: "none",
                repeat: -1,
                onUpdate: () => {
                    const currentRot = gsap.getProperty(ring, "rotationY");
                    const n = cards.length;

                    cardEls.current.forEach((el) => {
                        if (!el) return;
                        const baseAngle = parseFloat(el.dataset.angle || "0");
                        // normalize angle difference to -180 → 180
                        let diff = ((baseAngle + currentRot) % 360 + 540) % 360 - 180;
                        const abs = Math.abs(diff) / 180; // 0 = front, 1 = back

                        // front (abs ≈ 0) → CENTER_SCALE
                        // sides (abs ≈ 0.5) → SIDE_SCALE
                        const scale = CENTER_SCALE + (SIDE_SCALE - CENTER_SCALE) * Math.min(abs * 2, 1);

                        // keep the original rotateY + translateZ and only change scale
                        const radius = parseFloat(el.style.transform.match(/translateZ\(([^)]+)\)/)?.[1] || "0");
                        el.style.transform = `rotateY(${baseAngle}deg) translateZ(${-Math.abs(radius)}px) scale(${scale})`;
                    });
                },
            });

            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                tweenRef.current.pause();
            }
        },
        { scope: sectionRef }
    );

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
            className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-black"
        >
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-80"
                style={{
                    backgroundImage: "url('assets/images/home/services_bg.avif')",
                }}
            />
            <h2 className="relative text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none text-white text-center tracking-wide">
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