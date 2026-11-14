"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TeamMemberForm from "@/components/admin/TeamMemberForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditTeamMemberPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMember = async () => {
      try {
        const res = await fetch(`${API_URL}/team/${id}`, {
          credentials: "include",
        });
        const json = await res.json();
        if (!res.ok) {
          alert(json.message || "Failed to load");
          router.push("/admin/team");
          return;
        }
        setData(json.member);
      } catch (err) {
        router.push("/admin/team");
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id, router]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!data) return <div className="p-8">Member not found</div>;

  return <TeamMemberForm mode="edit" initialData={data} id={id} />;
}