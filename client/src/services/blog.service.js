import { apiFetch } from "./api";

export async function getBlogs() {
  return apiFetch("/blogs");
}

export async function getBlogById(id) {
  return apiFetch(`/blogs/${id}`);
}

export async function getPublishedBlogs() {
  return apiFetch("/blogs/public");
}

export async function getBlogBySlug(slug) {
  return apiFetch(`/blogs/slug/${slug}`);
}

export async function createBlog(data) {
  return apiFetch("/blogs", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBlog(id, data) {
  return apiFetch(`/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteBlog(id) {
  return apiFetch(`/blogs/${id}`, {
    method: "DELETE",
  });
}