// client/src/components/public/ClientMarquee.jsx

"use client";

export default function ClientMarquee({ clients = [] }) {
  if (!clients.length) {
    return null;
  }

  const items = [...clients, ...clients];

  return (
    <section className="overflow-hidden border-y border-black/10 py-5">
      <div className="flex w-max animate-[marquee_50s_linear_infinite]">
        {items.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="flex items-center"
          >
            <span className="mx-8 whitespace-nowrap lg:text-3xl md:text-lg text-base uppercase tracking-[0.2em] text-primary font-extrabold">
              {client.name}
            </span>

            <span className="text-black/60">✦✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}