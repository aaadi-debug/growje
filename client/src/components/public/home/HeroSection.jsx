
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
    const videoRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Keep the optimized poster on mobile and reduced-motion devices.
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const saveData = navigator.connection?.saveData;

        if (isMobile || reducedMotion || saveData) return;

        let timer;

        const loadVideo = () => {
            timer = setTimeout(() => {
                if (!video.isConnected) return;

                video.src = "/videos/home-hero2.mp4";
                video.load();

                video.play().catch(() => {
                    // Poster remains visible if autoplay is unavailable.
                });
            }, 1200);
        };

        if (document.readyState === "complete") {
            loadVideo();
        } else {
            window.addEventListener("load", loadVideo, { once: true });
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener("load", loadVideo);
        };
    }, []);

    return (
        <section className="relative min-h-[60vh] md:min-h-[75vh] lg:min-h-screen overflow-hidden bg-black text-white">

            {/* Optimized poster: loads immediately */}
            <Image
                src="/assets/images/home/home_video_thumb.png"
                alt=""
                fill
                priority
                sizes="100vw"
                quality={80}
                className="object-cover"
            />

            {/* Video: downloaded after initial page load */}
            <video
                ref={videoRef}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                    videoReady ? "opacity-100" : "opacity-0"
                }`}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
                onCanPlay={() => setVideoReady(true)}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Hero content */}
            <div className="relative z-10 flex min-h-[60vh] md:min-h-[75vh] lg:min-h-screen items-end px-5 pb-10 md:px-10 lg:px-16 lg:pb-16">
                {/* <div className="max-w-7xl">
                    <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/60">
                        GROWJE
                    </p>
                    <h1 className="max-w-6xl text-3xl font-medium leading-[0.92] md:text-5xl lg:text-[5vw]">
                        Your headline here
                    </h1>
                    <Link
                        href="/contact"
                        className="mt-8 inline-flex items-center gap-3 rounded-full border border-white px-7 py-4 text-sm transition hover:bg-white hover:text-black"
                    >
                        Start a project
                        <ArrowUpRight size={18} />
                    </Link>
                </div> */}
            </div>
        </section>
    );
}
