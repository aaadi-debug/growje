"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const FRAME_COUNT = 259;
const frameUrl = (index) =>
    `/assets/hero_frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

export default function HeroSection() {
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
        <>
            {/* <section ref={sceneRef} id="home-hero" className="relative h-[350vh] bg-[#070909] text-white">
                <div className="sticky top-0 h-screen overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 h-full w-full"
                        aria-label="Scroll-driven hero animation"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.78),rgba(0,0,0,.18)_65%,rgba(0,0,0,.05))]" />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.7),transparent_35%)]" />

                    <div className="relative z-10 flex h-full flex-col justify-end px-6 py-28 md:px-10 lg:px-16 lg:py-32">
                        

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
            </section> */}

            <section className="relative min-h-screen overflow-hidden bg-black text-white">
                <video
                    src="/videos/home-hero2.mp4"
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />

                {/* <div className="absolute inset-0 bg-black/60" /> */}

                <div className="relative z-10 flex min-h-screen items-end px-5 pb-10 md:px-10 lg:px-16 lg:pb-16">
                    <div className="max-w-7xl">
                        <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/60">
                            GROWJE
                        </p>
                        {/* <h1 className="max-w-6xl text-3xl font-medium leading-[0.92] md:text-5xl lg:text-[5vw]">
                            Your headline here
                        </h1> */}
                    </div>
                </div>
            </section>

            {/* <section className="relative min-h-screen bg-primary text-white overflow-hidden flex items-end">
                BACKGROUND
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/80 z-10" />
                    <img
                        src="/assets/images/creative_2.jpg"
                        alt="Moshi Moshi creative studio"
                        className="w-full h-full object-cover"
                    />
                </div>
                HERO CONTENT
                <div className="relative z-20 w-full px-6 lg:px-10 pb-12 lg:pb-16">

                    <div className="max-w-[1500px]">

                        <p className="text-sm uppercase tracking-[0.2em] mb-8">
                            Creative Digital Agency
                        </p>

                        <h1 className="text-[clamp(3rem,10vw,8rem)] leading-[0.82] tracking-[-0.06em] font-medium max-w-6xl">
                            We create
                            <br />
                            brands people
                            <br />
                            <span className="italic font-serif">
                                remember.
                            </span>
                        </h1>

                        <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8">

                            <p className="max-w-md text-white/70 text-base lg:text-lg leading-relaxed">
                                We build brands, digital experiences and
                                identities that turn attention into
                                meaningful connections.
                            </p>

                            <Link
                                href="/contact"
                                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  border
                  border-white
                  rounded-full
                  px-7
                  py-4
                  text-sm
                  hover:bg-white
                  hover:text-black
                  transition
                  duration-300
                "
                            >
                                Start a project
                                <ArrowUpRight size={18} />
                            </Link>

                        </div>

                    </div>

                </div>
            </section> */}
        </>
    );
}