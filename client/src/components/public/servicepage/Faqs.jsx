import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Faqs({ faqData }) {
    return (
        <>
            {faqData.length > 0 && (
                <section className="relative overflow-hidden px-6 lg:px-10 lg:py-16 md:py-12 py-6 bg-white">
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
                        <h2 className="text-3xl lg:text-5xl md:text-4xl tracking-tight text-center mb-10">
                            Frequently Asked Questions
                        </h2>

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

                    <div className="mt-10 flex items-center justify-center max-sm:flex-col gap-4 p-6 max-w-3xl mx-auto">
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
