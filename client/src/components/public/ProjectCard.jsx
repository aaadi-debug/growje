import Link from "next/link";
import MediaRenderer from "./MediaRenderer";
import { gadugi } from "@/app/fonts";


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
        {/* <div
          className="
            absolute inset-0
            flex flex-col justify-end
            p-5
            bg-gradient-to-t from-black/80 via-black/40 to-transparent
            opacity-0
            transition-opacity duration-500
            group-hover:opacity-100
          "
        > */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-4">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          {project.workedOn?.[0] && (
            <div className="mt-2">
              <span className={`relative text-white 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-3xl text-2xl max-sm:text-base max-sm:leading-tight uppercase tracking-wider ${gadugi.variable}`}>
                {(() => {
                  const title = project.workedOn[0] || "";
                  const words = title.trim().split(/\s+/);

                  if (words.length === 1) {
                    return <span className="font-extrabold">{words[0]}</span>;
                  }

                  if (words.length === 2) {
                    return (
                      <>
                        <span className="font-extrabold block">{words[0]}</span>
                        <span className="font-medium block">{words[1]}</span>
                      </>
                    );
                  }

                  // 3+ words → first two words on line 1, rest on line 2
                  const firstLine = words.slice(0, 2).join(" ");
                  const secondLine = words.slice(2).join(" ");

                  return (
                    <>
                      <span className="font-extrabold block">{firstLine}</span>
                      <span className="font-medium block">{secondLine}</span>
                    </>
                  );
                })()}
              </span>
            </div>
          )}
        </div>
        {/* </div> */}
      </div>
    </Link>
  );
}