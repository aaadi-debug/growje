import Link from "next/link";
import {
  ArrowUpRight,
  Target,
  Lightbulb,
  Layers3,
  Users,
  Sparkles,
} from "lucide-react";

const values = [
  {
    number: "01",
    icon: Target,
    title: "Purpose First",
    description:
      "Every project starts with understanding the problem, the audience and the bigger business objective.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Ideas That Matter",
    description:
      "We combine strategy, creativity and technology to turn ideas into digital experiences people remember.",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Built End to End",
    description:
      "From branding and design to websites and digital experiences, we bring everything together under one roof.",
  },
  {
    number: "04",
    icon: Users,
    title: "Built Together",
    description:
      "We work closely with our clients, treating every collaboration as a partnership rather than a handoff.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="bg-white text-black">
      {/* HERO */}
      <section className="relative min-h-[85vh] overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 lg:px-10 lg:pb-24">
          <p className="mb-8 text-sm font-medium uppercase tracking-[0.25em] text-white/50">
            About GROWJE
          </p>

          <h1 className="max-w-6xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
            We build brands
            <br />
            <span className="text-white/40">people remember.</span>
          </h1>

          <div className="mt-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <p className="max-w-2xl text-lg leading-relaxed text-white/60 lg:text-xl">
              GROWJE is a creative digital agency focused on building
              meaningful brands, digital experiences and technology that
              helps businesses move forward.
            </p>

            <Link
              href="/contact"
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/30 px-6 py-3 text-sm transition hover:bg-white hover:text-black"
            >
              Start a conversation
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Who we are
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Creative thinking meets digital execution.
            </h2>

            <div className="mt-10 max-w-3xl space-y-6 text-lg leading-relaxed text-gray-600">
              <p>
                We believe great digital work isn't just about making
                something look good. It should communicate clearly, solve
                real problems and create measurable value.
              </p>

              <p>
                At GROWJE, designers, developers, strategists and creative
                thinkers work together to create digital experiences that
                connect brands with people.
              </p>

              <p>
                Whether you're building something from scratch or looking
                to transform an existing brand, we bring strategy,
                creativity and technology together to make it happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS / STATEMENT */}
      <section className="bg-zinc-100 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <p className="text-6xl font-semibold tracking-tight">01</p>
              <p className="mt-4 max-w-xs text-gray-500">
                Understand the business before designing the solution.
              </p>
            </div>

            <div>
              <p className="text-6xl font-semibold tracking-tight">02</p>
              <p className="mt-4 max-w-xs text-gray-500">
                Create experiences that are simple, memorable and useful.
              </p>
            </div>

            <div>
              <p className="text-6xl font-semibold tracking-tight">03</p>
              <p className="mt-4 max-w-xs text-gray-500">
                Build technology that turns creative ideas into reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-6 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              What drives us
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Our way of working.
            </h2>
          </div>

          <div className="grid border-l border-t border-black/10 md:grid-cols-2">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="group border-b border-r border-black/10 p-8 transition hover:bg-black hover:text-white lg:p-12"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-gray-400 group-hover:text-white/40">
                      {item.number}
                    </span>

                    <Icon
                      size={25}
                      strokeWidth={1.5}
                      className="text-gray-400 transition group-hover:text-white"
                    />
                  </div>

                  <h3 className="mt-16 text-2xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-5 max-w-md leading-relaxed text-gray-500 group-hover:text-white/60">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black px-6 py-28 text-white lg:px-10 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <Sparkles size={32} strokeWidth={1.5} className="mb-10" />

          <h2 className="max-w-5xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-8xl">
            Have an idea?
            <br />
            Let's make it real.
          </h2>

          <Link
            href="/contact-us"
            className="group mt-12 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:bg-gray-200"
          >
            Talk to us
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}