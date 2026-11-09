"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ClientForm from "@/components/admin/ClientForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditClientPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchClient = async () => {
      try {
        const res = await fetch(`${API_URL}/clients/${id}`, {
          credentials: "include",
        });
        const json = await res.json();
        if (!res.ok) {
          alert(json.message || "Failed to load");
          router.push("/admin/clients");
          return;
        }
        setData(json.client);
      } catch (err) {
        router.push("/admin/clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id, router]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!data) return <div className="p-8">Client not found</div>;

  return <ClientForm mode="edit" initialData={data} id={id} />;
}