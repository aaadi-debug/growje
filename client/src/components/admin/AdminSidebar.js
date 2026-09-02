"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../../public/assets/images/logo-growje.png";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
  },
  {
    name: "Services",
    href: "/admin/services",
  },
  {
    name: "Projects",
    href: "/admin/projects",
  },
  {
    name: "Blogs",
    href: "/admin/blogs",
  },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
  },
  {
    name: "Clients",
    href: "/admin/clients",
  },
  {
    name: "Leads",
    href: "/admin/leads",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-primary">
      {/* Logo */}
      <div className="flex py-3 items-center border-b border-white px-6 bg-[#0364A1]">
        <Link
          href="/admin"
          className="bg-white rounded"
        >
          <Image
            src={Logo}
            width={100}
            height={100}
            className="border p-1 w-30 rounded"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded px-4 py-3 text-sm font-medium transition ${isActive
                    ? "bg-white text-black"
                    : "text-white hover:bg-gray-100 hover:text-black"
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-white">
        <Link
          href="/"
          target="_blank"
          className="block px-4 py-3 text-sm text-white hover:bg-gray-100 hover:text-black trasition duration-300"
        >
          View Website ↗
        </Link>
      </div>
    </aside>
  );
}