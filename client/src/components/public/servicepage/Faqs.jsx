import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Faqs({ faqData }) {
    return (
        <>
            {faqData.length > 0 && (
                <section className="relative overflow-hidden px-6 lg:px-10 py-6 lg:py-10 lg:pb-20 pb-16 bg-white">
                    {/* Soft blobs */}
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

                    <div className="relative max-w-5xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-16 max-sm:mb-10">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-5">
                                    Services We Offer
                                </p>
                                <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none">
                                    Frequently Asked Questions
                                </h2>
                            </div>

                            {/* <p className="max-w-sm text-white/50 leading-relaxed lg:pt-10">
                                We measure success not just by projects delivered, but by the lasting impact we create for our partners.
                                </p> */}
                        </div>

                        <div className="space-y-6">
                            {faqData.map((faq, index) => (
                                <details
                                    key={index}
                                    className="group border-b border-primary pb-6"
                                >
                                    <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium text-primary">
                                        {faq.question}
                                        <span className="ml-4 text-primary group-open:rotate-45 transition">
                                            +
                                        </span>
                                    </summary>
                                    <p className="mt-4 text-black/70 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 flex items-center justify-center max-sm:flex-col gap-4 border border-primary rounded-full max-sm:rounded-2xl p-6 bg-primary/10 max-w-3xl mx-auto">
                        <p className="text-2xl">Have a project in mind?</p>
                        <Link
                            href="#service_form"
                            className="group flex items-center gap-3 text-sm font-medium border-b border-black pb-2 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:text-primary hover:border-primary"
                        >
                            Start A Conversation
                            <ArrowUpRight
                                size={16}
                                className="transition-all duration-300 ease-out group-hover:rotate-45 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </section>
            )}
        </>
    )
}
