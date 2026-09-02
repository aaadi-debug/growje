"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { RiYoutubeLine } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Footer() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/services/public`, {
          cache: "no-store",
        });

        const data = await response.json();

        if (data.success) {
          setServices(data.services || []);
        }
      } catch (error) {
        console.error("Fetch Footer Services Error:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <footer className="bg-black text-white">
      <div className="px-6 lg:px-10 pt-16 lg:pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold"
            >
              GROWJE
            </Link>

            <p className="mt-6 text-sm text-white/60 max-w-xs leading-relaxed">
              Creative digital solutions for ambitious brands,
              businesses and ideas.
            </p>

            <div className="flex gap-2 mt-6">
              <a href="https://www.facebook.com/GrowjeBrandingSolution/" target="_blank" className="border rounded-full hover:bg-white hover:text-primary transition duration-300 p-2"> <FiFacebook size={16} /> </a>
              <a href="https://www.instagram.com/growjebrandsolution/" target="_blank" className="border rounded-full hover:bg-white hover:text-primary transition duration-300 p-2"> <FaInstagram size={16} /> </a>
              <a href="https://www.youtube.com/@growjebrandsolution" target="_blank" className="border rounded-full hover:bg-white hover:text-primary transition duration-300 p-2"> <RiYoutubeLine size={16} /> </a>
              <a href="https://www.google.com/search?sca_esv=7c95de8abde2ac06&sxsrf=AE3TifMV5OT9SLypZpFlDrbm957e8XOx-w:1766124870665&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E1CjJq40UvUoaBOxsDOn8v1FRxMxaGo7jg0_OPd4aADRh-QEazzrblYJjPnyhUzPPUZuDB0Rxi3MSd6QeJ1DV14G3BP5hH_zdZCOMsWsR8_zeKwIcg%3D%3D&q=Growje+-+Advertising+agency+Reviews&sa=X&ved=2ahUKEwiN7q3s_8iRAxWbd2wGHXaxFxYQ0bkNegQIKRAE&biw=1536&bih=738&dpr=1.25" target="_blank" className="border rounded-full hover:bg-white hover:text-primary transition duration-300 p-2"> <FaGoogle size={16} /> </a>
              <a href="https://wa.me/919625870021?text=Hello!%20I%20want%20to%20connect%20with%20you" target="_blank" className="border rounded-full hover:bg-white hover:text-primary transition duration-300 p-2"> <FaWhatsapp size={16} /> </a>
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Services
            </h3>

            <div className="flex flex-col gap-3">
              {services.map((service) => (
                <Link
                  key={service._id}
                  href={`/${service.slug}`}
                  className="text-sm text-white/60 hover:text-white transition"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Company
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/about-us"
                className="text-sm text-white/60 hover:text-white transition"
              >
                About
              </Link>

              <Link
                href="/portfolio"
                className="text-sm text-white/60 hover:text-white transition"
              >
                Portfolio
              </Link>

              <Link
                href="/blog"
                className="text-sm text-white/60 hover:text-white transition"
              >
                Blogs
              </Link>

              <Link
                href="/contact"
                className="text-sm text-white/60 hover:text-white transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Get in touch
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/60">
              <a
                href="mailto:support@growje.com"
                className="hover:text-white transition"
              >
                support@growje.com
              </a>

              <a
                href="tel:+919625870021"
                className="hover:text-white transition"
              >
                +91-9625870021
              </a>
              <a
                href="tel:+917982563993"
                className="hover:text-white transition"
              >
                +91-7982563993
              </a>
              <a
                href="tel:+918766363438"
                className="hover:text-white transition"
              >
                +91-8766363438
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} GROWJE. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-xs text-white/40 hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-white/40 hover:text-white transition"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}