"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Approach_1 from "../../../../public/assets/images/home/approach_1.png"
import Image from "next/image";
import LetsTalk from "@/components/public/home/LetsTalk";
import TeamSection from "@/components/public/TeamSection";

const stats = [
  { value: "7k+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
];

const principles = [
  "Strategy before design",
  "Clear communication",
  "Measurable results",
  "Long-term partnership",
];

const values = [
  {
    number: "01",
    title: "Purpose First",
    description:
      "Every project starts with understanding the problem, the audience and the bigger business objective.",
  },
  {
    number: "02",
    title: "Ideas That Matter",
    description:
      "We combine strategy, creativity and technology to turn ideas into digital experiences people remember.",
  },
  {
    number: "03",
    title: "Built End to End",
    description:
      "From branding and design to websites and digital experiences, we bring everything together under one roof.",
  },
  {
    number: "04",
    title: "Built Together",
    description:
      "We work closely with our clients, treating every collaboration as a partnership rather than a handoff.",
  },
];

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function RotatingBadge() {
  return (
    <div className="relative w-36 h-36 lg:w-44 lg:h-44">
      {/* Rotating text */}
      <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text className="text-2xl tracking-[0.25em] fill-white/90">
            <textPath href="#circlePath" startOffset="0%">
              Let’s Build Something Great • Let’s Build Something Great •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center arrow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Link href="/contact-us">
          <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}

function Counter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  // Extract number from strings like "7k+", "98%", "50+"
  const numericValue = parseFloat(value.replace(/[^\d.]/g, "")) || 0;
  const suffixText = value.replace(/[\d.]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const duration = 1800;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

            setCount(Math.floor(ease * numericValue));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(numericValue);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffixText}
    </span>
  );
}

