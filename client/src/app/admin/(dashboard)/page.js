"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  BriefcaseBusiness,
  FileText,
  Users,
  ArrowRight,
  Plus,
  ExternalLink,
} from "lucide-react";

import { apiFetch } from "../../../services/api";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [projectsResponse, servicesResponse] = await Promise.all([
          apiFetch("/projects"),
          apiFetch("/services"),
        ]);

        setProjects(projectsResponse.projects || []);
        setServices(servicesResponse.services || []);
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
        setError(error.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const publishedServices = services.filter(
    (service) => service.status === "published"
  );

  const publishedProjects = projects.filter(
    (project) => project.status === "published"
  );

  const stats = [
    {
      title: "Projects",
      value: projects.length,
      description: `${publishedProjects.length} published`,
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      title: "Services",
      value: services.length,
      description: `${publishedServices.length} published`,
      icon: BriefcaseBusiness,
      href: "/admin/services",
    },
    {
      title: "Blogs",
      value: 0,
      description: "Published blogs",
      icon: FileText,
      href: "/admin/blogs",
    },
    {
      title: "Leads",
      value: 0,
      description: "Contact enquiries",
      icon: Users,
      href: "/admin/leads",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <p className="text-gray-500 text-sm">
            Welcome to your creative agency admin panel.
          </p>
        </div>

        {/* <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <Plus size={16} />
          New Project
        </Link> */}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="group rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <p className="mt-3 text-3xl font-bold">
                    {loading ? "—" : stat.value}
                  </p>

                  <p className="mt-2 text-sm text-gray-400">
                    {stat.description}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-100 p-3 transition group-hover:bg-black group-hover:text-white">
                  <Icon size={20} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

            {/* Quick Actions */}
      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Quick Actions</h2>

        <p className="text-gray-500 text-sm">
          Quickly manage your website content.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            <Plus size={16} />
            New Project
          </Link>

          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            <FolderKanban size={16} />
            Manage Projects
          </Link>

          <Link
            href="/admin/services"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            <BriefcaseBusiness size={16} />
            Manage Services
          </Link>

          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            <FileText size={16} />
            Manage Blogs
          </Link>

          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            <Users size={16} />
            View Leads
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b p-6">
            <div>
              <h2 className="text-lg font-semibold">Recent Projects</h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest projects added to your portfolio.
              </p>
            </div>

            <Link
              href="/admin/projects"
              className="text-sm font-medium text-gray-600 hover:text-black"
            >
              View all
            </Link>
          </div>

          <div className="p-6">
            {loading ? (
              <p className="text-sm text-gray-400">
                Loading projects...
              </p>
            ) : projects.length === 0 ? (
              <div className="py-8 text-center">
                <FolderKanban
                  size={32}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-3 text-sm text-gray-500">
                  No projects created yet.
                </p>

                <Link
                  href="/admin/projects/new"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm text-white"
                >
                  <Plus size={15} />
                  Create Project
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <div
                    key={project._id}
                    className="flex items-center justify-between gap-4 rounded-lg border p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {project.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {project.clientName || "No client name"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          project.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {project.status}
                      </span>

                      <Link
                        href={`/admin/projects/${project._id}/edit`}
                        className="text-gray-400 hover:text-black"
                        title="Edit project"
                      >
                        <ArrowRight size={17} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Services */}
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b p-6">
            <div>
              <h2 className="text-lg font-semibold">Services</h2>

              <p className="mt-1 text-sm text-gray-500">
                Services currently managed in your CMS.
              </p>
            </div>

            <Link
              href="/admin/services"
              className="text-sm font-medium text-gray-600 hover:text-black"
            >
              Manage
            </Link>
          </div>

          <div className="p-6">
            {loading ? (
              <p className="text-sm text-gray-400">
                Loading services...
              </p>
            ) : services.length === 0 ? (
              <div className="py-8 text-center">
                <BriefcaseBusiness
                  size={32}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-3 text-sm text-gray-500">
                  No services created yet.
                </p>

                <Link
                  href="/admin/services/new"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm text-white"
                >
                  <Plus size={15} />
                  Create Service
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {services.slice(0, 6).map((service) => (
                  <div
                    key={service._id}
                    className="flex items-center justify-between gap-4 rounded-lg border p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {service.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-500">
                        /{service.slug}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                        service.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}