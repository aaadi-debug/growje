import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/* ------------------------------------------------------------------
   TEAM DATA – replace with real members.
   specialName = the member's nickname / signature title
------------------------------------------------------------------- */
const team = [
    {
        id: 1,
        name: "Barsha",
        profession: "Hiring Manager",
        specialName: "HR",
        photo: "assets/images/team/barsha.jpeg",
        description:
            "Keeps the people, culture and team spirit moving together.Makes sure the right people find the right place to grow.",
    },
    {
        id: 2,
        name: "Yashika",
        profession: "Social Media Handler",
        specialName: "Trend Maker",
        photo: "assets/images/team/yashika.png",
        description:
            "Always one trend ahead and ready to turn it into content.Brings fresh ideas, relatable concepts and social-first energy.",
    },
    {
        id: 3,
        name: "Harsh",
        profession: "Graphic Designer",
        specialName: "Idea Illustrator",
        photo: "assets/images/team/harsh.png",
        description:
            "Turns ideas into visuals that actually speak.Brings creativity, concepts & fresh design energy to every project.",
    },
    {
        id: 4,
        name: "Meenakshi",
        profession: "Graphic Designer",
        specialName: "Visual Crafter",
        photo: "assets/images/team/meenakshi.png",
        description:
            "Crafts visuals that make brands look memorable and modern.From concepts to creatives, she adds her own visual touch.",
    },
    {
        id: 5,
        name: "Aditya",
        profession: "Website Developer",
        specialName: "Code Crafter",
        photo: "assets/images/team/aditya.png",
        description:
            "Turns creative ideas into websites that actually work.Blends clean code, smooth experiences and modern web design.",
    },
    {
        id: 6,
        name: "Pooja",
        profession: "Social Media Manager",
        specialName: "Social Strategist",
        photo: "assets/images/team/pooja.png",
        description:
            "Turns social media into stories people actually want to follow.Plans, creates and connects content with the right audience.",
    },
    {
        id: 7,
        name: "Sahil",
        profession: "Video Editor",
        specialName: "Edit Wizard",
        photo: "assets/images/team/sahil.png",
        description:
            "Where ordinary clips meet a little editing magic.Creates smooth, engaging edits that keep viewers watching.",
    },
    {
        id: 8,
        name: "Zaid",
        profession: "Video Editor 2",
        specialName: "Frame Blender",
        photo: "assets/images/team/zaid.png",
        description:
            "Turns raw footage into scroll-stopping stories.Plays with cuts, transitions and visuals to make every frame count.",
    },
    {
        id: 9,
        name: "Alok",
        profession: "Video Editor 3",
        specialName: "Edit Architect",
        photo: "assets/images/team/alok.png",
        description:
            "Builds stories frame by frame with precision and creativity.From pacing to transitions, every cut has a purpose.",
    }
];

/* ------------------------------------------------------------------
   MODAL
------------------------------------------------------------------- */
function TeamModal({ member, onClose }) {
    const [visible, setVisible] = useState(false);

    // trigger enter transition after mount
    useEffect(() => {
        const raf = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    const handleClose = useCallback(() => {
        setVisible(false);
        setTimeout(onClose, 200); // wait for exit transition
    }, [onClose]);

    // Esc to close + lock body scroll
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && handleClose();
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [handleClose]);

    return createPortal(
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 motion-reduce:transition-none ${visible ? "opacity-100" : "opacity-0"
                }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <div
                className={`relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-transform duration-200 motion-reduce:transition-none md:grid-cols-2 ${visible ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
                    }`}
            >
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                >
                    <X size={18} />
                </button>

                {/* Photo */}
                <div className="h-72 md:h-full">
                    <img
                        src={member.photo || "assets/images/no-image.jpeg"}
                        alt={member.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Details */}
                <div className="flex flex-col p-8 md:max-h-[90dvh] md:overflow-y-auto md:p-10">
                    <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        {member.specialName}
                    </span>

                    <h3
                        id="team-modal-title"
                        className="mt-5 text-3xl font-medium tracking-tight md:text-4xl"
                    >
                        {member.name}
                    </h3>
                    <p className="mt-1 text-base text-black/50">{member.profession}</p>

                    <div className="my-6 h-px w-full bg-black/10" />

                    <p className="text-base leading-relaxed text-black/70">
                        {member.description}
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
}

/* ------------------------------------------------------------------
   SECTION
------------------------------------------------------------------- */
export default function TeamSection() {
    const [selected, setSelected] = useState(null);

    return (
        <section className="relative text-white px-6 lg:px-10 py-16 lg:py-20 lg:pb-40 overflow-hidden bg-black">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-80"
                style={{
                    backgroundImage: "url('assets/images/home/services_bg.avif')", // ← change to your actual filename
                }}
            />

            <div className="relative z-10 mx-auto">
                {/* Header */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none mb-12 text-center text-white">
                    Meet the Makers
                </h2>

                {/* Cards */}
                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {team.map((member) => (
                        <button
                            key={member.id}
                            type="button"
                            onClick={() => setSelected(member)}
                            aria-haspopup="dialog"
                            className="group text-left focus:outline-none bg-white rounded-3xl cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-t-3xl bg-black/5 ring-primary ring-offset-4 group-focus-visible:ring-2 border-b border-gray-200">
                                <img
                                    src={member.photo || "assets/images/no-image.jpeg"}
                                    alt={member.name}
                                    loading="lazy"
                                    className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
                                />
                            </div>

                            <div className="mt-4 pb-3 px-4">
                                <h3 className="mt-1 text-xl font-medium tracking-tight text-black font-bold">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-black/50 font-bold">{member.specialName}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {selected && (
                <TeamModal member={selected} onClose={() => setSelected(null)} />
            )}
        </section>
    );
}
