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

const mobileImages = [
  "/assets/images/home/approach_mobile_1.png",
  "/assets/images/home/approach_mobile_2.png",
  "/assets/images/home/approach_mobile_3.png",
  "/assets/images/home/approach_mobile_4.png",
];

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
            <HorizontalImageScroll images={images} mobileImages={mobileImages} />
        </>
    )
}