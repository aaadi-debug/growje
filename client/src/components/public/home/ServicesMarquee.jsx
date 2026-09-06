export default function ServicesMarquee() {
  const animatedHorizontalServices = [
    "Digital Marketing",
    "Website UI/UX",
    "Brand Consultancy",
    "Web/Mobile Application",
    "Live Videos",
    "2D/3D Animations",
    "PR (Public Relations)",
    // repeat for seamless loop
    "Digital Marketing",
    "Website UI/UX",
    "Brand Consultancy",
    "Web/Mobile Application",
    "Live Videos",
    "2D/3D Animations",
    "PR (Public Relations)",
  ];

  return (
    <section className="border-b border-black/10 overflow-hidden">
      <div className="py-6 md:py-8 lg:py-10">
        <p className="px-5 md:px-6 lg:px-10 text-[11px] md:text-xs uppercase tracking-[0.2em] text-black/40 mb-6 md:mb-8">
          SERVICES WE OFFER
        </p>

        <div className="relative flex overflow-hidden">
          <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
            {animatedHorizontalServices.map((service, index) => (
              <div
                key={`${service}-${index}`}
                className="flex items-center gap-6 md:gap-8 lg:gap-10 mx-5 md:mx-7 lg:mx-8"
              >
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-primary">
                  {service}
                </span>
                <span className="text-xl md:text-2xl text-black/80">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}