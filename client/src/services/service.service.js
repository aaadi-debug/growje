import { apiFetch } from "./api";

// ============================================
// PUBLIC SERVICES
// ============================================

export async function getPublishedServices() {
  return apiFetch("/services/public");
}

// ============================================
// PUBLIC SERVICE BY SLUG
// ============================================

// export async function getServiceBySlug(slug) {
//   if (!slug) {
//     throw new Error("Service slug is required");
//   }

//   return apiFetch(
//     `/services/slug/${encodeURIComponent(slug)}`
//   );
// }
export async function getServiceBySlug(slug) {
  return apiFetch(`/services/slug/${slug}`);
}

// ============================================
// ADMIN — ALL SERVICES
// ============================================

export async function getServices(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      query.append(key, value);
    }
  });

  const queryString = query.toString();

  return apiFetch(
    `/services${queryString ? `?${queryString}` : ""}`
  );
}

// ============================================
// ADMIN — CREATE
// ============================================

export async function createService(data) {
  return apiFetch("/services", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ============================================
// ADMIN — UPDATE
// ============================================

export async function updateService(id, data) {
  return apiFetch(`/services/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// ============================================
// ADMIN — DELETE
// ============================================

export async function deleteService(id) {
  return apiFetch(`/services/${id}`, {
    method: "DELETE",
  });
}