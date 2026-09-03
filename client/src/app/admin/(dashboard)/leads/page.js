"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  Mail,
  Phone,
  Search,
  Users,
  MessageCircle,
  Building2,
  BriefcaseBusiness,
  Clock3,
  Eye,
  Trash2,
  Check,
  CheckCheck,
  X,
  Circle,
} from "lucide-react";

import {
  getLeads,
  updateLeadStatus,
  updateLeadReadStatus,
  deleteLead,
} from "@/services/lead.service";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [selectedLead, setSelectedLead] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);


  // =========================================
  // FETCH
  // =========================================

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getLeads();

      setLeads(data.leads || []);

    } catch (error) {
      console.error("Fetch Leads Error:", error);

      setError(
        error.message || "Failed to load enquiries."
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchLeads();
  }, []);


  // =========================================
  // FILTER
  // =========================================

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesFilter =
        filter === "all" ||
        lead.status === filter;

      const matchesSearch =
        !query ||
        lead.name?.toLowerCase().includes(query) ||
        lead.email?.toLowerCase().includes(query) ||
        lead.phone?.toLowerCase().includes(query) ||
        lead.company?.toLowerCase().includes(query) ||
        lead.service?.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [leads, search, filter]);


  // =========================================
  // STATS
  // =========================================

  const newLeads = leads.filter(
    (lead) => lead.status === "new"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "contacted"
  ).length;

  const closedLeads = leads.filter(
    (lead) => lead.status === "closed"
  ).length;

  const unreadLeads = leads.filter(
    (lead) => !lead.isRead
  ).length;


  // =========================================
  // VIEW LEAD
  // =========================================

  const handleView = async (lead) => {
    setSelectedLead(lead);

    if (!lead.isRead) {
      try {
        const data = await updateLeadReadStatus(
          lead._id,
          true
        );

        setLeads((previous) =>
          previous.map((item) =>
            item._id === lead._id
              ? data.lead
              : item
          )
        );

        setSelectedLead(data.lead);

      } catch (error) {
        console.error(
          "Mark Read Error:",
          error
        );
      }
    }
  };


  // =========================================
  // STATUS
  // =========================================

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      setActionLoading(true);

      const data = await updateLeadStatus(
        id,
        status
      );

      setLeads((previous) =>
        previous.map((lead) =>
          lead._id === id
            ? data.lead
            : lead
        )
      );

      if (selectedLead?._id === id) {
        setSelectedLead(data.lead);
      }

    } catch (error) {
      alert(
        error.message ||
        "Failed to update status."
      );

    } finally {
      setActionLoading(false);
    }
  };


  // =========================================
  // READ / UNREAD
  // =========================================

  const handleReadChange = async (
    id,
    isRead
  ) => {
    try {
      setActionLoading(true);

      const data =
        await updateLeadReadStatus(
          id,
          isRead
        );

      setLeads((previous) =>
        previous.map((lead) =>
          lead._id === id
            ? data.lead
            : lead
        )
      );

      if (selectedLead?._id === id) {
        setSelectedLead(data.lead);
      }

    } catch (error) {
      alert(
        error.message ||
        "Failed to update read status."
      );

    } finally {
      setActionLoading(false);
    }
  };


  // =========================================
  // DELETE
  // =========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);

      await deleteLead(id);

      setLeads((previous) =>
        previous.filter(
          (lead) => lead._id !== id
        )
      );

      setSelectedLead(null);

    } catch (error) {
      alert(
        error.message ||
        "Failed to delete enquiry."
      );

    } finally {
      setActionLoading(false);
    }
  };

  console.log("Leads: ", leads)


  return (
    <div className="p-6 lg:p-8">

      {/* =====================================
          HEADER
      ===================================== */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-gray-500 text-sm"> Manage enquiries submitted through your website.</p>
        </div>

        <button
          type="button"
          onClick={fetchLeads}
          className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white disabled:opacity-50 cursor-pointer"
        >
          Refresh
        </button>
      </div>

      {/* =====================================
          STATS
      ===================================== */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          icon={Users}
          title="Total Leads"
          value={leads.length}
          loading={loading}
        />
        <StatCard
          icon={MessageCircle}
          title="New"
          value={newLeads}
          loading={loading}
        />
        <StatCard
          icon={Clock3}
          title="Contacted"
          value={contactedLeads}
          loading={loading}
        />
        <StatCard
          icon={Mail}
          title="Unread"
          value={unreadLeads}
          loading={loading}
        />
        <StatCard
          icon={Mail}
          title="Closed"
          value={closedLeads}
          loading={loading}
        />
      </div>

      {/* =====================================
          ERROR
      ===================================== */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =====================================
          FILTERS
      ===================================== */}
      <div className="mb-6 flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search name, email, phone, company or service..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="w-full rounded-lg border bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
          />
        </div>

        <select
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value)
          }
          className="rounded-lg border bg-white px-4 py-3 text-sm outline-none focus:border-black"
        >
          <option value="all">
            All leads
          </option>

          <option value="new">
            New
          </option>

          <option value="contacted">
            Contacted
          </option>

          <option value="closed">
            Closed
          </option>
        </select>
      </div>


      {/* =====================================
          TABLE
      ===================================== */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-b px-6 py-5">
          <h2 className="font-semibold">
            Enquiries
          </h2>
          <p className="text-xs text-gray-500">
            {loading
              ? "Loading..."
              : `${filteredLeads.length} ${filteredLeads.length === 1
                ? "enquiry"
                : "enquiries"
              }`}
          </p>
        </div>

        {loading ? (
          <LoadingState />
        ) : filteredLeads.length === 0 ? (
          <EmptyState
            hasFilters={Boolean(
              search ||
              filter !== "all"
            )}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-left">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Service
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Read
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <LeadRow
                    key={lead._id}
                    lead={lead}
                    onView={handleView}
                    onStatusChange={
                      handleStatusChange
                    }
                    onReadChange={
                      handleReadChange
                    }
                    onDelete={
                      handleDelete
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


      {/* =====================================
          DETAIL MODAL
      ===================================== */}

      {selectedLead && (

        <LeadModal
          lead={selectedLead}
          loading={actionLoading}
          onClose={() =>
            setSelectedLead(null)
          }
          onStatusChange={
            handleStatusChange
          }
          onReadChange={
            handleReadChange
          }
          onDelete={
            handleDelete
          }
        />

      )}

    </div>
  );
}


/* =========================================
   STAT CARD
========================================= */

function StatCard({
  icon: Icon,
  title,
  value,
  loading,
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {loading ? "—" : value}
          </p>

        </div>

        <div className="rounded-lg bg-gray-100 p-3">
          <Icon size={20} />
        </div>

      </div>

    </div>
  );
}


/* =========================================
   LEAD ROW
========================================= */

function LeadRow({
  lead,
  onView,
  onStatusChange,
  onReadChange,
  onDelete,
}) {
  return (
    <tr
      className={`border-b last:border-0 transition hover:bg-gray-50 ${!lead.isRead
          ? "bg-blue-50/30"
          : ""
        }`}
    >
      {/* CONTACT */}
      <td className="px-6 py-5">
        <div className="flex items-start gap-3">
          {!lead.isRead && (
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
          )}
          <div>
            <p
              className={`font-medium ${!lead.isRead
                  ? "font-semibold"
                  : ""
                }`}
            >
              {lead.name}
            </p>
            <a
              href={`mailto:${lead.email}`}
              className="mt-1 block text-sm text-gray-500 hover:text-black"
            >
              {lead.email}
            </a>
            <a
              href={`tel:${lead.phone}`}
              className="mt-1 block text-sm text-gray-400 hover:text-black"
            >
              {lead.phone}
            </a>
          </div>
        </div>
      </td>

      {/* SERVICE */}
      <td className="px-6 py-5">
        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium">
          {lead.service}
        </span>
        {lead.company && (
          <p className="mt-2 text-xs text-gray-400">
            {lead.company}
          </p>
        )}
      </td>

      {/* STATUS */}
      <td className="px-6 py-5">
        <StatusBadge
          status={lead.status}
        />
      </td>

      {/* READ */}
      <td className="px-6 py-5">
        {lead.isRead ? (
          <button
            onClick={() =>
              onReadChange(
                lead._id,
                false
              )
            }
            title="Mark unread"
            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-black cursor-pointer"
          >
            <CheckCheck size={17} />
          </button>
        ) : (
          <button
            onClick={() =>
              onReadChange(
                lead._id,
                true
              )
            }
            title="Mark read"
            className="rounded-full p-2 text-blue-500 transition hover:bg-blue-50 cursor-pointer"
          >
            <Circle size={17} />
          </button>
        )}
      </td>


      {/* DATE */}
      <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-400">
        {formatDate(
          lead.createdAt
        )}
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-5">
        <div className="flex justify-end gap-2">
          <button
            onClick={() =>
              onView(lead)
            }
            title="View enquiry"
            className="rounded-full border p-2 transition hover:bg-black hover:text-white cursor-pointer"
          >
            <Eye size={16} />
          </button>

          {lead.status === "new" && (
            <button
              onClick={() =>
                onStatusChange(
                  lead._id,
                  "contacted"
                )
              }
              title="Mark contacted"
              className="rounded-full border p-2 transition hover:bg-yellow-50 cursor-pointer"
            >
              <Phone size={16} />
            </button>
          )}

          {lead.status !== "closed" && (
            <button
              onClick={() =>
                onStatusChange(
                  lead._id,
                  "closed"
                )
              }
              title="Mark closed"
              className="rounded-full border p-2 transition hover:bg-green-500 hover:text-white cursor-pointer"
            >
              <Check size={16} />
            </button>
          )}

          <button
            onClick={() =>
              onDelete(lead._id)
            }
            title="Delete enquiry"
            className="rounded-full border p-2 text-red-500 transition hover:bg-red-50 cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>

      </td>

    </tr>
  );
}


/* =========================================
   DETAIL MODAL
========================================= */

function LeadModal({
  lead,
  loading,
  onClose,
  onStatusChange,
  onReadChange,
  onDelete,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >

      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-start justify-between border-b p-6">

          <div>

            <div className="flex items-center gap-3">

              <h2 className="text-xl font-semibold">
                {lead.name}
              </h2>

              <StatusBadge
                status={lead.status}
              />

            </div>

            <p className="mt-1 text-sm text-gray-400">
              Enquiry received{" "}
              {formatDate(
                lead.createdAt
              )}
            </p>

          </div>


          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-black"
          >
            <X size={20} />
          </button>

        </div>


        {/* BODY */}

        <div className="max-h-[70vh] overflow-y-auto p-6">

          <div className="grid gap-5 sm:grid-cols-2">

            <DetailItem
              icon={Mail}
              label="Email"
              value={lead.email}
              href={`mailto:${lead.email}`}
            />

            <DetailItem
              icon={Phone}
              label="Phone"
              value={lead.phone}
              href={`tel:${lead.phone}`}
            />

            <DetailItem
              icon={Building2}
              label="Company"
              value={
                lead.company || "Not provided"
              }
            />

            <DetailItem
              icon={BriefcaseBusiness}
              label="Service"
              value={lead.service}
            />

          </div>


          {/* MESSAGE */}

          <div className="mt-8">

            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Message
            </p>

            <div className="mt-3 rounded-xl bg-gray-50 p-5">

              <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                {lead.message}
              </p>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="mt-8 border-t pt-6">

            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Manage enquiry
            </p>


            <div className="flex flex-wrap gap-3">

              {lead.status === "new" && (

                <button
                  disabled={loading}
                  onClick={() =>
                    onStatusChange(
                      lead._id,
                      "contacted"
                    )
                  }
                  className="rounded-lg bg-yellow-100 px-4 py-2.5 text-sm font-medium text-yellow-800 transition hover:bg-yellow-200 disabled:opacity-50"
                >
                  Mark contacted
                </button>

              )}


              {lead.status !== "closed" && (

                <button
                  disabled={loading}
                  onClick={() =>
                    onStatusChange(
                      lead._id,
                      "closed"
                    )
                  }
                  className="rounded-lg bg-green-100 px-4 py-2.5 text-sm font-medium text-green-800 transition hover:bg-green-200 disabled:opacity-50"
                >
                  Mark closed
                </button>

              )}


              <button
                disabled={loading}
                onClick={() =>
                  onReadChange(
                    lead._id,
                    !lead.isRead
                  )
                }
                className="rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50 disabled:opacity-50"
              >
                {lead.isRead
                  ? "Mark unread"
                  : "Mark read"}
              </button>


              <button
                disabled={loading}
                onClick={() =>
                  onDelete(lead._id)
                }
                className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                Delete
              </button>

            </div>

          </div>


          {/* CONTACT */}

          <div className="mt-6 flex flex-wrap gap-3">

            <a
              href={`mailto:${lead.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              <Mail size={16} />
              Email
            </a>

            <a
              href={`tel:${lead.phone}`}
              className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
            >
              <Phone size={16} />
              Call
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================
   DETAIL ITEM
========================================= */

function DetailItem({
  icon: Icon,
  label,
  value,
  href,
}) {
  const content = (
    <>
      <div className="rounded-lg bg-gray-100 p-2.5">
        <Icon size={17} />
      </div>

      <div className="min-w-0">

        <p className="text-xs uppercase tracking-wider text-gray-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium">
          {value}
        </p>

      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-gray-50"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border p-4">
      {content}
    </div>
  );
}


/* =========================================
   STATUS
========================================= */

function StatusBadge({
  status,
}) {
  const styles = {
    new: "bg-blue-100 text-blue-700",
    contacted:
      "bg-yellow-100 text-yellow-700",
    closed:
      "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${styles[status] ||
        "bg-gray-100 text-gray-600"
        }`}
    >
      {status || "new"}
    </span>
  );
}


/* =========================================
   LOADING
========================================= */
function LoadingState() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">

      <div className="text-center">

        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-black" />

        <p className="mt-4 text-sm text-gray-400">
          Loading enquiries...
        </p>

      </div>

    </div>
  );
}


/* =========================================
   EMPTY
========================================= */
function EmptyState({
  hasFilters,
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

      <div className="rounded-full bg-gray-100 p-4">
        <Users
          size={25}
          className="text-gray-400"
        />
      </div>

      <h3 className="mt-5 font-semibold">
        {hasFilters
          ? "No matching enquiries"
          : "No enquiries yet"}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-gray-400">
        {hasFilters
          ? "Try changing your search or filter."
          : "Contact form submissions will appear here."}
      </p>

    </div>
  );
}


/* =========================================
   DATE
========================================= */

function formatDate(date) {
  if (!date) return "—";

  return new Date(
    date
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}