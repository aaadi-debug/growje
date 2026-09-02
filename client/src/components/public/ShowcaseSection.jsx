// client/src/components/public/ShowcaseSection.jsx

import MediaRenderer from "./MediaRenderer";

export default function ShowcaseSection({
  section,
}) {
  if (!section) return null;

  const items = [...(section.items || [])].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  if (!items.length) {
    return null;
  }

  const columns =
    section.layout === "two-column"
      ? 2
      : section.layout === "three-column"
        ? 3
        : section.columns || 1;

  return (
    <section className="px-5 py-16 md:px-10 lg:px-16">
      {section.title && (
        <div className="mb-10">
          <h2 className="text-2xl font-medium md:text-4xl">
            {section.title}
          </h2>
        </div>
      )}

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: `${section.gap || 20}px`,
        }}
      >
        {items.map((item) => (
          <article
            key={item._id || `${item.title}-${item.order}`}
            className="min-w-0"
          >
            <div className="overflow-hidden">
              <MediaRenderer
                media={item.media}
                className="block h-auto w-full object-cover"
              />
            </div>

            {item.title && (
              <h3 className="mt-5 text-lg font-medium">
                {item.title}
              </h3>
            )}

            {item.description && (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">
                {item.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}