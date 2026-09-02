// client/src/app/admin/(dashboard)/page.js
export default function AdminDashboard() {
  const stats = [
    {
      title: "Projects",
      value: "0",
      description: "Total projects",
    },
    {
      title: "Services",
      value: "0",
      description: "Active services",
    },
    {
      title: "Blogs",
      value: "0",
      description: "Published blogs",
    },
    {
      title: "Leads",
      value: "0",
      description: "Contact enquiries",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome to your creative agency admin panel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">
              {stat.title}
            </p>

            <p className="mt-3 text-3xl font-bold">
              {stat.value}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          Quick Actions
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="/admin/projects"
            className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Manage Projects
          </a>

          <a
            href="/admin/blogs"
            className="rounded-lg border px-5 py-3 text-sm font-medium hover:bg-gray-50"
          >
            Manage Blogs
          </a>

          <a
            href="/admin/leads"
            className="rounded-lg border px-5 py-3 text-sm font-medium hover:bg-gray-50"
          >
            View Leads
          </a>
        </div>
      </div>
    </div>
  );
}