"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const FRAME_COUNT = 259;
const frameUrl = (index) =>
  `/assets/hero_frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

export default function ContactPage() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const framesRef = useRef([]);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    if (!canvas || !scene) return undefined;

    const context = canvas.getContext("2d");
    let currentFrame = -1;
    let paintRequest;

    const paint = (image, index) => {
      if (!image?.naturalWidth || index === currentFrame) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const imageWidth = image.naturalWidth * scale;
      const imageHeight = image.naturalHeight * scale;

      context.clearRect(0, 0, width, height);
      context.drawImage(
        image,
        (width - imageWidth) / 2,
        (height - imageHeight) / 2,
        imageWidth,
        imageHeight
      );
      currentFrame = index;
    };

    const resize = () => {
      const density = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * density;
      canvas.height = canvas.clientHeight * density;
      context.setTransform(density, 0, 0, density, 0, 0);
      const frame = framesRef.current[Math.round(progressRef.current * (FRAME_COUNT - 1))];
      paint(frame, -1);
    };

    const updateFromScroll = () => {
      const bounds = scene.getBoundingClientRect();
      const travel = Math.max(scene.offsetHeight - window.innerHeight, 1);
      const nextProgress = Math.min(Math.max(-bounds.top / travel, 0), 1);
      const nextFrame = Math.round(nextProgress * (FRAME_COUNT - 1));

      progressRef.current = nextProgress;
      setProgress(nextProgress);
      cancelAnimationFrame(paintRequest);
      paintRequest = requestAnimationFrame(() => {
        paint(framesRef.current[nextFrame], nextFrame);
      });
    };

    framesRef.current = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image();
      image.src = frameUrl(index);
      image.onload = () => {
        setLoadedCount((count) => count + 1);
        if (index === 0) paint(image, 0);
      };
      return image;
    });

    resize();
    updateFromScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateFromScroll, { passive: true });

    return () => {
      cancelAnimationFrame(paintRequest);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateFromScroll);
    };
  }, []);

  return (
    <main className="bg-[#ecebe5] text-[#111]">
      <section ref={sceneRef} id="home-hero" className="relative h-[350vh] bg-[#070909] text-white">
        <div className="sticky top-0 h-screen overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            aria-label="Scroll-driven hero animation"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.78),rgba(0,0,0,.18)_65%,rgba(0,0,0,.05))]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.7),transparent_35%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between px-6 py-28 md:px-10 lg:px-16 lg:py-32">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[.22em] text-white/60">
              <span>Growje / Contact</span>
              <span>{String(loadedCount).padStart(3, "0")} / {FRAME_COUNT}</span>
            </div>

            <div className="max-w-3xl">
              <p className="mb-6 text-xs uppercase tracking-[.25em] text-[#d9f04b]">
                Let&apos;s make something impossible to ignore
              </p>
              <h1 className="text-[clamp(3.5rem,9vw,9rem)] font-medium leading-[.83] tracking-[-.07em]">
                Bring the<br /><span className="font-serif italic">good stuff.</span>
              </h1>
              <p className="mt-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                Tell us what you&apos;re building, where you want to go, and what keeps you up at night. We&apos;ll bring the sharp questions.
              </p>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[.2em] text-white/55">
                <ArrowDown size={16} /> Scroll to explore
              </div>
              <span className="text-5xl font-light tracking-[-.08em] text-white/80">
                {String(Math.round(progress * 100)).padStart(2, "0")}
                <small className="ml-1 text-base tracking-normal text-white/45">%</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-16 px-6 py-24 md:px-10 lg:grid-cols-12 lg:px-16 lg:py-36">
        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[.2em] text-black/45">Start a conversation</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <h2 className="max-w-3xl text-4xl font-medium leading-[.95] tracking-[-.06em] md:text-6xl">
            A blank page is a good place to start.
          </h2>
          <Link href="mailto:hello@growje.in" className="mt-12 inline-flex items-center gap-3 border-b border-black pb-3 text-lg">
            hello@growje.in <ArrowUpRight size={19} />
          </Link>
          <div className="mt-24 grid gap-8 border-t border-black/15 pt-8 text-sm md:grid-cols-3">
            <a href="mailto:hello@growje.in" className="flex gap-3"><Mail size={17} />Email us</a>
            <a href="tel:+919625870021" className="flex gap-3"><Phone size={17} />+91 96258 70021</a>
            <span className="flex gap-3"><MapPin size={17} />New Delhi, India</span>
          </div>
        </div>
      </section>
    </main>
  );
}