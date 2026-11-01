"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TestimonialForm from "../../../../../../components/public/home/TestimonialForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditTestimonialPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTestimonial = async () => {
      try {
        const res = await fetch(`${API_URL}/testimonials/${id}`, {
          credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {
          alert(json.message || "Failed to load testimonial");
          router.push("/admin/testimonials");
          return;
        }

        setData(json.testimonial);
      } catch (err) {
        console.error(err);
        router.push("/admin/testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id, router]);

  if (loading) {
    return <div className="p-8">Loading testimonial...</div>;
  }

  if (!data) {
    return <div className="p-8">Testimonial not found</div>;
  }

  return (
    <TestimonialForm mode="edit" initialData={data} id={id} />
  );
}