// client/src/components/public/MediaRenderer.jsx

export default function MediaRenderer({
  media,
  className = "",
  priority = false,
}) {
  if (!media?.url) {
    return null;
  }

  const type = media.type || "image";

  if (type === "video") {
    return (
      <video
        src={media.url}
        poster={media.poster || undefined}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <img
      src={media.url}
      alt={media.alt || ""}
      className={className}
      loading={priority ? "eager" : "lazy"}
    />
  );
}