export const metadata = {
  title: "Admin Panel | LatestAutoTech",
  description: "Admin dashboard for LatestAutoTech",
};

export default function AdminPage() {
  const stats = [
    { label: "Total Users", value: "1,248", accent: "bg-orange-600" },
    { label: "Active Orders", value: "378", accent: "bg-slate-800" },
    { label: "New Leads", value: "84", accent: "bg-teal-600" },
    { label: "Pending Reviews", value: "12", accent: "bg-blue-600" },
  ];

  const actions = [
    { title: "Upload Blog", description: "Create a new blog post with title, content and image.", path: "/admin/blog-upload" },
    { title: "Blog Listing", description: "View and manage published or draft blog posts.", path: "/admin/blog-list" },
    { title: "Manage Products", description: "Add or edit phone, car, bike and EV listings.", path: "/admin" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange-600">Admin Panel</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Welcome back, Admin</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Use this dashboard to monitor site activity, manage listings, and review customer requests.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Back to site
              </a>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
              >
                Create Report
              </button>
            </div>
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
                <div className={`${stat.accent} h-12 w-12 rounded-3xl`} />
              </div>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Quick actions</h2>
                <p className="mt-1 text-sm text-slate-500">Common admin tasks for fast access.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                Live
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {actions.map((action) => (
                <a
                  key={action.title}
                  href={action.path}
                  className="group block rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-orange-300 hover:bg-white"
                >
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-orange-600">{action.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{action.description}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Site activity</h2>
                <p className="mt-1 text-sm text-slate-500">Recent updates and status checks.</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Stable
              </span>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-slate-700">
              <li className="rounded-3xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Server uptime</p>
                <p className="mt-1 text-slate-600">All systems are operating normally.</p>
              </li>
              <li className="rounded-3xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Order volume</p>
                <p className="mt-1 text-slate-600">Orders increased 12% this week.</p>
              </li>
              <li className="rounded-3xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Lead response</p>
                <p className="mt-1 text-slate-600">New requests are being processed.</p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
