"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Approach_1 from "../../../../public/assets/images/home/approach_1.png"
import Image from "next/image";
import LetsTalk from "@/components/public/home/LetsTalk";

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

export default function AboutUsPage() {
  return (
    <main className="bg-white text-black">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden min-h-screen flex lg:flex-row flex-col lg:justify-between justify-end lg:pb-20 pb-10">
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
          <FadeUp>
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/75">
              About GROWJE
            </p>
          </FadeUp>

          <FadeUp delay={100}>
            <h1 className="text-[clamp(2.5rem,6vw,6.8rem)] font-medium leading-[0.92] tracking-[-0.06em] text-white">
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
        <div className="relative flex flex-col justify-end lg:px-16 px-6">
          <FadeUp delay={200}>
            <p className="mt-10 max-sm:mt-6 max-w-xl lg:text-xl text-lg max-sm:text-base lg:font-semibold leading-relaxed text-white">
              A creative digital agency focused on strategy, design and
              technology that helps ambitious brands grow and stand out.
            </p>
          </FadeUp>
          <FadeUp className="flex max-sm:flex-col justify-between mt-10">
            <div delay={300} className="text-white">
              <span className="lg:text-7xl md:text-5xl text-4xl font-semibold">1000+</span>
              <p>Global Projects Complete</p>
            </div>
            <div delay={300} className="text-white max-sm:mt-4">
              <span className="lg:text-7xl md:text-5xl text-4xl font-semibold">800+</span>
              <p>Clients Satisfaction</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ================= ABOUT + MISSION ================= */}
      <section className="relative overflow-hidden px-6 lg:px-10 py-16 lg:py-28">
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
          <div className="grid items-center gap-16 max-sm:gap-8 lg:grid-cols-2">
            {/* Left Content */}
            <FadeUp delay={200} className="rounded-3xl bg-primary max-sm:order-2">
              <div className="rounded-3xl p-10 text-white lg:p-12 max-sm:px-6 max-sm:py-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Company Mission
                </p>
                <p className="mt-6 text-xl max-sm:text-base leading-relaxed text-white/80">
                  To empower businesses with innovative digital solutions that
                  drive growth, enhance brand identity, and deliver measurable
                  results.
                </p>

                <div className="mt-12 grid grid-cols-2 gap-8">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-medium tracking-tight md:text-4xl">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm text-white/50">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Right Stats Card */}
            <div className="max-sm:order-1">
              <FadeUp>
                <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                  learn about us
                </p>
                <h2 className="mt-5 text-4xl font-medium leading-[1.1] tracking-[-0.04em] md:text-5xl">
                  Creative thinking meets digital execution.
                </h2>
              </FadeUp>

              <FadeUp delay={100}>
                <p className="mt-8 text-base leading-relaxed text-black/60 md:text-lg">
                  We believe great digital work isn’t just about making
                  something look good. It should communicate clearly, solve
                  real problems and create measurable value for businesses.
                </p>
              </FadeUp>

              <FadeUp delay={150}>
                <div className="mt-4 space-y-3">
                  {principles.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                        <Check size={14} />
                      </span>
                      <span className="text-black/80">{item}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="relative overflow-hidden bg-[#f4f4f0] px-6 lg:px-10 py-16 lg:py-28">
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
          <FadeUp>
            <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-20 max-sm:mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-5">
                  What drives us
                </p>
                <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none">
                  Our way of working
                </h2>
              </div>

              <p className="max-w-sm text-black/50 leading-relaxed lg:pt-10">
                We measure success not just by projects delivered, but by the lasting impact we create for our partners.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item, index) => (
              <FadeUp key={item.number} delay={index * 80}>
                <div className="group h-full rounded-2xl border border-black/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-white">
                  <span className="text-sm text-black/30 group-hover:text-white/40">
                    {item.number}
                  </span>
                  <h3 className="mt-10 text-xl font-medium">{item.title}</h3>
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
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-20 px-6 lg:px-10 pt-4 lg:pt-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">
              Strategic
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none">
              Approach we follow
            </h2>
          </div>

          <p className="max-w-sm text-white/50 leading-relaxed lg:pt-10">
            From strategy and branding to digital
            experiences, we help businesses become
            impossible to ignore.
          </p>
        </div>

        <div className="lg:block md:block hidden">
          <img src="/assets/images/home/approach_1.png" />
          <img src="/assets/images/home/approach_2.png" />
          <img src="/assets/images/home/approach_3.png" />
          <img src="/assets/images/home/approach_4.png" />
        </div>

        <div className="lg:hidden md:hidden block">
          <img src="/assets/images/home/approach_mobile_1.png" />
          <img src="/assets/images/home/approach_mobile_2.png" />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <LetsTalk />
    </main>
  );
}