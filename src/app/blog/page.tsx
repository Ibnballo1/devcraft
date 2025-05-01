import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLatestPosts, getAllCategories } from "@/lib/blog-service";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest blog posts",
};

export default async function BlogPage() {
  const posts = await getLatestPosts(12);
  const categories = await getAllCategories();

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">Blog</h1>
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
                    {post.categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="inline-block rounded-full bg-muted px-3 py-1 text-xs"
                      >
                        {category.name}
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
        </div>
        <div className="md:w-1/4">
          <div className="sticky top-20">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <span>{category.name}</span>
                  <span className="text-xs bg-muted rounded-full px-2 py-1">
                    {category.postCount}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
