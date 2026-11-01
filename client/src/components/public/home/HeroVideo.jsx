
"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
    const videoRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const saveData = navigator.connection?.saveData;

        // Respect user preferences.
        if (reducedMotion || saveData) return;

        let timer;

        const loadVideo = () => {
            timer = setTimeout(async () => {
                if (!video.isConnected) return;

                video.src = "/videos/home-hero2.mp4";
                video.load();

                try {
                    await video.play();
                } catch (error) {
                    console.warn("Hero video autoplay unavailable.");
                }
            }, 1500);
        };

        if (document.readyState === "complete") {
            loadVideo();
        } else {
            window.addEventListener("load", loadVideo, {
                once: true,
            });
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener("load", loadVideo);
        };
    }, []);

    return (
        <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                videoReady ? "opacity-100" : "opacity-0"
            }`}
            muted
            autoPlay
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onCanPlay={() => setVideoReady(true)}
        />
    );
}
