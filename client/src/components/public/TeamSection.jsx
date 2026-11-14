"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function TeamModal({ member, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

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

  const photo = member.photo?.url || "/assets/images/no-image.jpeg";

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        className={`relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-transform duration-200 motion-reduce:transition-none md:grid-cols-2 ${
          visible ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
        }`}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow transition hover:bg-white cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="h-72 md:h-full">
          <img
            src={photo}
            alt={member.photo?.alt || member.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col p-8 md:max-h-[90dvh] md:overflow-y-auto md:p-10">
          {member.specialName && (
            <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {member.specialName}
            </span>
          )}

          <h3
            id="team-modal-title"
            className="mt-5 text-3xl font-medium tracking-tight md:text-4xl"
          >
            {member.name}
          </h3>
          {member.profession && (
            <p className="mt-1 text-base text-black/50">{member.profession}</p>
          )}

          <div className="my-6 h-px w-full bg-black/10" />

          {member.description && (
            <p className="text-base leading-relaxed text-black/70">
              {member.description}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_URL}/team/public`);
        const data = await res.json();
        if (data.success) setTeam(data.members || []);
      } catch (err) {
        console.error("Fetch Team Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section className="px-6 lg:px-10 py-16 text-center text-white/50 bg-black">
        Loading team...
      </section>
    );
  }

  if (team.length === 0) return "No details found";

  return (
    <section className="relative text-white px-6 lg:px-10 lg:py-16 md:py-12 py-6 overflow-hidden bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-80"
        style={{
          backgroundImage: "url('/assets/images/home/services_bg.avif')",
        }}
      />

      <div className="relative z-10 mx-auto">
        <h2 className="text-3xl lg:text-5xl md:text-4xl tracking-tight text-center mb-6">
          Meet the Makers
        </h2>

        <div className="mt-14 grid gap-6 max-sm:gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {team.map((member) => (
            <button
              key={member._id}
              type="button"
              onClick={() => setSelected(member)}
              aria-haspopup="dialog"
              className="group text-left focus:outline-none bg-white rounded-2xl max-sm:rounded cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-t-2xl max-sm:rounded-t bg-black/5 border-b border-gray-200">
                <img
                  src={member.photo?.url || "/assets/images/no-image.jpeg"}
                  alt={member.photo?.alt || member.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-4 pb-3 px-4 max-sm:px-2 max-sm:mt-2">
                <h3 className="mt-1 text-xl font-medium tracking-tight text-black font-bold max-sm:text-lg">
                  {member.name}
                </h3>
                {member.specialName && (
                  <p className="text-sm text-black/50 font-bold max-sm:font-medium">
                    {member.specialName}
                  </p>
                )}
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