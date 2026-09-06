"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

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
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

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
        console.error("Fetch Contact Services Error:", error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const validate = () => {
    const newErrors = {};

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();

    if (!name) {
      newErrors.name = "Please enter your name.";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (name.length > 80) {
      newErrors.name = "Name must be less than 80 characters.";
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!email) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^[0-9+\-\s()]{10,20}$/;

    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (form.company.trim().length > 100) {
      newErrors.company =
        "Company name must be less than 100 characters.";
    }

    if (!form.service) {
      newErrors.service = services.length
        ? "Please select a service."
        : "No services are currently available.";
    }

    if (!message) {
      newErrors.message = "Please tell us a little about your project.";
    } else if (message.length < 20) {
      newErrors.message =
        "Please enter at least 20 characters.";
    } else if (message.length > 2000) {
      newErrors.message =
        "Message must be less than 2000 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }

    if (status) {
      setStatus("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("");

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit your enquiry."
        );
      }

      setForm(initialForm);

      setStatus("success");
    } catch (error) {
      console.error("Contact Form Error:", error);

      setStatus(
        error.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white text-black">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen flex lg:flex-row flex-col lg:justify-between justify-end lg:pb-20 pb-10">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

        {/* Background image */}
        <div
          className="absolute inset-0 bg-top bg-no-repeat"
          style={{
            backgroundImage: "url('assets/images/contact_hero_bg.png')", // ← change to your actual filename
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
              Contact GROWJE
            </p>
          </FadeUp>

          <FadeUp delay={100}>
            <h1 className="text-[clamp(2.5rem,6vw,6.8rem)] font-medium leading-[0.92] tracking-[-0.06em] text-white">
              Let's
              <span className="text-white/75"> Talk</span>
            </h1>
          </FadeUp>

        </div>

        {/* right */}
        <div className="relative flex flex-col justify-end lg:px-16 px-6">
          <FadeUp delay={200}>
            <p className="mt-10 max-sm:mt-6 max-w-xl lg:text-xl text-lg max-sm:text-base lg:font-semibold leading-relaxed text-white">
              Have a project, idea or business challenge in mind? Tell us about it. We'd love to hear what you're working on.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="">
        <div className="mx-auto grid gap-20 lg:grid-cols-[0.75fr_1.25fr]">
          {/* Left Side - CONTACT DETAILS */}
          <div className="px-6 lg:px-10 py-10 lg:py-16">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-5">
                  Get in touch
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.06em] leading-none">
                  Start a conversation
                </h2>
              </div>
            </div>

            <p className="mt-6 max-w-md leading-relaxed text-gray-500">
              Whether you need a new website, branding,
              digital marketing or a complete digital
              experience, we're here to help.
            </p>

            <div className="mt-12 space-y-8">
              <ContactDetail
                icon={Mail}
                label="Email"
                href="mailto:support@growje.com"
                value="support@growje.com"
              />

              <ContactDetail
                icon={Phone}
                label="Phone"
                href="tel:+919625870021"
                value="+91-9625870021"
              />

              <ContactDetail
                icon={Phone}
                label="Phone"
                href="tel:+917982563993"
                value="+91-7982563993"
              />

              <ContactDetail
                icon={Phone}
                label="Phone"
                href="tel:+918766363438"
                value="+91-8766363438"
              />

              <ContactDetail
                icon={MessageCircle}
                label="WhatsApp"
                href="https://wa.me/919625870021?text=Hello!%20I%20want%20to%20connect%20with%20you"
                value="Chat with us on WhatsApp"
              />
            </div>

            {/* SOCIALS */}
            <div className="mt-14 border-t pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Follow us
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <SocialLink
                  href="https://www.facebook.com/GrowjeBrandingSolution/"
                  label="Facebook"
                />

                <SocialLink
                  href="https://www.instagram.com/growjebrandsolution/"
                  label="Instagram"
                />

                <SocialLink
                  href="https://www.youtube.com/@growjebrandsolution"
                  label="YouTube"
                />

                <SocialLink
                  href="https://www.google.com/search?q=Growje+Advertising+agency+Reviews"
                  label="Google"
                />
              </div>
            </div>
          </div>

          {/* Right Side - FORM */}
          <div className="border bg-gray-100 px-6 lg:px-10 py-10 lg:py-16">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-5">
                  Project enquiry
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.06em] leading-none">
                  Tell us about your project
                </h2>
              </div>
            </div>

            {status === "success" && (
              <div className="mb-8 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-5 text-green-800">
                <CheckCircle2 className="mt-0.5 shrink-0" size={20} />

                <div>
                  <p className="font-semibold">
                    Thanks for reaching out!
                  </p>

                  <p className="mt-1 text-sm text-green-700">
                    Your enquiry has been received. We'll get
                    back to you soon.
                  </p>
                </div>
              </div>
            )}

            {status &&
              status !== "success" && (
                <div className="mb-8 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-5 text-red-800">
                  <AlertCircle
                    className="mt-0.5 shrink-0"
                    size={20}
                  />

                  <p className="text-sm">
                    {status}
                  </p>
                </div>
              )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-7"
            >
              {/* NAME + EMAIL */}
              <div className="grid gap-7 md:grid-cols-2">
                <FormField
                  label="Your name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="John Doe"
                  required
                />

                <FormField
                  label="Email address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="john@example.com"
                  required
                />
              </div>

              {/* PHONE + COMPANY */}
              <div className="grid gap-7 md:grid-cols-2">
                <FormField
                  label="Phone number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="+91 98765 43210"
                  required
                />

                <FormField
                  label="Company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  error={errors.company}
                  placeholder="Your company"
                />
              </div>

              {/* SERVICE */}
              <div>
                <label
                  htmlFor="service"
                  className="mb-2 block text-sm font-medium"
                >
                  What can we help with?
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  disabled={loadingServices}
                  className={`w-full border-b bg-transparent px-0 py-4 text-base outline-none transition ${errors.service
                    ? "border-red-500"
                    : "border-black/20 focus:border-black"
                    }`}
                >
                  <option value="">
                    {loadingServices
                      ? "Loading services..."
                      : "Select a service"}
                  </option>

                  {!loadingServices &&
                    services.map((service) => (
                      <option
                        key={service._id}
                        value={service.title}
                      >
                        {service.title}
                      </option>
                    ))}
                </select>

                {errors.service && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.service}
                  </p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Tell us about your project
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  maxLength={2000}
                  placeholder="Tell us about your business, project, goals and what you're looking to build..."
                  className={`w-full resize-none border-b bg-transparent px-0 py-4 text-base outline-none transition ${errors.message
                    ? "border-red-500"
                    : "border-black/20 focus:border-black"
                    }`}
                />

                <div className="mt-2 flex justify-between">
                  {errors.message ? (
                    <p className="text-xs text-red-500">
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}

                  <span className="text-xs text-gray-400">
                    {form.message.length}/2000
                  </span>
                </div>
              </div>

              {/* SUBMIT */}
              <div className="-mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-4 rounded-full bg-primary px-7 py-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Sending..."
                    : "Send enquiry"}

                  {!loading && (
                    <ArrowUpRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative overflow-hidden text-black px-6 lg:px-10 py-16 lg:py-24">
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

        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-8">
              Prefer WhatsApp?
            </p>

            <h2 className="text-5xl md:text-7xl lg:text-[9rem] text-primary leading-[0.82] tracking-[-0.07em]">
              Let's
              <br />
              chat on
              <br />
              <span className="italic font-serif">
                WhatsApp.
              </span>
            </h2>
          </div>

          <div>
            <a
              href="https://wa.me/919625870021?text=Hello!%20I%20want%20to%20connect%20with%20you"
              target="_blank"
              rel="noopener noreferrer"
              className="
                            inline-flex
                            items-center
                            gap-4
                            mt-14
                            max-sm:mt-2
                            border
                            border-black
                            rounded-full
                            px-8
                            max-sm:px-6
                            py-5
                            max-sm:py-3
                            max-sm:text-sm
                            hover:bg-black
                            hover:text-white
                            transition
                        "
            >
              Open WhatsApp
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* CONTACT DETAIL */

function ContactDetail({
  icon: Icon,
  label,
  value,
  href,
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={
        href.startsWith("http")
          ? "noopener noreferrer"
          : undefined
      }
      className="group flex items-start gap-4"
    >
      <div className="rounded-full border p-3 transition group-hover:bg-black group-hover:text-white">
        <Icon size={18} strokeWidth={1.7} />
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-gray-400">
          {label}
        </p>

        <p className="mt-1 font-medium">
          {value}
        </p>
      </div>
    </a>
  );
}

/* FORM FIELD */

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border-b bg-transparent px-0 py-4 text-base outline-none transition placeholder:text-gray-400 ${error
          ? "border-red-500"
          : "border-black/20 focus:border-black"
          }`}
      />

      {error && (
        <p className="mt-2 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

/* SOCIAL LINK */

function SocialLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-black/10 px-5 py-2.5 text-sm transition hover:bg-black hover:text-white"
    >
      {label}
    </a>
  );
}