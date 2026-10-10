"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import About from "@/components/public/servicepage/About";
import Faqs from "@/components/public/servicepage/Faqs";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const serviceImages = {
  "Corporate Gift": "https://images.unsplash.com/photo-1557804506-669a709abc7d?w=800&q=80",
  "Printing": "/assets/images/home/website_uiux.png",
  "branding Services": "/assets/images/home/digi_mark.png",
  // add more offline service images here
};

const defaultImage =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80";

export default function OfflineZonePage() {
  const [pageData, setPageData] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pageRes, servicesRes] = await Promise.all([
          fetch(`${API_URL}/offline-zone/public`),
          fetch(`${API_URL}/services/public`),
        ]);

        const pageJson = await pageRes.json();
        const servicesJson = await servicesRes.json();

        if (pageJson.success) setPageData(pageJson.page);

        if (servicesJson.success) {
          const offlineOnly = (servicesJson.services || []).filter(
            (s) => s.category === "offline"
          );
          setServices(offlineOnly);
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
    return <div className="p-20 text-center">Loading...</div>;
  }

  const hero = pageData?.hero || {};
  const aboutSections = pageData?.aboutSections || [];
  const faqs = pageData?.faqs || [];

  return (
    <main className="bg-white text-black">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen flex items-end pb-16">
        {hero.media?.url && (
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
          </>
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

      {/* SERVICES WE OFFER */}
      <section className="px-6 lg:px-10 py-20">
        <h2 className="text-4xl md:text-6xl tracking-tight text-center mb-14">
          Services We Offer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service) => {
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
                className="relative flex items-end p-8 rounded-2xl h-[50vh] group overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition duration-700"
                  style={{ backgroundImage: `url(${image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <h3 className="relative text-white text-3xl md:text-4xl font-medium">
                  {service.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========== 3. ABOUT SECTIONS (your component) ========== */}
      <About aboutData={aboutSections} />

      {/* ========== 4. FAQs (your component) ========== */}
      <Faqs faqData={faqs} />
    </main>
  );
}