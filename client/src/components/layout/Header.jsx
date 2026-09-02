"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "../../../public/assets/images/logo-growje.png";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [services, setServices] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // setScrolled(window.scrollY > 50);
            const hero = document.getElementById("home-hero");
            let threshold = 50; // default for all other pages

            if (hero) {
                // Stay transparent until the whole 350vh section has been scrolled past
                threshold = Math.max(hero.offsetHeight - window.innerHeight, 50);
            }

            setScrolled(window.scrollY > threshold);
        };

        handleScroll(); // run once on mount

        // window.addEventListener("scroll", handleScroll);

        // return () => {
        //     window.removeEventListener("scroll", handleScroll);
        // };
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll); // recalculate on resize

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

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
                console.error("Fetch Header Services Error:", error);
            }
        };

        fetchServices();
    }, []);

    // console.log("Services: ", services)

    return (
        <header
            className={`
                fixed
                top-0
                left-0
                right-0
                z-50
                transition-all
                duration-300
                ${scrolled
                    ? "bg-white text-black shadow-sm"
                    : "bg-transparent text-white"
                }
            `}
        >
            <div className="mx-auto px-6 lg:px-10">
                <div className="h-20 flex items-center justify-between">
                    {/* LOGO */}
                    <Link
                        href="/"
                        className="text-2xl font-bold tracking-tight"
                    >
                        <Image
                            src={Logo}
                            width={100}
                            height={100}
                            className="border p-1 w-40 rounded"
                        />
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden lg:flex items-center gap-8">

                        <Link
                            href="/"
                            className="text-sm font-medium hover:opacity-60 transition"
                        >
                            Home
                        </Link>

                        <Link
                            href="/about-us"
                            className="text-sm font-medium hover:opacity-60 transition"
                        >
                            About Us
                        </Link>

                        {/* SERVICES */}
                        <div
                            className="relative"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <button
                                type="button"
                                className="flex items-center gap-1 text-sm font-medium hover:opacity-60 transition cursor-pointer"
                            >
                                Services
                                <ChevronDown size={15} />
                            </button>

                            {servicesOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                                    <div
                                        className={`
                                            w-80
                                            rounded-xl
                                            shadow-xl
                                            p-1
                                            ${scrolled
                                                ? "bg-white text-black border border-gray-100"
                                                : "bg-black text-white border border-black"
                                            }
                                        `}
                                    >
                                        {services.length > 0 ? (
                                            <div className="flex flex-col">
                                                {services.map((service) => (
                                                    <Link
                                                        key={service._id}
                                                        href={`/${service.slug}`}
                                                        className="
                                                            px-4
                                                            py-3
                                                            rounded-lg
                                                            text-sm
                                                            hover:bg-primary
                                                            hover:text-white
                                                            transition
                                                            "
                                                    >
                                                        {service.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm opacity-60 px-4 py-3">
                                                No services available
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/blogs"
                            className="text-sm font-medium hover:opacity-60 transition"
                        >
                            Blogs
                        </Link>

                        <Link
                            href="/careers"
                            className="text-sm font-medium hover:opacity-60 transition"
                        >
                            Careers
                        </Link>
                    </nav>

                    <div className="lg:block hidden">
                        <div className="flex gap-6 justify-end items-center">
                            <Link href="tel:+919625870021" className={`rounded-full px-6 py-2 hover:bg-primary trasition duration-300
                            ${scrolled ? "bg-black text-white" : "bg-white text-black hover:text-white"}`}
                            >
                                Call Now
                            </Link>
                            <Link href="/contact-us" className={`rounded-full px-6 py-2 hover:bg-primary trasition duration-300 
                            ${scrolled ? "bg-black text-white" : "bg-white text-black hover:text-white"}`}
                            >
                                Request A Quote
                            </Link>
                        </div>
                    </div>

                    {/* MOBILE BUTTON */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden"
                    >
                        {mobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {mobileMenuOpen && (
                <div
                    className={`
                        lg:hidden
                        border-t
                        ${scrolled
                            ? "bg-white text-black border-gray-200"
                            : "bg-black text-white border-white/20"
                        }
                    `}
                >
                    <nav className="px-6 py-6 flex flex-col gap-5">

                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>

                        <div>
                            <button
                                type="button"
                                onClick={() => setServicesOpen(!servicesOpen)}
                                className="flex items-center gap-2"
                            >
                                Services
                                <ChevronDown size={16} />
                            </button>

                            {servicesOpen && (
                                <div className="mt-4 ml-4 flex flex-col gap-4">
                                    {services.map((service) => (
                                        <Link
                                            key={service._id}
                                            href={`/${service.slug}`}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-sm opacity-80"
                                        >
                                            {service.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            href="/portfolio"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Portfolio
                        </Link>

                        <Link
                            href="/about"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>

                        <Link
                            href="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>

                    </nav>
                </div>
            )}
        </header>
    );
}