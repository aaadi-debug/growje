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
  Mail,
  Phone,
  Clock3,
  ExternalLink,
  Circle,
} from "lucide-react";

import { apiFetch } from "../../../services/api";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [leads, setLeads] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [projectsResponse, servicesResponse, leadsResponse] =
        await Promise.all([
          apiFetch("/projects"),
          apiFetch("/services"),
          apiFetch("/leads"),
        ]);

      setProjects(projectsResponse.projects || []);
      setServices(servicesResponse.services || []);
      setLeads(leadsResponse.leads || []);
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);

      setError(
        error.message || "Failed to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     PROJECT STATS
  ========================================= */

  const publishedProjects = projects.filter(
    (project) => project.status === "published"
  );

  const draftProjects = projects.filter(
    (project) => project.status === "draft"
  );

  /* =========================================
     SERVICE STATS
  ========================================= */

  const publishedServices = services.filter(
    (service) => service.status === "published"
  );

  const draftServices = services.filter(
    (service) => service.status === "draft"
  );

  /* =========================================
     LEAD STATS
  ========================================= */

  const newLeads = leads.filter(
    (lead) => lead.status === "new"
  );

  const contactedLeads = leads.filter(
    (lead) => lead.status === "contacted"
  );

  const closedLeads = leads.filter(
    (lead) => lead.status === "closed"
  );

  const unreadLeads = leads.filter(
    (lead) => !lead.isRead
  );

  /* =========================================
     STATS
  ========================================= */

  const stats = [
    {
      title: "Projects",
      value: projects.length,
      description: `${publishedProjects.length} published · ${draftProjects.length} draft`,
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      title: "Services",
      value: services.length,
      description: `${publishedServices.length} published · ${draftServices.length} draft`,
      icon: BriefcaseBusiness,
      href: "/admin/services",
    },
    {
      title: "Leads",
      value: leads.length,
      description: `${newLeads.length} new enquiries`,
      icon: Users,
      href: "/admin/leads",
    },
    {
      title: "Unread Leads",
      value: unreadLeads.length,
      description: `${contactedLeads.length} contacted · ${closedLeads.length} closed`,
      icon: Mail,
      href: "/admin/leads",
    },
  ];

  return (
    <div className="p-8">
      {/* =========================================
          HEADER
      ========================================= */}

      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          {/* <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            GROWJE CMS
          </p> */}

          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 text-sm">
            Manage your website content, portfolio and enquiries.
          </p>
        </div>

        <button
          type="button"
          onClick={loadDashboard}
          disabled={loading}
          className="w-fit rounded-lg border bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* =========================================
          ERROR
      ========================================= */}

      {error && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <span>{error}</span>

          <button
            type="button"
            onClick={loadDashboard}
            className="font-medium underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* =========================================
          STATS
      ========================================= */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <p className="mt-3 text-4xl font-bold tracking-tight">
                    {loading ? "—" : stat.value}
                  </p>

                  <p className="mt-2 text-xs text-gray-400">
                    {stat.description}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-100 p-3 transition group-hover:bg-black group-hover:text-white">
                  <Icon size={20} />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-medium text-gray-400 transition group-hover:text-black">
                Manage
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* =========================================
          QUICK ACTIONS
      ========================================= */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Quickly manage your website content.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <QuickAction
            href="/admin/projects/new"
            icon={Plus}
            label="New Project"
          />

          <QuickAction
            href="/admin/projects"
            icon={FolderKanban}
            label="Manage Projects"
          />

          <QuickAction
            href="/admin/services"
            icon={BriefcaseBusiness}
            label="Manage Services"
          />

          <QuickAction
            href="/admin/leads"
            icon={Users}
            label="View Leads"
          />

          <QuickAction
            href="/"
            icon={ExternalLink}
            label="View Website"
            external
          />
        </div>
      </div>

      {/* =========================================
          MAIN DASHBOARD
      ========================================= */}

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {/* =========================================
            RECENT PROJECTS
        ========================================= */}

        <DashboardSection
          title="Recent Projects"
          description="Latest projects added to your portfolio."
          href="/admin/projects"
          linkText="View all"
        >
          {loading ? (
            <LoadingMessage text="Loading projects..." />
          ) : projects.length === 0 ? (
            <EmptyContent
              icon={FolderKanban}
              title="No projects yet"
              description="Create your first portfolio project."
              href="/admin/projects/new"
              action="Create Project"
            />
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div
                  key={project._id}
                  className="group flex items-center justify-between gap-4 rounded-xl border p-4 transition hover:bg-gray-50"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    {/* PROJECT IMAGE */}

                    {project.hero?.media?.url ? (
                      <img
                        src={project.hero.media.url}
                        alt={project.title}
                        className="h-12 w-12 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                        <FolderKanban
                          size={18}
                          className="text-gray-400"
                        />
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {project.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-500">
                        {project.clientName ||
                          project.category ||
                          "No client information"}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <StatusBadge status={project.status} />

                    <Link
                      href={`/admin/projects/${project._id}/edit`}
                      className="rounded-full p-2 text-gray-400 transition hover:bg-black hover:text-white"
                      title="Edit project"
                    >
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DashboardSection>

        {/* =========================================
            RECENT LEADS
        ========================================= */}

        <DashboardSection
          title="Recent Enquiries"
          description="Latest contact form submissions."
          href="/admin/leads"
          linkText="View all"
        >
          {loading ? (
            <LoadingMessage text="Loading enquiries..." />
          ) : leads.length === 0 ? (
            <EmptyContent
              icon={Users}
              title="No enquiries yet"
              description="Contact form submissions will appear here."
            />
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 5).map((lead) => (
                <div
                  key={lead._id}
                  className={`rounded-xl border p-4 transition hover:bg-gray-50 ${
                    !lead.isRead
                      ? "border-black/10 bg-gray-50/70"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      {/* UNREAD DOT */}

                      <div className="pt-1.5">
                        {!lead.isRead && (
                          <Circle
                            size={8}
                            fill="currentColor"
                            className="text-black"
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {lead.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {lead.email}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-gray-600 border">
                            {lead.service}
                          </span>

                          <StatusBadge status={lead.status} />
                        </div>
                      </div>
                    </div>

                    <span className="shrink-0 text-xs text-gray-400">
                      {formatRelativeDate(lead.createdAt)}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 pl-5 text-xs leading-relaxed text-gray-500">
                    {lead.message}
                  </p>

                  <div className="mt-3 flex items-center gap-2 pl-5">
                    <a
                      href={`mailto:${lead.email}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-xs font-medium transition hover:bg-black hover:text-white"
                    >
                      <Mail size={13} />
                      Email
                    </a>

                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-xs font-medium transition hover:bg-black hover:text-white"
                    >
                      <Phone size={13} />
                      Call
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DashboardSection>

        {/* =========================================
            SERVICES
        ========================================= */}

        <DashboardSection
          title="Services"
          description="Services currently managed in your CMS."
          href="/admin/services"
          linkText="Manage"
        >
          {loading ? (
            <LoadingMessage text="Loading services..." />
          ) : services.length === 0 ? (
            <EmptyContent
              icon={BriefcaseBusiness}
              title="No services yet"
              description="Create your first service."
              href="/admin/services/new"
              action="Create Service"
            />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {services.slice(0, 6).map((service) => (
                <div
                  key={service._id}
                  className="rounded-xl border p-4 transition hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {service.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-400">
                        /{service.slug}
                      </p>
                    </div>

                    <StatusBadge
                      status={service.status}
                    />
                  </div>

                  {service.shortDescription && (
                    <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-gray-500">
                      {service.shortDescription}
                    </p>
                  )}

                  <Link
                    href={`/admin/services/${service._id}/edit`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-black"
                  >
                    Edit
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </DashboardSection>

        {/* =========================================
            LEAD OVERVIEW
        ========================================= */}

        <DashboardSection
          title="Lead Overview"
          description="Current enquiry pipeline."
          href="/admin/leads"
          linkText="Manage leads"
        >
          <div className="grid grid-cols-3 gap-3">
            <LeadStat
              title="New"
              value={newLeads.length}
              className="bg-blue-50 text-blue-700"
            />

            <LeadStat
              title="Contacted"
              value={contactedLeads.length}
              className="bg-yellow-50 text-yellow-700"
            />

            <LeadStat
              title="Closed"
              value={closedLeads.length}
              className="bg-green-50 text-green-700"
            />
          </div>

          <div className="mt-5 rounded-xl bg-gray-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  Unread enquiries
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Enquiries that haven't been opened yet.
                </p>
              </div>

              <div className="text-3xl font-bold">
                {loading ? "—" : unreadLeads.length}
              </div>
            </div>

            {unreadLeads.length > 0 && (
              <Link
                href="/admin/leads"
                className="mt-4 inline-flex items-center gap-2 text-xs font-medium hover:underline"
              >
                Review unread enquiries
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </DashboardSection>
      </div>
    </div>
  );
}

/* =========================================
   DASHBOARD SECTION
========================================= */

function DashboardSection({
  title,
  description,
  href,
  linkText,
  children,
}) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-6">
        <div>
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        </div>

        {href && (
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:text-black"
          >
            {linkText}
            <ArrowRight size={15} />
          </Link>
        )}
      </div>

      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

/* =========================================
   QUICK ACTION
========================================= */

function QuickAction({
  href,
  icon: Icon,
  label,
  external = false,
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white"
    >
      <Icon size={16} />

      {label}

      {external && (
        <ExternalLink size={13} />
      )}
    </Link>
  );
}

/* =========================================
   LEAD STAT
========================================= */

function LeadStat({
  title,
  value,
  className,
}) {
  return (
    <div
      className={`rounded-xl p-4 ${className}`}
    >
      <p className="text-xs font-medium">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

/* =========================================
   STATUS BADGE
========================================= */

function StatusBadge({ status }) {
  const styles = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    closed: "bg-green-100 text-green-700",
    published: "bg-green-100 text-green-700",
    draft: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status || "unknown"}
    </span>
  );
}

/* =========================================
   EMPTY CONTENT
========================================= */

function EmptyContent({
  icon: Icon,
  title,
  description,
  href,
  action,
}) {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <Icon
          size={21}
          className="text-gray-400"
        />
      </div>

      <p className="mt-4 font-medium">
        {title}
      </p>

      <p className="mt-1 text-sm text-gray-400">
        {description}
      </p>

      {href && action && (
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <Plus size={15} />
          {action}
        </Link>
      )}
    </div>
  );
}

/* =========================================
   LOADING
========================================= */

function LoadingMessage({ text }) {
  return (
    <div className="flex min-h-[180px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-black" />

        <p className="mt-3 text-sm text-gray-400">
          {text}
        </p>
      </div>
    </div>
  );
}

/* =========================================
   DATE
========================================= */

function formatRelativeDate(date) {
  if (!date) return "";

  const now = new Date();
  const created = new Date(date);

  const diff = now - created;

  const minutes = Math.floor(
    diff / (1000 * 60)
  );

  const hours = Math.floor(
    diff / (1000 * 60 * 60)
  );

  const days = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return created.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}