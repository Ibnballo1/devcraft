import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPostsByCategory, getAllCategories } from "@/lib/blog-service";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const categories = await getAllCategories();
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found",
    };
  }

  return {
    title: `${category.name} - Categories`,
    description: `Browse all posts in the ${category.name} category`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const categories = await getAllCategories();
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(params.slug);

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-muted-foreground mb-8">
        {category.postCount} {category.postCount === 1 ? "post" : "posts"}
      </p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={`${post.title} thumbnail`}
                  width={400}
                  height={200}
                  className="aspect-video object-cover w-full"
                />
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className="inline-block rounded-full bg-muted px-3 py-1 text-xs"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
                <CardTitle className="line-clamp-2 text-xl">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <p className="line-clamp-3 mt-2 text-muted-foreground">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4 pt-0">
                <div className="flex items-center gap-2">
                  <Image
                    src={post.author.image || "/placeholder.svg"}
                    alt={`${post.author.name} avatar`}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-sm">{post.author.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No posts found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
