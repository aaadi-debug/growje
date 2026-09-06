export default function Services({ servicesData }) {

    return (
        <>
{servicesData?.items?.length > 0 && (
        <section className="relative bg-black/50 text-white px-6 lg:px-10 py-16 lg:py-24 overflow-hidden">
          {/* Soft background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-80"
            style={{
              backgroundImage: "url('assets/images/home/services_bg.avif')", // ← change to your actual filename
            }}
          />

          <div className="relative z-10 ">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-20 max-sm:mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">
                  SERVICES WE OFFER
                </p>
                <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none">
                  {servicesData.title}
                </h2>
              </div>

              <p className="max-w-sm text-white/50 leading-relaxed lg:pt-10">
                We measure success not just by projects delivered, but by the lasting impact we create for our partners.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {servicesData.items.map((item, index) => (
                <div
                  key={index}
                  className="group relative border border-white/10 rounded-3xl p-8 lg:p-10 
                         bg-white/[0.10] hover:bg-white/[0.05] 
                         transition-all duration-500 hover:border-white/20
                         hover:-translate-y-1"
                >
                  {/* Label */}
                  <h3 className="text-lg font-medium mb-2 text-white/90">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/40 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Subtle bottom line animation on hover */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent 
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
        </>
    )
}
