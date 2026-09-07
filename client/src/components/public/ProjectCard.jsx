// client/src/components/public/ProjectCard.jsx

import Link from "next/link";
import MediaRenderer from "./MediaRenderer";

export default function ProjectCard({ project }) {
  if (!project) return null;

  // Prefer cardImage, fallback to hero media
  const cardMedia = project.cardImage?.url
    ? project.cardImage
    : project.hero?.media;

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block"
    >
      <div className="overflow-hidden bg-zinc-100 rounded-[40px]">
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
      </div>

      {/* <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl font-medium">
            {project.title}
          </h3>

          {project.clientName && (
            <p className="mt-1 text-sm text-black/50">
              {project.clientName}
            </p>
          )}
        </div>

        {project.category && (
          <span className="text-xs uppercase tracking-wider text-black/40">
            {project.category}
          </span>
        )}
      </div> */}

      {/* {project.shortDescription && (
        <p className="mt-3 max-w-xl text-sm leading-6 text-black/60">
          {project.shortDescription}
        </p>
      )} */}
    </Link>
  );
}