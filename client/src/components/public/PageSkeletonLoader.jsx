export default function PageSkeletonLoader() {
  return (
    <main className="bg-black text-black animate-pulse">
      {/* Hero Skeleton */}
      <section className="relative min-h-[60vh] md:min-h-[75vh] lg:min-h-screen flex items-end pb-16 bg-black">
        {/* <div className="w-full px-6 lg:px-12 space-y-5">
          Hero title
          <div className="h-10 md:h-16 lg:h-20 w-3/4 md:w-2/3 rounded-lg bg-gray-300" />

          Hero subtitle
          <div className="space-y-3 max-w-2xl">
            <div className="h-4 md:h-5 w-full rounded bg-gray-300" />
            <div className="h-4 md:h-5 w-4/5 rounded bg-gray-300" />
          </div>
        </div> */}
      </section>

      {/* Services Skeleton */}
      <section className="relative px-6 lg:px-10 py-10 md:py-12 lg:py-16 overflow-hidden">
        <div className="mx-auto px-2">
          {/* Section heading */}
          <div className="h-8 md:h-10 lg:h-12 w-56 md:w-72 mx-auto rounded-lg bg-gray-200 mb-8 md:mb-10" />

          {/* Service cards */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200"
              >
                {/* Simulated image gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200" />

                {/* Card title */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 space-y-3">
                  <div className="h-5 md:h-7 w-3/4 rounded bg-gray-400/50" />
                  <div className="h-5 md:h-7 w-1/2 rounded bg-gray-400/50" />
                </div>

                {/* Arrow button */}
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-400/40" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Skeleton */}
      <section className="px-6 lg:px-10 py-12 md:py-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gray-100 p-6 md:p-12 space-y-6">
          <div className="h-8 md:h-10 w-2/3 rounded bg-gray-200" />
          <div className="h-4 w-full max-w-xl rounded bg-gray-200" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-12 rounded-lg bg-gray-200"
              />
            ))}
          </div>

          <div className="h-12 w-40 rounded-lg bg-gray-300" />
        </div>
      </section>

      {/* About Skeleton */}
      <section className="px-6 lg:px-10 py-12 md:py-20">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="h-8 md:h-12 w-1/2 rounded-lg bg-gray-200" />

          <div className="grid md:grid-cols-2 gap-8">
            {[0, 1].map((column) => (
              <div key={column} className="space-y-3">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-5/6 rounded bg-gray-200" />
                <div className="h-4 w-4/6 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Skeleton */}
      <section className="px-6 lg:px-10 py-12 md:py-20">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="h-8 md:h-12 w-1/2 mx-auto rounded-lg bg-gray-200" />

          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-16 rounded-xl bg-gray-100 border border-gray-200"
            />
          ))}
        </div>
      </section>
    </main>
  );
}