"use client";
import { useEffect, useState } from "react";
import { loadBlogPosts } from "../admin/blogStorage";

export const dynamic = "force-dynamic";

export default function Page() {
  const [uploadedBlogs, setUploadedBlogs] = useState([]);

  useEffect(() => {
    const posts = loadBlogPosts();
    setUploadedBlogs(posts.filter((blog) => (blog.categories || [blog.category]).includes("phones")));
  }, []);

  const getImageForBlog = (blog) => {
    return blog.image ||
      "https://images.unsplash.com/photo-1512499617640-c2f999133f51?auto=format&fit=crop&w=1200&q=80";
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mt-16">
          {uploadedBlogs.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center text-slate-600 shadow-sm ring-1 ring-slate-200">
              No phone blogs found yet. Add one from the admin panel and select Phones.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {uploadedBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group"
                >
                  <div className="overflow-hidden">
                    <img
                      src={getImageForBlog(blog)}
                      alt={blog.title}
                      className="w-full h-[220px] md:h-[240px] object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="text-[24px] md:text-[28px] leading-tight font-bold text-gray-900 mb-3">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
                      {blog.summary || `${blog.content?.substring(0, 140) ?? ""}...`}
                    </p>
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                        {blog.author?.charAt(0) ?? "A"}
                      </div>
                      <span>{blog.author || "Admin"}</span>
                      <span>•</span>
                      <span>{new Date(blog.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
