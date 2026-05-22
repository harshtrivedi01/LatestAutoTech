import React, { Suspense } from "react";
import BlogUploadClient from "./BlogUploadClient";

export const metadata = {
  title: "Upload Blog | LatestAutoTech Admin",
  description: "Upload new blog posts for LatestAutoTech",
};

export default function BlogUploadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogUploadClient />
    </Suspense>
  );
}
