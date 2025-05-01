import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft, MessageSquare, Share2, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-service";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <article className="container max-w-3xl py-6 lg:py-12">
          <div className="space-y-4">
            <Button variant="ghost" size="sm" asChild className="h-8 gap-1">
              <Link href="/blog">
                <ChevronLeft className="h-4 w-4" />
                Back to all posts
              </Link>
            </Button>

            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-muted"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <h1 className="text-3xl font-bold lg:text-4xl">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={post.author.image || ""}
                    alt={post.author.name || ""}
                  />
                  <AvatarFallback>
                    {post.author.name
                      ? post.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-muted-foreground">
                {post.viewCount} views
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={`Cover image for ${post.title}`}
              width={1000}
              height={500}
              className="aspect-video rounded-lg object-cover"
            />
          </div>

          <div className="mt-8 prose prose-gray dark:prose-invert max-w-none">
            {post.content}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-1">
                <ThumbsUp className="h-4 w-4" />
                Like
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <MessageSquare className="h-4 w-4" />
                Comment
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-bold">Related Posts</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id}>
                    <CardContent className="p-4">
                      <Image
                        src={relatedPost.coverImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        width={300}
                        height={150}
                        className="aspect-video rounded-md object-cover"
                      />
                      <h3 className="mt-2 text-lg font-semibold">
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="hover:underline"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {relatedPost.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
