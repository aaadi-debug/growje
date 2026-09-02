'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { House, ArrowLeft } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    const handleGoHome = () => {
        router?.push('/');
    };

    const handleGoBack = () => {
        if (typeof window !== 'undefined') {
            window.history?.back();
        }
    };

    return (
        <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center p-4">
            <div
                className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
                aria-hidden="true"
            />

            {/* Optional light grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.65]
                    [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
                    [background-size:48px_48px]"
                aria-hidden="true"
            />

            <div className="text-center max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <h1 className="text-9xl font-bold text-primary">404</h1>
                    </div>
                </div>

                <h2 className="text-2xl font-medium text-onBackground mb-2">Page Not Found</h2>
                <p className="text-onBackground/70 mb-8">
                    The page you're looking for doesn't exist. Let's get you back!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleGoBack}
                        className="cursor-pointer inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors duration-200"
                    >
                        <ArrowLeft name="ArrowLeftIcon" size={16} />
                        Go Back
                    </button>

                    <button
                        onClick={handleGoHome}
                        className="cursor-pointer inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-colors duration-200"
                    >
                        <House name="HomeIcon" size={16} />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}