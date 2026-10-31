"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ImInsertTemplate } from "react-icons/im";
import { gadugi } from "@/app/fonts";

gsap.registerPlugin(useGSAP);

const MIN_CARDS = 20;
const DURATION = 80;
const DIRECTION = 1;

// Scale settings
const CENTER_SCALE = 1.04;
const SIDE_SCALE = 1.35;

// Fallback gradients if no cardColor
const FALLBACK_COLORS = [
  "linear-gradient(160deg,#0f7a4a,#0a3d2a)",
  "linear-gradient(160deg,#e9e9e9,#bdbdbd)",
  "linear-gradient(160deg,#e8402a,#a8180c)",
  "linear-gradient(160deg,#f3e2b8,#d9b877)",
  "linear-gradient(160deg,#f7a6c0,#e97aa1)",
  "linear-gradient(160deg,#9fc3ee,#5d8fd0)",
  "linear-gradient(160deg,#39e58c,#0b7a45)",
  "linear-gradient(160deg,#7b4dff,#2c1a7a)",
];

export default function RotatingCards({ projects = [] }) {
  const sectionRef = useRef(null);
  const ringRef = useRef(null);
  const tweenRef = useRef(null);
  const cardEls = useRef([]);

  // Map projects → cards, and duplicate until MIN_CARDS
  const cards = useMemo(() => {
    if (!projects.length) return [];

    // Sort projects by order (ascending)
    const sortedProjects = [...projects].sort(
      (a, b) => (b.order ?? Infinity) - (a.order ?? Infinity)
    );

    const mapped = sortedProjects.map((project, index) => {
      // Prefer cardImage, fallback to hero media (same as ProjectCard)
      const image =
        project.cardImage?.url ||
        project.hero?.media?.url ||
        "";

      const bg =
        project.cardColor ||
        FALLBACK_COLORS[index % FALLBACK_COLORS.length];

      return {
        title: project.title,
        shortDescription: project.shortDescription,
        href: `/portfolio/${project.slug}`,
        image,
        bg,
        workedOn: project.workedOn || [],   // ← this was missing
      };
    });

    // Duplicate so the ring looks full
    let list = [...mapped];
    while (list.length < MIN_CARDS) {
      list = list.concat(mapped);
    }

    return list;
  }, [projects]);

  useEffect(() => {
    const layout = () => {
      const section = sectionRef.current;
      const ring = ringRef.current;
      if (!section || !ring || !cards.length) return;

      const vw = section.clientWidth;
      const n = cards.length;
      // const cardW = Math.max(160, Math.min(vw * 0.18, 340));
      const cardW = Math.max(240, Math.min(vw * 0.24, 420));
      const cardH = cardW * 1.38;
      // const pitch = cardW * 1.2;
      const pitch = cardW * 1.22;
      const radius = pitch / (2 * Math.tan(Math.PI / n));

      section.style.perspective = `${radius * 1.65}px`;

      cardEls.current = Array.from(ring.children);

      cardEls.current.forEach((el, i) => {
        const angle = (360 / n) * i;
        el.style.width = `${cardW}px`;
        el.style.height = `${cardH}px`;
        el.style.marginLeft = `${-cardW / 2}px`;
        el.style.marginTop = `${-cardH / 2}px`;
        el.dataset.angle = angle;
        el.style.transform = `rotateY(${angle}deg) translateZ(${-radius}px)`;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, [cards]);

  useGSAP(
    () => {
      const ring = ringRef.current;
      if (!ring || !cards.length) return;

      tweenRef.current = gsap.to(ring, {
        rotationY: 360 * DIRECTION,
        duration: DURATION,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          const currentRot = gsap.getProperty(ring, "rotationY");

          cardEls.current.forEach((el) => {
            if (!el) return;
            const baseAngle = parseFloat(el.dataset.angle || "0");
            let diff = ((baseAngle + currentRot) % 360 + 540) % 360 - 180;
            const abs = Math.abs(diff) / 180;

            const scale =
              CENTER_SCALE +
              (SIDE_SCALE - CENTER_SCALE) * Math.min(abs * 2, 1);

            const radiusMatch = el.style.transform.match(
              /translateZ\(([^)]+)\)/
            );
            const radius = parseFloat(radiusMatch?.[1] || "0");

            el.style.transform = `rotateY(${baseAngle}deg) translateZ(${-Math.abs(
              radius
            )}px) scale(${scale})`;
          });
        },
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        tweenRef.current.pause();
      }
    },
    { scope: sectionRef, dependencies: [cards] }
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

  // Don't render if no projects
  if (!cards.length) return null;

  console.log("Project--", projects)

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-80"
        style={{
          backgroundImage: "url('/assets/images/home/services_bg.avif')",
        }}
      />

      <h2 className="relative z-10 text-3xl lg:text-5xl md:text-4xl tracking-[-0.06em] leading-none text-white text-center pt-">
        The Showcase
      </h2>

      <div
        ref={ringRef}
        className="absolute left-1/2 top-1/2 h-0 w-0 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {cards.map((item, i) => (
          <Link
            key={`${item.href}-${i}`}
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
              {/* Project Image */}
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

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent
                opacity-0 transition-opacity duration-500
                group-hover:opacity-100 group-focus-visible:opacity-100"
              />

              {/* Project Details */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-4">
                {/* <h3 className="text-lg font-semibold leading-tight text-white">
                  {item.title}
                </h3> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                {/* Worked On */}
                {item.workedOn?.[0] && (
                  <div className="mt-2">
                    <span className={`relative text-white 2xl:text-2xl xl:text-2xl lg:text-2xl md:text-3xl text-2xl max-sm:text-base max-sm:leading-tight uppercase tracking-wider ${gadugi.variable}`}>
                      {(() => {
                        const title = item.workedOn[0] || "";
                        const words = title.trim().split(/\s+/);

                        if (words.length === 1) {
                          return <span className="font-extrabold">{words[0]}</span>;
                        }

                        if (words.length === 2) {
                          return (
                            <>
                              <span className="font-extrabold block">{words[0]}</span>
                              <span className="font-medium block">{words[1]}</span>
                            </>
                          );
                        }

                        // 3+ words → first two words on line 1, rest on line 2
                        const firstLine = words.slice(0, 2).join(" ");
                        const secondLine = words.slice(2).join(" ");

                        return (
                          <>
                            <span className="font-extrabold block">{firstLine}</span>
                            <span className="font-medium block">{secondLine}</span>
                          </>
                        );
                      })()}
                    </span>
                  </div>
                )}

                {/* {item.shortDescription && (
                  <p className="mt-2 text-xs leading-relaxed text-white/80 line-clamp-3">
                    {item.shortDescription}
                  </p>
                )} */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}