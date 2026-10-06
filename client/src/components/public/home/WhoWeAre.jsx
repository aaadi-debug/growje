import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import ScrollTextSection from "./ScrollTextSection";

export default function WhoAreWe() {

    return (
        <>
            <section className="relative overflow-hidden px-6 lg:px-10 py-16 lg:py-28">
                <div
                    className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
                    aria-hidden="true"
                />

                {/* Optional light grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.65]
                    [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
                    [background-size:48px_48px]"
                    aria-hidden="true"
                />

                <div className="relative z-10">
                    <ScrollTextSection />

                    <div className="flex justify-center">
                        <Link
                            href="/about-us"
                            className="
                                group
                                inline-flex
                                items-center
                                gap-3
                                mt-10
                                text-sm
                                font-medium
                                border-b
                                border-black
                                pb-2
                                relative
                                after:absolute
                                after:bottom-0
                                after:left-0
                                after:h-px
                                after:w-0
                                after:bg-primary
                                after:transition-all
                                after:duration-300
                                hover:after:w-full
                                hover:text-primary hover:border-primary
                            "
                        >
                            More of Our DNA
                            <ArrowUpRight
                                size={16}
                                className="transition-all duration-300 ease-out group-hover:rotate-45 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}