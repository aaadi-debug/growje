"use client";

import { useState } from "react";

const budgetOptions = [
  "0 - 10,000",
  "10,000 - 25,000",
  "25,000 - 50,000",
  "50,000 - 1,00,000",
  "1,00,000 - 2,50,000",
  "2,50,000+",
];

const countryCodes = [
  { code: "+91", country: "IN" },
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
  { code: "+61", country: "AU" },
  { code: "+65", country: "SG" },
  { code: "+49", country: "DE" },
  { code: "+39", country: "IT" },
  { code: "+81", country: "JP" },
];

export default function ServiceForm({ service }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/leads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: `${formData.countryCode}${formData.phone}`,
            budget: formData.budget,
            message: formData.message,
            service: service.title,
            source: "Service Page",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        countryCode: "+91",
        phone: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="service_form" className="relative overflow-hidden px-6 lg:px-10 py-12 lg:py-24 bg-white">
      {/* Background */}
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.65]
        [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
        [background-size:48px_48px]" />

      <div className="relative z-10 px-2 max-sm:px-0 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left */}
          <div className="bg-white border border-primary/50 rounded-2xl p-6 md:p-8 shadow-sm">
            {success ? (
              <div className="text-center py-10">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-medium mb-2">Thank you!</h3>
                <p className="text-black/60">
                  We’ve received your request. Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-3xl font-semibold tracking-tight max-sm:text-2xl">
                  Tell us about your project
                </h2>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5 hidden">Full Name</label>
                    <input
                      id={formData.name}
                      name={formData.name}
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className={`w-full border-b bg-transparent px-0 py-4 text-base outline-none transition ${error
                        ? "border-red-500"
                        : "border-black/20 focus:border-black"
                        }`}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5 hidden">Email</label>
                    <input
                      id={formData.email}
                      name={formData.email}
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={`w-full border-b bg-transparent px-0 py-4 text-base outline-none transition ${error
                        ? "border-red-500"
                        : "border-black/20 focus:border-black"
                        }`}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 hidden">Phone Number</label>
                  <div className="flex gap-3">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-28 text-black/50 focus:text-black border-b border-black/15 px-3 py-3 bg-white focus:outline-none focus:border-black"
                    >
                      {countryCodes.map((item) => (
                        <option key={item.code} value={item.code}>
                           {item.country} ({item.code})
                        </option>
                      ))}
                    </select>
                    <input
                      id={formData.phone}
                      name={formData.phone}
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className={`w-full border-b bg-transparent px-0 py-4 text-base outline-none transition ${error
                        ? "border-red-500"
                        : "border-black/20 focus:border-black"
                        }`}
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 hidden">Estimated Budget</label>
                  <select
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full text-black/50 focus:text-black border-b border-black/15 px-3 py-3 bg-white focus:outline-none focus:border-black"
                  >
                    <option value="">Select budget range</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        ₹ {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-1.5 hidden">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us briefly about your project..."
                    className="w-full border-b border-black/15 px-4 py-3 focus:outline-none focus:border-black transition resize-none"
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full bg-primary text-white py-3.5 rounded-lg font-medium hover:bg-zinc-800 transition disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            )}
          </div>

          {/* Form */}
          <div className="lg:sticky lg:top-32">
            <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
              Get Started
            </p>
            <h2 className="text-lg max-sm:text-base text-black/60">
              {service.shortDescription || service.title}
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}