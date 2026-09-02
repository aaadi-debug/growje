// client/src/services/project.service.js
import { apiFetch } from "./api";

export async function getProjects(params = {}) {
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
    `/projects${queryString ? `?${queryString}` : ""}`
  );
}

export async function getFeaturedProjects() {
  return apiFetch("/projects/featured");
}

export async function getProjectBySlug(slug) {
  return apiFetch(`/projects/slug/${slug}`);
}

export async function createProject(data) {
  return apiFetch("/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateProject(id, data) {
  return apiFetch(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteProject(id) {
  return apiFetch(`/projects/${id}`, {
    method: "DELETE",
  });
}