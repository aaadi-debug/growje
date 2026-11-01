
import Image from "next/image";
import HeroVideo from "./HeroVideo";

export default function HeroSection() {
    return (
        <section className="relative min-h-[60vh] md:min-h-[75vh] lg:min-h-screen overflow-hidden bg-black text-white">

            <Image
                src="/assets/images/home/home_video_thumb.webp"
                alt=""
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                quality={75}
                className="object-cover"
            />

            <HeroVideo />

            <div className="absolute inset-0 bg-black/30" />

            {/* Keep your existing hero content here */}

        </section>
    );
}
