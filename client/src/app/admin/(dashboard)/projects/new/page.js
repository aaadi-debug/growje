// client/src/app/admin/(dashboard)/projects/new/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "../../../../../components/admin/ProjectForm";
import { ArrowLeft, ChevronLeft } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreateProjectPage() {
  const router = useRouter();

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/services`, {
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setServices(data.services || []);
        }
      } catch (error) {
        console.error("Fetch Services Error:", error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = async (formData) => {
    if (!formData.title?.trim()) {
      alert("Project title is required");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          order: Number(formData.order) || 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create project");
        return;
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error("Create Project Error:", error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto relative p-8">
      <div className="mb-8 flex items-start justify-start gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          title="Back to Services"
          className="bg-black text-white p-2 rounded-full hover:bg-zinc-700 transition duration-300 cursor-pointer"
        >
          {/* <ArrowLeft size={16} /> */}
          <ChevronLeft size={16} />
        </button>

        <div>
          <h1 className="text-2xl font-bold">Create Project</h1>
          <p className="text-gray-500 text-sm">Build your portfolio project page.</p>
        </div>
      </div>

      {
        loadingServices ? (
          <p className="text-gray-500">Loading project...</p>
        ) : (
          <ProjectForm
            initialData={null}
            services={services}
            onSubmit={handleSubmit}
            saving={saving}
            submitText="Create Project"
          />
        )
      }
    </div >
  );
}