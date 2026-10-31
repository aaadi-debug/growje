"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import About from "@/components/public/servicepage/About";
import Faqs from "@/components/public/servicepage/Faqs";
import DigitalZoneForm from "@/components/public/DigitalZoneForm";
import PageSkeletonLoader from "@/components/public/PageSkeletonLoader";
import { gadugi } from "@/app/fonts";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ─────────────────────────────────────────────
// Custom images for services
// ─────────────────────────────────────────────
const serviceImages = {
  "Digital Marketing": "/assets/images/home/digital-marketing.jpeg",
  "2D & 3D Edits": "/assets/images/home/video_prod.jpeg",
  "Graphic Designing": "/assets/images/home/graphic-design.jpeg",
  "Web development": "/assets/images/home/website-development.jpeg",
};

const defaultImage =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80";

export default function DigitalZonePage() {
  const [pageData, setPageData] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pageRes, servicesRes] = await Promise.all([
          fetch(`${API_URL}/digital-zone/public`),
          fetch(`${API_URL}/services/public`),
        ]);

        const pageJson = await pageRes.json();
        const servicesJson = await servicesRes.json();

        if (pageJson.success) setPageData(pageJson.page);

        if (servicesJson.success) {
          const onlineOnly = (servicesJson.services || []).filter(
            (s) => s.category === "online"
          );
          setServices(onlineOnly);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <PageSkeletonLoader />;
  }

  const hero = pageData?.hero || {};
  const aboutSections = pageData?.aboutSections || [];
  const faqs = pageData?.faqs || [];

  return (
    <main className="bg-white text-black">
      {/* ========== 1. HERO ========== */}
      <section className="relative overflow-hidden min-h-[60vh] md:min-h-[75vh] lg:min-h-screen flex items-end pb-16">
        {hero.media?.url ? (
          <>
            {hero.mediaType === "video" ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src={hero.media.url}
              />
            ) : (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${hero.media.url})` }}
              />
            )}
            {/* Soft dark overlay for text readability */}
            {/* <div className="absolute inset-0 bg-black/40" /> */}
          </>
        ) : (
          /* Fallback when no media */
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800 flex justify-center items-center">
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No content available
              </h3>
              <p className="text-gray-500 text-sm max-w-sm">
                Content will appear here once it is published.
              </p>
            </div>
          </div>
        )}

        <div className="relative z-10 px-6 lg:px-12 text-white">
          {hero.title && (
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight">
              {hero.title}
            </h1>
          )}
          {hero.subtitle && (
            <p className="mt-4 text-xl max-w-2xl text-white/80">
              {hero.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* ========== 2. SERVICES WE OFFER ========== */}
      <section className="relative px-6 lg:px-10 lg:py-16 md:py-12 py-6 overflow-hidden">
        {/* Background */}
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.65]
        [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
        [background-size:48px_48px]"
        />

        <div className="relative z-10 px-2 max-sm:px-0 mx-auto">
          <h2 className="text-3xl lg:text-5xl md:text-4xl tracking-tight text-center mb-6">
            Services We Offer
          </h2>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-6 max-sm:gap-3">
            {services.length > 0 ? (
              services.map((service) => {
                // Match image by title (exact → case-insensitive → fallback)
                const image =
                  serviceImages[service.title] ||
                  Object.entries(serviceImages).find(
                    ([key]) =>
                      key.toLowerCase() === service.title?.toLowerCase()
                  )?.[1] ||
                  service.hero?.media?.url ||
                  defaultImage;

                return (
                  <Link
                    key={service._id}
                    href={`/${service.slug}`}
                    className="relative flex items-end p-8 max-sm:p-4 rounded-2xl aspect-[4/5] group overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition duration-700"
                      style={{ backgroundImage: `url(${image})` }}
                    />

                    {/* Bottom gradient + title */}
                    <div className="absolute inset-x-0 bottom-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                      <div className={`relative flex items-end justify-between gap-4 p-5 lg:p-6 ${gadugi.variable}`}>
                        <h3 className="relative text-white 2xl:text-4xl xl:text-4xl lg:text-2xl md:text-3xl text-2xl max-sm:text-base max-sm:leading-tight">
                          {(() => {
                            const title = service.title || "";
                            const spaceIndex = title.indexOf(" ");

                            if (spaceIndex === -1) {
                              // Single word – keep current weight
                              return title;
                            }

                            const firstLine = title.slice(0, spaceIndex);
                            const secondLine = title.slice(spaceIndex + 1);

                            return (
                              <>
                                <span className="font-normal block capitalize">{firstLine}</span>
                                <span className="block font-[family-name:var(--font-gadugi)] font-normal capitalize">{secondLine}</span>
                              </>
                            );
                          })()}
                        </h3>

                        <span className="shrink-0 w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                          <ArrowUpRight size={18} />
                        </span>
                      </div>
                    </div>
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <h3 className="relative text-white 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-3xl text-2xl max-sm:text-base max-sm:leading-tight font-medium">
                      {service.title}
                    </h3> */}
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No services available
                </h3>
                <p className="text-gray-500 text-sm max-w-sm">
                  Services will appear here once they are published.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <DigitalZoneForm services={services} />

      {/* ========== 3. ABOUT SECTIONS (your component) ========== */}
      <About aboutData={aboutSections} />

      {/* ========== 4. FAQs (your component) ========== */}
      <Faqs faqData={faqs} />
    </main>
  );
}