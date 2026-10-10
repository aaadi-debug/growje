"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 800,        // animation duration
      easing: "ease-out",   // easing
      once: false,           // animate only once
      offset: 100,          // offset (in px) from the original trigger point
      // disable: "mobile", // optional: disable on mobile
    });
  }, []);

  return null; // this component doesn't render anything
}