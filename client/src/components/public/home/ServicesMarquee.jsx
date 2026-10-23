export default function ServicesMarquee() {
  const animatedHorizontalServices = [
    { src: "/assets/images/home/clients/Bundela.png", alt: "Bundela" },
    { src: "/assets/images/home/clients/Centre_for_acivity.png", alt: "Centre for acivity" },
    { src: "/assets/images/home/clients/Chaurasia_store.png", alt: "Chaurasia store" },
    { src: "/assets/images/home/clients/Djt.png", alt: "Djt" },
    { src: "/assets/images/home/clients/Island_Life.png", alt: "Island Life" },
    { src: "/assets/images/home/clients/Paridhan.png", alt: "Paridhan" },
    { src: "/assets/images/home/clients/Pxil.png", alt: "Pxil" },
    { src: "/assets/images/home/clients/Ramleela.png", alt: "Ramleela" },
    { src: "/assets/images/home/clients/Tbi.png", alt: "Tbi" },
    { src: "/assets/images/home/clients/Zeo_tourism.png", alt: "Zeo tourism" },
    //repeat
    { src: "/assets/images/home/clients/Bundela.png", alt: "Bundela" },
    { src: "/assets/images/home/clients/Centre_for_acivity.png", alt: "Centre for acivity" },
    { src: "/assets/images/home/clients/Chaurasia_store.png", alt: "Chaurasia store" },
    { src: "/assets/images/home/clients/Djt.png", alt: "Djt" },
    { src: "/assets/images/home/clients/Island_Life.png", alt: "Island Life" },
    { src: "/assets/images/home/clients/Paridhan.png", alt: "Paridhan" },
    { src: "/assets/images/home/clients/Pxil.png", alt: "Pxil" },
    { src: "/assets/images/home/clients/Ramleela.png", alt: "Ramleela" },
    { src: "/assets/images/home/clients/Tbi.png", alt: "Tbi" },
    { src: "/assets/images/home/clients/Zeo_tourism.png", alt: "Zeo tourism" },
  ];

  return (
    <section className="border-b border-black/10 overflow-hidden">
      <div className="py-6 md:py-8 lg:py-10">
        <p className="px-5 md:px-6 lg:px-10 text-[11px] md:text-xs uppercase tracking-[0.2em] text-black/40 mb-6 md:mb-8">
          Our Clientele
        </p>

        <div className="relative flex overflow-hidden">
          <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] max-sm:animate-[marquee_10s_linear_infinite] hover:[animation-play-state:paused]">
            {animatedHorizontalServices.map((item, index) => (
              <div
                key={`${item.alt}-${index}`}
                className="flex items-center gap-2 md:gap-4 lg:gap-6 max-sm:mx-2 mx-5 md:mx-7 lg:mx-8 flex-shrink-0"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-40 max-sm:w-24 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}