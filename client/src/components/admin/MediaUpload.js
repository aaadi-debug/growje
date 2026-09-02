"use client";

import { useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MediaUpload({
  value,
  onChange,
  accept = "image/*,.gif,.avif,.mp4,.webm,.mov",
  label = "Upload Media",
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // const handleUpload = async (event) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   setError("");
  //   setUploading(true);

  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     const response = await fetch(`${API_URL}/upload/media`, {
  //       method: "POST",
  //       credentials: "include",
  //       body: formData,
  //     });

  //     const text = await response.text();
  //     let data;

  //     try {
  //       data = JSON.parse(text);
  //     } catch {
  //       throw new Error(
  //         `Server returned non-JSON (status ${response.status})`
  //       );
  //     }

  //     if (!response.ok) {
  //       throw new Error(data.message || "Upload failed");
  //     }

  //     const file = data.file || {};
  //     const url = file.url || file.path || "";
  //     const resourceType = file.resourceType || file.resource_type || "";
  //     const format = file.format || "";

  //     onChange({
  //       type: getMediaType(resourceType, format, url),
  //       url,
  //       publicId: file.publicId || file.filename || "",
  //       originalName: file.originalName || file.originalname || "",
  //       format,
  //       width: file.width ?? null,
  //       height: file.height ?? null,
  //       bytes: file.bytes ?? null,
  //       alt: value?.alt || "",
  //       poster: value?.poster || "",
  //     });
  //     // onChange({
  //     //   type: getMediaType(data.file.resourceType, data.file.format),
  //     //   url: data.file.url,
  //     //   publicId: data.file.publicId,
  //     //   originalName: data.file.originalName,
  //     //   format: data.file.format,
  //     //   width: data.file.width,
  //     //   height: data.file.height,
  //     //   bytes: data.file.bytes,
  //     //   alt: value?.alt || "",
  //     //   poster: value?.poster || "",
  //     // });
  //   } catch (err) {
  //     console.error("Media upload error:", err);
  //     setError(err.message || "Upload failed");
  //   } finally {
  //     setUploading(false);
  //     if (inputRef.current) {
  //       inputRef.current.value = "";
  //     }
  //   }
  // };

  const handleUpload = async (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`${API_URL}/upload/media`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Server returned non-JSON (status ${response.status})`
        );
      }

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      const uploaded = data.file || {};
      const url = uploaded.url || uploaded.path || "";
      const resourceType =
        uploaded.resourceType || uploaded.resource_type || "";
      const format = uploaded.format || "";

      onChange({
        type: getMediaType(resourceType, format, url),
        url,
        publicId: uploaded.publicId || uploaded.filename || "",
        originalName:
          uploaded.originalName || uploaded.originalname || "",
        format,
        width: uploaded.width ?? null,
        height: uploaded.height ?? null,
        bytes: uploaded.bytes ?? null,
        alt: value?.alt || "",
        poster: value?.poster || "",
      });
    } catch (err) {
      console.error("Media upload error:", err);
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeMedia = () => {
    onChange({
      type: value?.type || "image",
      url: "",
      publicId: "",
      originalName: "",
      format: "",
      width: null,
      height: null,
      bytes: null,
      alt: value?.alt || "",
      poster: value?.poster || "",
    });
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {value?.url ? (
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-gray-100 p-4">{renderPreview(value)}</div>

          <div className="p-3 flex gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="border px-4 py-2 rounded-lg text-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {uploading && <Spinner />}
              {uploading ? "Uploading..." : "Replace"}
            </button>

            <button
              type="button"
              onClick={removeMedia}
              disabled={uploading}
              className="border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm disabled:opacity-50 cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed rounded-xl p-8 text-center hover:bg-gray-50 disabled:opacity-50 flex flex-col items-center justify-center gap-3 cursor-pointer"
        >
          {uploading ? (
            <>
              <Spinner size="lg" />
              <span className="text-sm text-gray-600">Uploading...</span>
            </>
          ) : (
            <span className="text-sm text-gray-600">Click to upload media</span>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleUpload}
        className="hidden"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function Spinner({ size = "sm" }) {
  const sizeClass = size === "lg" ? "h-8 w-8" : "h-4 w-4";

  return (
    <svg
      className={`animate-spin ${sizeClass} text-gray-700`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

// function getMediaType(resourceType, format) {
//   if (resourceType === "video") return "video";
//   if (format === "gif") return "gif";
//   return "image";
// }
function getMediaType(resourceType, format, url = "") {
  const fmt = (format || "").toLowerCase();
  const u = (url || "").toLowerCase();

  if (resourceType === "video") return "video";
  if (u.includes("/video/")) return "video";
  if (["mp4", "webm", "mov", "mkv", "m4v"].includes(fmt)) return "video";
  if (fmt === "gif" || u.endsWith(".gif")) return "gif";
  return "image";
}

// function renderPreview(media) {
//   if (media.type === "video") {
//     return (
//       <video
//         src={media.url}
//         controls
//         className="w-full max-h-[400px] object-contain"
//       />
//     );
//   }

//   return (
//     <img
//       src={media.url}
//       alt={media.originalName || media.alt || "Uploaded media"}
//       className="w-full max-h-[400px] object-contain"
//     />
//   );
// }
function renderPreview(media) {
  const isVideo =
    media.type === "video" ||
    (media.url || "").includes("/video/") ||
    ["mp4", "webm", "mov"].includes((media.format || "").toLowerCase());

  if (isVideo) {
    return (
      <video
        src={media.url}
        controls
        className="w-full max-h-[400px] object-contain bg-black"
      />
    );
  }

  return (
    <img
      src={media.url}
      alt={media.originalName || media.alt || "Uploaded media"}
      className="w-full max-h-[400px] object-contain"
    />
  );
}