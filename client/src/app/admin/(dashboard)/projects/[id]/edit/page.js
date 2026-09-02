// client/src/app/admin/(dashboard)/project/[id]/edit/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft } from "lucide-react"

import ProjectForm from "../../../../../../components/admin/ProjectForm";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = params.id;

  const [project, setProject] =
    useState(null);

  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  // =====================================
  // FETCH PROJECT + SERVICES
  // =====================================

  useEffect(() => {
    if (!projectId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          projectResponse,
          servicesResponse,
        ] = await Promise.all([
          fetch(
            `${API_URL}/projects/${projectId}`,
            {
              credentials: "include",
            }
          ),

          fetch(
            `${API_URL}/services`,
            {
              credentials: "include",
            }
          ),
        ]);

        const projectData =
          await projectResponse.json();

        const servicesData =
          await servicesResponse.json();

        if (!projectResponse.ok) {
          throw new Error(
            projectData.message ||
            "Failed to fetch project"
          );
        }

        setProject(
          projectData.project
        );

        if (servicesData.success) {
          setServices(
            servicesData.services
          );
        }
      } catch (error) {
        console.error(
          "Edit Project Load Error:",
          error
        );

        alert(
          error.message ||
          "Failed to load project"
        );

        router.push(
          "/admin/projects"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, router]);

  // =====================================
  // UPDATE PROJECT
  // =====================================

  const handleSubmit = async (
    formData
  ) => {
    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/projects/${projectId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            ...formData,

            order: Number(
              formData.order
            ),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
          "Failed to update project"
        );

        return;
      }

      alert(
        "Project updated successfully"
      );

      router.push(
        "/admin/projects"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Update Project Error:",
        error
      );

      alert(
        "Something went wrong while updating the project"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-500">
          Loading project...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-8">
        <p className="text-red-500">
          Project not found.
        </p>
      </div>
    );
  }

  // =====================================
  // PAGE
  // =====================================

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
          <h1 className="text-2xl font-bold">Edit Project</h1>
          <p className="text-gray-500 text-sm">Update "{project.title}"</p>
        </div>
      </div>

      <ProjectForm
        initialData={project}
        services={services}
        onSubmit={handleSubmit}
        saving={saving}
        submitText="Update Project"
      />
    </div>
  );
}