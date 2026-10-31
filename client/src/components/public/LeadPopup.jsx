"use client";

import { useEffect, useState } from "react";
import { X, ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const initialForm = {
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
};

export default function LeadPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const [services, setServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);

    // Show popup after 3–5 seconds (only once per session)
    // Show popup after 3–5 seconds on every page load/refresh
    useEffect(() => {
        const delay = 3000 + Math.random() * 2000; // 3–5 seconds

        const timer = setTimeout(() => {
            setIsOpen(true);
        }, delay);

        return () => clearTimeout(timer);
    }, []);

    // Fetch services (same as contact page)
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
                console.error("Fetch Services Error:", error);
            } finally {
                setLoadingServices(false);
            }
        };

        fetchServices();
    }, []);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const validate = () => {
        const newErrors = {};
        const name = form.name.trim();
        const email = form.email.trim();
        const phone = form.phone.trim();
        const message = form.message.trim();

        if (!name) newErrors.name = "Please enter your name.";
        else if (name.length < 2) newErrors.name = "Name must be at least 2 characters.";
        else if (name.length > 80) newErrors.name = "Name must be less than 80 characters.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!email) newErrors.email = "Please enter your email address.";
        else if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address.";

        const phoneRegex = /^[0-9+\-\s()]{10,20}$/;
        if (!phone) newErrors.phone = "Please enter your phone number.";
        else if (!phoneRegex.test(phone)) newErrors.phone = "Please enter a valid phone number.";

        if (form.company.trim().length > 100) {
            newErrors.company = "Company name must be less than 100 characters.";
        }

        if (!form.service) {
            newErrors.service = services.length
                ? "Please select a service."
                : "No services are currently available.";
        }

        if (!message) newErrors.message = "Please tell us a little about your project.";
        else if (message.length < 20) newErrors.message = "Please enter at least 20 characters.";
        else if (message.length > 2000) newErrors.message = "Message must be less than 2000 characters.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
        if (status) setStatus("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("");

        if (!validate()) return;

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/leads`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to submit your enquiry.");
            }

            setForm(initialForm);
            setStatus("success");

            // Auto close after success
            setTimeout(() => setIsOpen(false), 2500);
        } catch (error) {
            console.error("Lead Popup Error:", error);
            setStatus(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
                {/* Close button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200  cursor-pointer"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                <div className="p-8 md:p-10">
                    {/* Header */}
                    <div className="mb-8 pr-10">
                        {/* <p className="mb-2 text-xs uppercase tracking-[0.2em] text-black/40">
                            Project enquiry
                        </p> */}
                        <h2 className="text-2xl md:text-3xl tracking-[-0.04em] leading-none">
                            Tell us about your project
                        </h2>
                        {/* <p className="mt-3 text-sm text-gray-500">
                            Fill the form and we’ll get back to you shortly.
                        </p> */}
                    </div>

                    {/* Success / Error messages */}
                    {status === "success" && (
                        <div className="mb-6 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
                            <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
                            <div>
                                <p className="font-semibold">Thanks for reaching out!</p>
                                <p className="mt-1 text-sm text-green-700">
                                    Your enquiry has been received. We’ll get back to you soon.
                                </p>
                            </div>
                        </div>
                    )}

                    {status && status !== "success" && (
                        <div className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
                            <AlertCircle className="mt-0.5 shrink-0" size={20} />
                            <p className="text-sm">{status}</p>
                        </div>
                    )}

                    {/* Form – same fields as Contact page */}
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        {/* Name + Email */}
                        <div className="grid gap-4 md:grid-cols-2">
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

                        {/* Phone + Company */}
                        <div className="grid gap-4 md:grid-cols-2">
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

                        {/* Service */}
                        <div>
                            <label htmlFor="service" className="mb-2 block text-xs font-medium">
                                What can we help with?
                                <span className="ml-1 text-red-500">*</span>
                            </label>
                            <select
                                id="service"
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                                disabled={loadingServices}
                                className={`w-full border-b bg-transparent px-0 py-2 text-base outline-none transition ${errors.service
                                        ? "border-red-500"
                                        : "border-black/20 focus:border-black"
                                    }`}
                            >
                                <option value="">
                                    {loadingServices ? "Loading services..." : "Select a service"}
                                </option>
                                {!loadingServices &&
                                    services.map((service) => (
                                        <option key={service._id} value={service.title}>
                                            {service.title}
                                        </option>
                                    ))}
                            </select>
                            {errors.service && (
                                <p className="mt-2 text-xs text-red-500">{errors.service}</p>
                            )}
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="mb-2 block text-xs font-medium">
                                Tell us about your project
                                <span className="ml-1 text-red-500">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={3}
                                maxLength={2000}
                                placeholder="Tell us about your business, project, goals..."
                                className={`w-full resize-none border-b bg-transparent px-0 py-2 text-base outline-none transition ${errors.message
                                        ? "border-red-500"
                                        : "border-black/20 focus:border-black"
                                    }`}
                            />
                            <div className="mt-2 flex justify-between">
                                {errors.message ? (
                                    <p className="text-xs text-red-500">{errors.message}</p>
                                ) : (
                                    <span />
                                )}
                                <span className="text-xs text-gray-400">
                                    {form.message.length}/2000
                                </span>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? "Sending..." : "Send enquiry"}
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
        </div>
    );
}

/* Reusable Form Field (same style as contact page) */
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
            <label htmlFor={name} className="mb-1 block text-xs font-medium">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full border-b bg-transparent px-0 py-2 text-base outline-none transition placeholder:text-gray-400 ${error ? "border-red-500" : "border-black/20 focus:border-black"
                    }`}
            />
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        </div>
    );
}