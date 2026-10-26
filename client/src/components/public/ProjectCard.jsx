import Link from "next/link";
import MediaRenderer from "./MediaRenderer";

export default function ProjectCard({ project }) {
  if (!project) return null;

  const cardMedia = project.cardImage?.url
    ? project.cardImage
    : project.hero?.media;

  return (
    <Link href={`/portfolio/${project.slug}`} className="group block">
      <div className="relative overflow-hidden bg-zinc-100 rounded-2xl">
        <div className="aspect-[3/4] overflow-hidden">
          {cardMedia?.url ? (
            <MediaRenderer
              media={cardMedia}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-zinc-200" />
          )}
        </div>

        {/* Overlay on hover */}
        <div
          className="
            absolute inset-0
            flex flex-col justify-end
            p-5
            bg-gradient-to-t from-black/80 via-black/40 to-transparent
            opacity-0
            transition-opacity duration-500
            group-hover:opacity-100
          "
        >
          {project.workedOn?.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.workedOn.slice(0, 1).map((item, index) => {
                const title = item || "";
                const spaceIndex = title.indexOf(" ");

                return (
                  <h3
                    key={`${item}-${index}`}
                    className="text-white text-base font-medium uppercase tracking-wider"
                  >
                    {spaceIndex === -1 ? (
                      title
                    ) : (
                      <>
                        <span className="font-extrabold block">
                          {title.slice(0, spaceIndex)}
                        </span>
                        <span className="font-medium block">
                          {title.slice(spaceIndex + 1)}
                        </span>
                      </>
                    )}
                  </h3>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}