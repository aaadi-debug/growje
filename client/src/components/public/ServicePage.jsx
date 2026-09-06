// client/src/components/public/ServicePage.jsx

import ClientMarquee from "./servicepage/ClientMarquee";
import ServiceForm from "./servicepage/ServiceForm";
import Portfolio from "./servicepage/Portfolio";
import HeroSection from "./servicepage/HeroSection";
import Services from "./servicepage/Services";
import Process from "./servicepage/Process";
import About from "./servicepage/About";
import Faqs from "./servicepage/Faqs";

export default function ServicePage({ service, projects = [] }) {
  if (!service) return null;

  const servicesSection = service.servicesSection || { title: "", items: [] };
  const processSection = service.processSection || { title: "", steps: [] };
  const aboutSections = service.aboutSections || [];
  const faqs = service.faqs || [];

  console.log("2nd page service: ", service)
  
  return (
    <main className="bg-white text-black">
      {/* ================= HERO ====================== */}
      <HeroSection service={service} />

      {/* ================= CLIENT MARQUEE ============ */}
      <ClientMarquee clients={service.clients} />

      {/* ================= SERVICE INTRO ============= */}
      <ServiceForm service={service} />

      {/* ================= PORTFOLIO ================= */}
      <Portfolio service={service} projects={projects} />

      {/* ================ SERVICES SECTION (Only One) ========= */}
      <Services servicesData={servicesSection} />

      {/* ================ PROCESS SECTION ============= */}
      <Process processData={processSection} />

      {/* ================ ABOUT SECTIONS (Alternating) ======== */}
      <About aboutData={aboutSections} />

      {/* ================ FAQs ======================== */}
      <Faqs faqData={faqs} />
    </main>
  );
}