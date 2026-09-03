// client/src/services/lead.service.js
import { apiFetch } from "./api";

// Get all leads
export async function getLeads() {
  return apiFetch("/leads");
}


// Get single lead
export async function getLeadById(id) {
  return apiFetch(`/leads/${id}`);
}


// Update status
export async function updateLeadStatus(id, status) {
  return apiFetch(`/leads/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({
      status,
    }),
  });
}


// Mark read / unread
export async function updateLeadReadStatus(id, isRead) {
  return apiFetch(`/leads/${id}/read`, {
    method: "PATCH",
    body: JSON.stringify({
      isRead,
    }),
  });
}


// Delete lead
export async function deleteLead(id) {
  return apiFetch(`/leads/${id}`, {
    method: "DELETE",
  });
}