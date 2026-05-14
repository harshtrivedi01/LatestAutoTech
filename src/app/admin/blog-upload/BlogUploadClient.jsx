"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getBlogPostById, saveBlogPost } from "../blogStorage";

const initialForm = {
  title: "",
  author: "",
  category: "",
  summary: "",
  content: "",
  publish: false,
};

export default function BlogUploadClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formValues, setFormValues] = useState(initialForm);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const existing = getBlogPostById(id);
      if (existing) {
        setFormValues({
          title: existing.title,
          author: existing.author,
          category: existing.categories?.[0] || existing.category || "",
          summary: existing.summary,
          content: existing.content,
          publish: existing.publish,
        });
        setIsEditMode(true);
        setBlogId(existing.id);
      }
    }
  }, [searchParams]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === "publish") {
      setFormValues((prev) => ({
        ...prev,
        publish: checked,
      }));
      return;
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!formValues.title || !formValues.author || !formValues.category || !formValues.content) {
      setError("Please fill in all required fields and choose a category before saving the blog post.");
      return;
    }

    const saved = saveBlogPost({
      id: blogId,
      title: formValues.title,
      author: formValues.author,
      category: formValues.category,
      categories: [formValues.category],
      summary: formValues.summary,
      content: formValues.content,
      publish: formValues.publish,
      updatedAt: new Date().toISOString(),
    });

    alert(`Blog post ${saved.id ? "saved" : "created"} successfully!`);
    router.push("/admin/blog-list");
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange-600">Blog Upload</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            {isEditMode ? "Edit Blog Post" : "Add a New Blog Post"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Create or update a blog post for your admin dashboard. Saved posts will appear on the blog listing page.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="space-y-6">
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Blog Title</span>
                <input
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Enter blog title"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Author</span>
                <input
                  name="author"
                  value={formValues.author}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Author name"
                />
              </label>

              <fieldset className="block">
                <legend className="text-sm font-medium text-slate-700">Category</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Phones", value: "phones" },
                    { label: "Cars", value: "cars" },
                    { label: "Bikes", value: "bikes" },
                    { label: "EVs", value: "evs" },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition hover:border-orange-300">
                      <input
                        type="radio"
                        name="category"
                        value={option.value}
                        checked={formValues.category === option.value}
                        onChange={handleChange}
                        className="h-5 w-5 rounded-full border-slate-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Short Summary</span>
                <textarea
                  name="summary"
                  rows="4"
                  value={formValues.summary}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Write a short summary for the blog post"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Content</span>
                <textarea
                  name="content"
                  rows="8"
                  value={formValues.content}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Write the full blog content here"
                />
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">Publishing details</h2>
              <p className="mt-2 text-sm text-slate-500">
                Select whether this blog should be published immediately or saved as a draft.
              </p>

              <label className="mt-6 flex items-center gap-3">
                <input
                  type="checkbox"
                  name="publish"
                  checked={formValues.publish}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-slate-700">Publish immediately</span>
              </label>

              <p className="mt-4 text-sm text-slate-500">
                Note: featured image upload is not saved in local storage yet. Add backend file upload later.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-semibold text-slate-900">Blog guidelines</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>• Keep titles concise and descriptive.</li>
                <li>• Use categories to help visitors find content.</li>
                <li>• Write summaries that explain the post value clearly.</li>
              </ul>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
            >
              {isEditMode ? "Save Changes" : "Upload Blog"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
