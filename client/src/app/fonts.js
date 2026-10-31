import localFont from "next/font/local";

export const gadugi = localFont({
  src: [
    {
      path: "../../public/fonts/gadugi-normal.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/gadugi-bold.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/gadugi-gras.ttf",
      weight: "400",
      style: "italic", // or "normal" if it's just another bold
    },
  ],
  variable: "--font-gadugi",   // CSS variable
  display: "swap",
  fallback: ["system-ui", "arial"],
});