import { notFound } from "next/navigation";
import ProjectPage from "../../../../components/public/ProjectPage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getProject(slug) {
  try {
    const response = await fetch(
      `${API_URL}/projects/slug/${slug}`,
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

    return data.project;
  } catch (error) {
    console.error(
      "Project Page Fetch Error:",
      error
    );

    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title:
      project.seo?.metaTitle ||
      project.title,

    description:
      project.seo?.metaDescription ||
      project.shortDescription ||
      "",
  };
}

export default async function PortfolioProjectPage({
  params,
}) {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} />;
}