import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LetsTalk() {
    return (
        <>
            <section className="relative overflow-hidden text-black px-6 lg:px-10 py-16 lg:py-24">
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

                <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-8">
                            Have a project in mind?
                        </p>

                        <h2 className="text-5xl md:text-7xl lg:text-[9rem] text-primary leading-[0.82] tracking-[-0.07em]">
                            Let's make
                            <br />
                            something
                            <br />
                            <span className="italic font-serif">
                                unforgettable.
                            </span>
                        </h2>
                    </div>

                    <div>
                        <Link
                            href="/contact-us"
                            className="
                            inline-flex
                            items-center
                            gap-4
                            mt-14
                            max-sm:mt-2
                            border
                            border-black
                            rounded-full
                            px-8
                            max-sm:px-6
                            py-5
                            max-sm:py-3
                            max-sm:text-sm
                            hover:bg-black
                            hover:text-white
                            transition
                        "
                        >
                            Start a conversation
                            <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
