"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppPopup({
  phone = "919625870021",          // your number with country code (no + or spaces)
  message = "Hi! I came from your website.",
  position = "right",              // "right" | "left"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show tooltip after 2 seconds (optional)
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div
      className={`fixed bottom-6 z-50 flex flex-col items-end gap-3 ${
        position === "left" ? "left-6" : "right-6"
      }`}
    >
      {/* Tooltip / Popup */}
      {showTooltip && (
        <div
          className={`relative max-w-[220px] rounded-2xl bg-white px-4 py-3 text-sm text-gray-800 shadow-xl transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
          }`}
        >
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-600 hover:bg-gray-300 cursor-pointer"
          >
            ×
          </button>
          <p className="font-medium">Need help?</p>
          <p className="mt-1 text-xs text-gray-500">Chat with us on WhatsApp</p>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />

        {/* Pulse animation */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40"></span>
      </a>
    </div>
  );
}