"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Two headings, shown one after the other
const BLOCKS = [
  ["A creative studio", "for brands that refuse", "to blend in"],
  [
    <>
      <span className="text-primary">Hi</span> there!
    </>,
    <>
      We are <span className="text-primary">GROWJE</span>, an Innovation
    </>,
    "& Digital agency",
  ],
  // ["Hi there!", "We are Growje, an Innovation", "& Digital agency"],
];

// Softness of the gradient edge, as % of the line's width
const EDGE = 45;

// Two CSS variables drive each line's mask:
//   --in  : 0 -> 1 reveals the line left-to-right
//   --out : 0 -> 1 erases the line left-to-right
const stop = (v) => `calc(var(${v}) * ${100 + EDGE}% - ${EDGE}%)`;
const end = (v) => `calc(var(${v}) * ${100 + EDGE}%)`;
const MASK = `linear-gradient(to right, transparent ${stop("--out")}, #000 ${end(
  "--out"
)}, #000 ${stop("--in")}, transparent ${end("--in")})`;

export default function ScrollTextSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const blocks = gsap.utils.toArray(".st-block");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%", // total scroll distance while pinned
          pin: true,
          scrub: 0.6, // smoothing: higher = more lag
          anticipatePin: 1,
        },
      });

      blocks.forEach((block, i) => {
        const lines = block.querySelectorAll(".st-line");
        const isLast = i === blocks.length - 1;

        // The first heading is already visible when the section is reached,
        // so only the following headings wipe in.
        if (i > 0) {
          // IN: whole block wipes in together (no stagger)
          tl.fromTo(
            lines,
            { "--in": 0 },
            { "--in": 1, duration: 0.7, stagger: 0 }, // ← was 1 + stagger 0.55
            ">-0.3"
          );

          // HOLD
          tl.to({}, { duration: 0.4 });
        }

        // OUT: whole block wipes out together (no stagger)
        if (!isLast) {
          tl.to(lines, {
            "--out": 1,
            duration: 0.7, // slightly shorter
            stagger: 0,    // ← was 0.45 – this is the main speed-up
          });
        }
      });

      // hold the final heading before unpinning
      tl.to({}, { duration: 0.3 });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden text-black"
    >
      {BLOCKS.map((lines, b) => (
        <h2
          key={b}
          className="st-block absolute inset-0 flex flex-col items-center justify-center px-4 text-center font-semibold"
        >
          {lines.map((line, i) => (
            <span
              key={i}
              className="st-line block w-fit whitespace-nowrap text-[6.4vw] leading-[1.15] tracking-[-0.055em] md:text-[6.8vw]"
              style={{
                "--in": b === 0 ? 1 : 0,
                "--out": 0,
                maskImage: MASK,
                WebkitMaskImage: MASK,
              }}
            >
              {line}
            </span>
          ))}
        </h2>
      ))}
    </section>
  );
}