export default function AboutUsPage() {
  return (
    <main className="bg-white text-black">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden min-h-screen flex lg:flex-row flex-col lg:justify-between justify-end 2xl:pb-16 xl:pb-10 pb-8">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

        {/* Background image */}
        <div
          className="absolute inset-0 bg-top bg-no-repeat"
          style={{
            backgroundImage: "url('assets/images/about_hero_bg.jpg')", // ← change to your actual filename
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#08689A]/90 via-[#08689A]/50 to-transparent" />

        {/* left */}
        <div className="relative flex flex-col justify-end lg:px-12 px-6">
          <FadeUp className="mb-4">
            <RotatingBadge />
          </FadeUp>
          <FadeUp>
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/75">
              About GROWJE
            </p>
          </FadeUp>

          <FadeUp delay={100}>
            <h1 className="2xl:text-[clamp(2.5rem,6vw,6.8rem)] xl:text-[clamp(1.5rem,6vw,4rem)] lg:text-[clamp(1.5rem,4vw,4rem)] text-[clamp(1.5rem,6vw,4rem)] font-medium leading-[0.92] tracking-[-0.06em] text-white">
              We build brands
              <br />
              <span className="text-white/75">people remember.</span>
            </h1>

            <Link
              href="/contact-us"
              className="
                                group
                                inline-flex
                                items-center
                                text-white
                                gap-3
                                mt-10
                                text-sm
                                font-medium
                                border-b
                                border-white
                                pb-2
                                relative
                                after:absolute
                                after:bottom-0
                                after:left-0
                                after:h-px
                                after:w-0
                                after:bg-primary
                                after:transition-all
                                after:duration-300
                                hover:after:w-full
                                hover:text-white/80 hover:border-white/80
                            "
            >
              Get A Quote
              <ArrowUpRight
                size={16}
                className="transition-all duration-300 ease-out group-hover:rotate-45 group-hover:translate-x-1"
              />
            </Link>
          </FadeUp>

        </div>

        {/* right */}
        <div className="relative flex flex-col justify-end lg:px-16 px-6 max-sm:hidden">
          <FadeUp delay={200}>
            <p className="mt-10 max-sm:mt-6 max-w-xl 2xl:text-xl xl:text-xl text-lg max-sm:text-base lg:font-semibold leading-relaxed text-white">
              A creative digital agency focused on strategy, design and
              technology that helps ambitious brands grow and stand out.
            </p>
          </FadeUp>
          <FadeUp className="flex max-sm:flex-col justify-between 2xl:mt-10 xl:mt-8 lg:mt-6 mt-4">
            <div delay={300} className="text-white">
              <span className="2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-semibold">
                <Counter value="1000+" />
              </span>
              <p>Global Projects Complete</p>
            </div>
            <div delay={300} className="text-white max-sm:mt-4">
              <span className="2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-semibold">
                <Counter value="800+" />
              </span>
              <p>Clients Satisfaction</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ================= OWNER + ABOUT US + JOURNEY ================= */}
      <section className="relative overflow-clip px-6 lg:px-10 py-16 lg:py-28">
        {/* Background blurs */}
        <div
          className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
          aria-hidden="true"
        />

        {/* Optional light grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.65]
              [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
              [background-size:48px_48px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

            {/* ========== LEFT: STICKY OWNER IMAGE ========== */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="assets/images/about_hero_bg.jpg"   // ← replace with real image
                    alt="Founder of Growje"
                    className="h-auto w-full object-cover border"
                  />
                </div>

                {/* Optional name + designation under image */}
                <div className="mt-6">
                  <h3 className="text-xl font-medium tracking-tight">Anshul Rathore</h3>
                  <p className="text-sm text-black/50">Founder & CEO</p>
                </div>
              </div>
            </div>

            {/* ========== RIGHT: SCROLLING CONTENT ========== */}
            <div className="lg:col-span-7 space-y-20">

              {/* ----- ABOUT US ----- */}
              <div>
                <FadeUp>
                  <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                    About Growje
                  </p>
                  <h2 className="mt-5 text-4xl font-medium leading-[1.1] tracking-[-0.04em] md:text-5xl">
                    Where Ideas Evolve. Brands Grow.
                  </h2>
                </FadeUp>

                <FadeUp delay={100}>
                  <p className="mt-8 text-base leading-relaxed text-black/60 md:text-lg">
                    Every brand begins with an idea, a vision, and a reason to be remembered. Growje was built with a simple thought — to build something of our own and create work that genuinely makes a difference for businesses.
                  </p>
                </FadeUp>

                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    Our journey began in 2021 under a different identity, marking the first chapter of an entrepreneurial vision. That chapter eventually came to an end, but the idea behind it continued to evolve. In 2023, that vision took a new shape as Growje.
                  </p>
                </FadeUp>

                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    The name Growje represents one simple yet powerful philosophy — Brand Growth. From the beginning, our focus has been to help businesses build a meaningful digital presence through creativity, strategy, social media, digital marketing, and storytelling.
                  </p>
                </FadeUp>

                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black md:text-lg">
                    The Beginning of Our Journey.
                  </p>
                </FadeUp>

                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    Growje began with a clear vision but, like every growing business, the early journey came with its own challenges.
                  </p>
                </FadeUp>

                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    In the beginning, the focus was on understanding businesses from the ground up. Every project brought a new challenge and every client taught us something different. We spent time speaking directly with clients, understanding their businesses, studying what their audiences were looking for, and creating solutions around their actual needs.
                  </p>
                </FadeUp>

                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    From creating new designs and experimenting with different content approaches to personally working on Meta Ads, we were closely involved in every part of the process.
                  </p>
                </FadeUp>

                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    There was no fixed formula.
                  </p>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    We learned. We experimented. We improved. And we kept moving forward.
                  </p>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black md:text-lg">
                    Understanding Before Creating
                  </p>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    As our experience grew, one belief became stronger — every business is different.
                  </p>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    A strategy that works for one brand may not work for another. That's why we don't believe in simply applying the same marketing formula to every client.
                  </p>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black md:text-lg">
                    Growing Beyond Boundaries
                  </p>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    With time, the work became bigger and the opportunities expanded.
                  </p>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    What started with a few projects gradually developed into larger opportunities, including working on government tenders. Our journey also expanded beyond India, giving us the opportunity to work with clients from international markets.
                  </p>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    Every new project brought new perspectives, new challenges, and new opportunities to learn.
                  </p>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    And with that growth came something even more important — a growing team and a bigger vision.
                  </p>
                </FadeUp>

                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black md:text-lg">
                    Where We Are Today
                  </p>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    Today, Growje is more than a digital marketing company.
                  </p>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    We are building a growth-focused creative partner for ambitious businesses — from emerging brands taking their first steps to established businesses looking for their next stage of growth.
                  </p>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    Our journey is still being written, but the mindset remains the same as it was in the beginning:
                  </p>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="mt-2 text-base leading-relaxed text-black/60 md:text-lg">
                    Keep learning. Keep creating. Keep evolving.
                  </p>
                </FadeUp>
              </div>

              {/* ----- JOURNEY (Year by Year) ----- */}
              <div>
                <FadeUp>
                  <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                    Our Journey
                  </p>
                  <h3 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                    From idea to impact
                  </h3>
                </FadeUp>

                <div className="mt-12 space-y-12">
                  {/* Example timeline items - replace with real data */}
                  {[
                    {
                      year: "2023",
                      title: "The Beginning",
                      description: "The idea of starting something of his own was always there. After spending three years in the corporate world, our founder decided it was time to take that experience and build something of his own. The journey started small, working with just a few clients and figuring things out one project at a time. From sitting with clients, understanding what they really wanted, trying new designs, and keeping up with what was happening in the market, every day brought something new to learn. Finally, that journey became Growje",
                    },
                    {
                      year: "2024",
                      title: "Scaling Up",
                      description: "What started with a few projects slowly grew through consistent work and social media, and by the end of 2024, clients had started finding Growje on their own and reaching out.",
                    },
                    {
                      year: "2025",
                      title: "Today",
                      description: "Today, Growje is still driven by the same mindset — keep learning, keep creating, and keep finding better ways to help brands grow.",
                    },
                  ].map((item, index) => (
                    <FadeUp key={item.year} delay={index * 80}>
                      <div className="flex gap-6 max-sm:flex-col">
                        {/* Year */}
                        <div className="w-20 shrink-0">
                          <span className="text-2xl font-medium text-primary">
                            {item.year}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="border-l border-black/10 pl-6">
                          <h4 className="text-lg font-medium">{item.title}</h4>
                          <p className="mt-2 text-black/60 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= VISSION + MISSION ================= */}
      <section className="relative overflow-hidden px-6 lg:px-10 pb-16 lg:pb-28">
        <div
          className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
          aria-hidden="true"
        />

        {/* Optional light grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.65]
                    [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
                    [background-size:48px_48px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto">
          <div className="grid gap-16 max-sm:gap-8 lg:grid-cols-2">
            <div className="border border-gray-400 lg:p-6 p-4 rounded-2xl bg-white flex relative">
              <img
                src="assets/images/mission.jpg"
                alt="Mission Illustration"
                className="h-4/5 max-sm:h-1/2 absolute bottom-0 right-0 rounded-3xl"
              />
              <div className="z-10 pb-20">
                <h2 className="mt-5 text-4xl font-medium leading-[1.1] tracking-[-0.04em] md:text-5xl">
                  Company Mission
                </h2>
                <p className="mt-6 text-gray-500 text-lg max-sm:text-base">
                  To help growing brands get noticed, connect with the right people, and grow with confidence. We bring together digital marketing, creative ideas, technology, and storytelling to create work that feels real and makes a difference. We want to make good marketing more accessible for small and growing businesses, while building long-term relationships that help brands move forward.
                </p>
              </div>
            </div>

            <div className="border border-gray-400 lg:p-6 p-4 rounded-2xl bg-white flex relative">
              <img
                src="assets/images/vision.jpg"
                alt="Mission Illustration"
                className="h-4/5 max-sm:h-1/2 absolute bottom-0 right-0 rounded-3xl"
              />
              <div className="z-10 pb-20">
                <h2 className="mt-5 text-4xl font-medium leading-[1.1] tracking-[-0.04em] md:text-5xl">
                  Our Vision
                </h2>
                <p className="mt-6 text-gray-500 text-lg max-sm:text-base">
                  Our vision is to build Growje into a recognised creative and digital company that helps ambitious brands turn their ideas into something people remember. We aim to grow alongside our clients, keep evolving with the changing digital world, and create work that is not just seen, but valued, remembered, and trusted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <TeamSection />

      {/* ================= VALUES ================= */}
      <section className="relative overflow-hidden bg-[#f4f4f0] px-6 lg:px-10 pb-16 pt-12 lg:pb-20 lg:pt-16">
        <div
          className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
          aria-hidden="true"
        />
        {/* Optional light grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.65]
                    [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
                    [background-size:48px_48px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto">
          {/* Header */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none mb-12 text-center">
            Our way of working
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item, index) => (
              <FadeUp key={item.number} delay={index * 80}>
                <div className="group h-full rounded-2xl border border-primary bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white group">
                  <span className="text-sm text-black/30 group-hover:text-white/40">
                    {item.number}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-primary group-hover:text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-black/55 group-hover:text-white/60">
                    {item.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Services ================= */}
      <section className="bg-black text-white py-10">
        {/* Header */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none text-center mb-12">
          Our Secret Sauce
        </h2>

        <div className="lg:block md:block hidden">
          <img src="/assets/images/home/approach_1.png" />
          <img src="/assets/images/home/approach_2.png" />
          <img src="/assets/images/home/approach_3.png" />
          <img src="/assets/images/home/approach_4.png" />
        </div>

        <div className="lg:hidden md:hidden block">
          <img src="/assets/images/home/approach_mobile_1.png" />
          <img src="/assets/images/home/approach_mobile_2.png" />
          <img src="/assets/images/home/approach_mobile_3.png" />
          <img src="/assets/images/home/approach_mobile_4.png" />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <LetsTalk />
    </main>
  );
}