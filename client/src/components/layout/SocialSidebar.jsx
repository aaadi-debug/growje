"use client";

import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaBehance,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/growjebrandsolution/",
    icon: FaInstagram,
    color: "hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/growje",
    icon: FaLinkedinIn,
    color: "hover:bg-[#0A66C2]",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/GrowjeBrandingSolution/",
    icon: FaFacebookF,
    color: "hover:bg-[#1877F2]",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@growjebrandsolution",
    icon: FaYoutube,
    color: "hover:bg-[#FF0000]",
  },
  {
    name: "Twitter / X",
    href: "https://x.com/growje63555",
    icon: FaTwitter,
    color: "hover:bg-black",
  },
  // Optional extra
  // {
  //   name: "Behance",
  //   href: "https://behance.net/yourprofile",
  //   icon: FaBehance,
  //   color: "hover:bg-[#1769FF]",
  // },
];

export default function SocialSidebar() {
  return (
    <div className="fixed right-0 top-1/2 z-40 -translate-y-1/2">
      <div className="flex flex-col items-center gap-1 rounded-l-2xl bg-primary/80 py-3 pl-2 pr-1.5 backdrop-blur-md shadow-xl border border-white/10 border-r-0">
        {socialLinks.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-xl text-white transition-all duration-300 hover:scale-110 ${item.color}`}
            >
              <Icon className="text-lg" />

              {/* Tooltip */}
              <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
                {item.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}