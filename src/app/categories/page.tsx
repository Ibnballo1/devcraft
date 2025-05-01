import Link from "next/link";
import type { Metadata } from "next";

import { getAllCategories } from "@/lib/blog-service";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse blog posts by category",
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="block p-6 bg-card rounded-lg border hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <p className="text-muted-foreground">
              {category.postCount} {category.postCount === 1 ? "post" : "posts"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
