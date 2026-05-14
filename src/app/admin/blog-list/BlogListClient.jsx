"use client";

import { useEffect, useState } from "react";
import { deleteBlogPost, loadBlogPosts } from "../blogStorage";

export default function BlogListClient() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(loadBlogPosts());
  }, []);

  const handleDelete = (id) => {
    if (!confirm("Delete this blog post?")) return;
    const updated = deleteBlogPost(id);
    setPosts(updated);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange-600">Blog Listing</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Manage your blog posts</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Browse all blog entries, check publication status, and open posts for edit or review.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          {posts.length === 0 ? (
            <div className="p-10 text-center text-slate-600">
              No blog posts found. Create a new post from the blog upload page.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Categories</th>
                  <th className="px-6 py-4 font-semibold">Author</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{post.title}</td>
                    <td className="px-6 py-4">{(post.categories || [post.category]).join(", ")}</td>
                    <td className="px-6 py-4">{post.author}</td>
                    <td className="px-6 py-4">{new Date(post.updatedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          post.publish
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {post.publish ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`/admin/blog-upload?id=${post.id}`}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                        >
                          Edit
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id)}
                          className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
