import HeroSection from "@/components/public/home/HeroSection";
import ClientMarquee from "@/components/public/home/ServicesMarquee";
import WhoAreWe from "@/components/public/home/WhoWeAre";
import Services from "@/components/public/home/Services";
import OurWork from "@/components/public/home/OurWork";
import Approach from "@/components/public/home/Approach";
import LetsTalk from "@/components/public/home/LetsTalk";
import Testimonials from "@/components/public/home/Testimonials";
import NumbersSection from "@/components/public/home/Numbers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getHomeData() {
  try {
    const [servicesResponse, projectsResponse] =
      await Promise.all([
        fetch(`${API_URL}/services/public`, {
          next: {
            revalidate: 60,
          },
        }),

        fetch(`${API_URL}/projects`, {
          next: {
            revalidate: 60,
          },
        }),
      ]);

    const servicesData = await servicesResponse.json();
    const projectsData = await projectsResponse.json();

    return {
      services: servicesData.success
        ? servicesData.services || []
        : [],

      projects: projectsData.success
        ? (projectsData.projects || []).filter(
          (project) => project.status === "published"
        )
        : [],
    };
  } catch (error) {
    console.error("Homepage Data Error:", error);

    return {
      services: [],
      projects: [],
    };
  }
}

export default async function HomePage() {
  const { services, projects } = await getHomeData();

  const featuredProjects = projects.slice(0, 6);
  // console.log(services)


  return (
    <main className="bg-white text-black">
      <HeroSection />
      <ClientMarquee />
      <WhoAreWe />
      <Services services={services} />
      <OurWork featuredProjects={featuredProjects} services={services} />
      <Approach />
      <Testimonials />
      <NumbersSection />
      <LetsTalk />
    </main>
  );
}