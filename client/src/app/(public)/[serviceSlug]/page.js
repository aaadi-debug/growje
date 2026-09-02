import { notFound } from "next/navigation";
import ServicePage from "../../../components/public/ServicePage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getService(serviceSlug) {
  try {
    const response = await fetch(
      `${API_URL}/services/slug/${serviceSlug}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data.success) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(
      "Service Page Fetch Error:",
      error
    );

    return null;
  }
}

export async function generateMetadata({
  params,
}) {
  const { serviceSlug } = await params;

  const data = await getService(serviceSlug);

  if (!data?.service) {
    return {
      title: "Page Not Found",
    };
  }

  const service = data.service;

  return {
    title:
      service.seo?.metaTitle ||
      service.title,

    description:
      service.seo?.metaDescription ||
      service.shortDescription ||
      "",
  };
}

export default async function ServiceSlugPage({
  params,
}) {
  const { serviceSlug } = await params;

  const data = await getService(serviceSlug);

  if (!data?.service) {
    notFound();
  }

  console.log("Projects: ", data.projects)

  return (
    <ServicePage
      service={data.service}
      projects={data.projects || []}
    />
  );
}