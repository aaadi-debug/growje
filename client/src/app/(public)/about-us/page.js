"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TeamSection from "@/components/public/TeamSection";
import LetsTalk from "@/components/public/home/LetsTalk";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

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

function Counter({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  const numericValue = parseFloat(String(value).replace(/[^\d.]/g, "")) || 0;
  const suffixText = String(value).replace(/[\d.]/g, "");

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
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * numericValue));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(numericValue);
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

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutUsPage() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API_URL}/about-page/public`);
        const data = await res.json();
        if (data.success) setPage(data.page);
      } catch (err) {
        console.error("About page fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black/50">
        Loading...
      </div>
    );
  }

  const hero = page?.hero || {};
  const founder = page?.founder || {};
  const about = page?.about || {};
  const journey = page?.journey || {};
  const mission = page?.mission || {};
  const vision = page?.vision || {};
  const valuesSection = page?.values || {};
  const approach = page?.approach || {};

  const heroBg =
    hero.backgroundImage?.url || "/assets/images/about_hero_bg.jpg";
  const founderImg =
    founder.image?.url || "/assets/images/Founder.png";
  const missionImg =
    mission.image?.url || "/assets/images/mission.jpg";
  const visionImg =
    vision.image?.url || "/assets/images/vision.jpg";

  const heroStats =
    hero.stats?.length > 0
      ? hero.stats
      : [
        { value: "1000+", label: "Global Projects Complete" },
        { value: "800+", label: "Clients Satisfaction" },
      ];

  const aboutParagraphs = about.paragraphs?.filter(Boolean) || [];
  const journeyItems = journey.items?.filter((i) => i.year || i.title) || [];
  const valueItems = valuesSection.items?.filter((i) => i.title) || [];
  const desktopImages =
    approach.desktopImages?.filter((img) => img?.url) || [];
  const mobileImages =
    approach.mobileImages?.filter((img) => img?.url) || [];

  return (
    <main className="bg-white text-black">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden min-h-screen flex lg:flex-row flex-col lg:justify-between justify-end 2xl:pb-16 xl:pb-10 pb-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div
          className="absolute inset-0 bg-top bg-no-repeat bg-cover"
          style={{ backgroundImage: `url('${heroBg}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08689A]/90 via-[#08689A]/50 to-transparent" />

        {/* Left */}
        <div className="relative flex flex-col justify-end lg:px-12 px-6">
          <FadeUp className="mb-4">
            <RotatingBadge />
          </FadeUp>

          <FadeUp>
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/75">
              {hero.eyebrow || "About GROWJE"}
            </p>
          </FadeUp>

          <FadeUp delay={100}>
            <h1 className="2xl:text-[clamp(2.5rem,6vw,6.8rem)] xl:text-[clamp(1.5rem,6vw,4rem)] lg:text-[clamp(1.5rem,4vw,4rem)] text-[clamp(1.5rem,6vw,4rem)] font-medium leading-[0.92] tracking-[-0.06em] text-white">
              {hero.titleLine1 || "We build brands"}
              <br />
              <span className="text-white/75">
                {hero.titleLine2 || "people remember."}
              </span>
            </h1>

            <Link
              href={hero.ctaLink || "/contact-us"}
              className="group inline-flex items-center text-white gap-3 mt-10 text-sm font-medium border-b border-white pb-2 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:text-white/80 hover:border-white/80"
            >
              {hero.ctaText || "Get A Quote"}
              <ArrowUpRight
                size={16}
                className="transition-all duration-300 ease-out group-hover:rotate-45 group-hover:translate-x-1"
              />
            </Link>
          </FadeUp>
        </div>

        {/* Right */}
        <div className="relative flex flex-col justify-end lg:px-16 px-6 max-sm:hidden">
          {hero.subtitle && (
            <FadeUp delay={200}>
              <p className="mt-10 max-sm:mt-6 max-w-xl 2xl:text-xl xl:text-xl text-lg max-sm:text-base lg:font-semibold leading-relaxed text-white">
                {hero.subtitle}
              </p>
            </FadeUp>
          )}

          <FadeUp className="flex max-sm:flex-col justify-between 2xl:mt-10 xl:mt-8 lg:mt-6 mt-4">
            {heroStats.map((stat, i) => (
              <div
                key={i}
                className={`text-white ${i > 0 ? "max-sm:mt-4" : ""}`}
              >
                <span className="2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-semibold">
                  <Counter value={stat.value} />
                </span>
                <p>{stat.label}</p>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ================= OWNER + ABOUT + JOURNEY ================= */}
      <section className="relative overflow-clip px-6 lg:px-10 py-16 lg:py-28">
        <div
          className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.65]
            [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
            [background-size:48px_48px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Sticky founder */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={founderImg}
                    alt={founder.image?.alt || founder.name || "Founder"}
                    className="h-auto 2xl:w-[80%] xl:w-[80%] lg:w-[90%] md:w-[30%] w-[60%] object-cover border rounded-2xl"
                  />
                </div>
                {(founder.name || founder.designation) && (
                  <div className="mt-6">
                    {founder.name && (
                      <h3 className="text-xl font-medium tracking-tight">
                        {founder.name}
                      </h3>
                    )}
                    {founder.designation && (
                      <p className="text-sm text-black/50">
                        {founder.designation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Scrolling content */}
            <div className="lg:col-span-7 space-y-20">
              {/* About story */}
              <div>
                <FadeUp>
                  <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                    {about.eyebrow || "About Growje"}
                  </p>
                  {about.title && (
                    <h2 className="mt-5 text-3xl lg:text-5xl md:text-4xl font-medium leading-[1.1] tracking-[-0.04em]">
                      {about.title}
                    </h2>
                  )}
                </FadeUp>

                {aboutParagraphs.map((para, i) => (
                  <FadeUp key={i} delay={100}>
                    <p
                      className={`mt-2 text-base leading-relaxed md:text-lg ${
                        // simple heuristic: shorter lines without period often look like subheadings in your content
                        para.length < 60 && !para.includes(".")
                          ? "text-black mt-6"
                          : "text-black/60"
                        } ${i === 0 ? "mt-8" : ""}`}
                    >
                      {para}
                    </p>
                  </FadeUp>
                ))}
              </div>

              {/* Journey */}
              {journeyItems.length > 0 && (
                <div>
                  <FadeUp>
                    <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                      {journey.eyebrow || "Our Journey"}
                    </p>
                    <h3 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl">
                      {journey.title || "From idea to impact"}
                    </h3>
                  </FadeUp>

                  <div className="mt-12 space-y-12">
                    {journeyItems.map((item, index) => (
                      <FadeUp key={`${item.year}-${index}`} delay={index * 80}>
                        <div className="flex gap-6 max-sm:flex-col">
                          <div className="w-20 shrink-0">
                            <span className="text-2xl font-medium text-primary">
                              {item.year}
                            </span>
                          </div>
                          <div className="border-l border-black/10 pl-6">
                            {item.title && (
                              <h4 className="text-lg font-medium">
                                {item.title}
                              </h4>
                            )}
                            {item.description && (
                              <p className="mt-2 text-black/60 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </FadeUp>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION + VISION ================= */}
      {(mission.description || vision.description) && (
        <section className="relative overflow-hidden px-6 lg:px-10 pb-16 lg:pb-28">
          <div
            className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.65]
              [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
              [background-size:48px_48px]"
            aria-hidden="true"
          />

          <div className="relative mx-auto">
            <div className="grid gap-16 max-sm:gap-8 lg:grid-cols-2">
              {/* Mission */}
              <div className="border border-gray-400 lg:p-6 p-4 rounded-2xl bg-white flex relative overflow-hidden">
                {missionImg && (
                  <img
                    src={missionImg}
                    alt={mission.image?.alt || "Mission"}
                    className="h-4/5 max-sm:h-1/2 absolute bottom-0 right-0 rounded-3xl opacity-50"
                  />
                )}
                <div className="z-10 pb-20">
                  <h2 className="mt-5 font-medium leading-[1.1] tracking-[-0.04em] text-3xl lg:text-5xl md:text-4xl">
                    {mission.title || "Company Mission"}
                  </h2>
                  {mission.description && (
                    <p className="mt-6 text-gray-500 text-lg max-sm:text-base">
                      {mission.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Vision */}
              <div className="border border-gray-400 lg:p-6 p-4 rounded-2xl bg-white flex relative overflow-hidden">
                {visionImg && (
                  <img
                    src={visionImg}
                    alt={vision.image?.alt || "Vision"}
                    className="h-4/5 max-sm:h-1/2 absolute bottom-0 right-0 rounded-3xl opacity-50"
                  />
                )}
                <div className="z-10 pb-20">
                  <h2 className="mt-5 font-medium leading-[1.1] tracking-[-0.04em] text-3xl lg:text-5xl md:text-4xl">
                    {vision.title || "Our Vision"}
                  </h2>
                  {vision.description && (
                    <p className="mt-6 text-gray-500 text-lg max-sm:text-base">
                      {vision.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= VALUES ================= */}
      {valueItems.length > 0 && (
        <section className="relative overflow-hidden bg-white px-6 lg:px-10 lg:py-16 md:py-12 py-6">
          <div
            className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.65]
              [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
              [background-size:48px_48px]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-5xl">
            <h2 className="text-3xl lg:text-5xl md:text-4xl tracking-[-0.06em] leading-none mb-10 text-center">
              {valuesSection.title || "Our way of working"}
            </h2>

            <div className="relative">
              <div
                className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 
                  bg-[repeating-linear-gradient(to_bottom,theme(colors.primary)_0,theme(colors.primary)_6px,transparent_6px,transparent_14px)]
                  opacity-40"
                aria-hidden="true"
              />

              <div className="space-y-16 md:space-y-24">
                {valueItems.map((item, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <div
                      key={`${item.number}-${index}`}
                      data-aos={isLeft ? "fade-up-right" : "fade-up-left"}
                      data-aos-delay={index * 100}
                      data-aos-duration="700"
                      className={`relative flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                    >
                      <div
                        className={`w-full md:w-[calc(50%-2.5rem)] group rounded-2xl border border-primary bg-white p-7 md:p-8
                          transition-all duration-500
                          hover:-translate-y-1 hover:bg-primary hover:text-white
                          ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
                      >
                        <span className="text-sm text-black/30 group-hover:text-white/40">
                          {item.number || String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-5 text-xl font-semibold text-primary group-hover:text-white">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="mt-3 text-sm leading-relaxed text-black/55 group-hover:text-white/60">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div
                        className="absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2
                          items-center justify-center rounded-full border-2 border-primary bg-[#f4f4f0]
                          text-sm font-semibold text-primary shadow-sm max-sm:hidden"
                      >
                        {item.number || String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team stays separate (dynamic via /api/team) */}
      <TeamSection />

      {/* ================= SECRET SAUCE / APPROACH ================= */}
      {(desktopImages.length > 0 || mobileImages.length > 0) && (
        <section className="bg-black text-white py-10">
          <h2 className="text-3xl lg:text-5xl md:text-4xl tracking-tight text-center text-white mb-6">
            {approach.title || "Our Secret Sauce"}
          </h2>

          {desktopImages.length > 0 && (
            <div className="lg:block md:block hidden">
              {desktopImages.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={img.alt || `Approach ${i + 1}`}
                />
              ))}
            </div>
          )}

          {mobileImages.length > 0 && (
            <div className="lg:hidden md:hidden block">
              {mobileImages.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={img.alt || `Approach ${i + 1}`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <LetsTalk />
    </main>
  );
}