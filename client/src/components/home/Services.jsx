import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export default function Services({services}) {

    return (
        <>
            <section className="bg-black text-white px-6 lg:px-10 py-16 lg:py-24">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-20">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">
                            02 — What we do
                        </p>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none">
                            Services
                        </h2>
                    </div>

                    <p className="max-w-sm text-white/50 leading-relaxed lg:pt-10">
                        From strategy and branding to digital
                        experiences, we help businesses become
                        impossible to ignore.
                    </p>
                </div>

                <div className="border-t border-white/20">
                    {services.map((service, index) => (
                        <Link
                            href={`/${service.slug}`}
                            key={service._id}
                            className="
                                group
                                grid
                                grid-cols-12
                                gap-4
                                py-8
                                lg:py-10
                                border-b
                                border-white/20
                                items-center
                                hover:px-4
                                transition-all
                                duration-500
                            "
                        >
                            <span className="col-span-1 text-sm text-white/30">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="col-span-9 text-xl md:text-3xl lg:text-4xl tracking-tight">
                                {service.title}
                            </h3>
                            <span className="col-span-2 flex justify-end">
                                <span 
                                    className="
                                        w-10
                                        h-10
                                        lg:w-14
                                        lg:h-14
                                        rounded-full
                                        border
                                        border-white/30
                                        flex
                                        items-center
                                        justify-center
                                        group-hover:bg-white
                                        group-hover:text-black
                                        transition
                                    "
                                >
                                    <ArrowUpRight size={20} />
                                </span>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
