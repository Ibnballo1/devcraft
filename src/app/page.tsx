import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

import { getFeaturedPosts, getLatestPosts } from "@/lib/blog-service";

export default async function Home() {
  const featuredPosts = await getFeaturedPosts();
  const latestPosts = await getLatestPosts(6);

  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          {/* <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center relative"> */}
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Discover Insights & Stories
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Explore thought-provoking articles, expert opinions, and the
              latest trends in technology, design, and more.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/blog">
                  Start Reading
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/newsletter">Subscribe</Link>
              </Button>
            </div>
          </div>
          {/* <Image
              src="/placeholder.svg"
              alt="DevCraft Blog Hero Image"
              width={800}
              height={550}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            /> */}
          {/* </div> */}
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Featured
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Latest Articles
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our most recent publications covering a wide range of
                topics
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {latestPosts.map((post) => (
              <Card
                key={post.id}
                className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-foreground hover:text-muted-foreground overflow-hidden"
              >
                <CardHeader className="p-0">
                  <Image
                    src="/banner-devcraft.jpeg" // {post.coverImage || "/placeholder.svg"}
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
                  <CardTitle
                    className={`line-clamp-2 text-xl ${
                      post.title.length > 28 ? "mb-0" : "mb-9"
                    }`}
                  >
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <p className="line-clamp-3 mt-2 text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder.jpg" // {post.author.image || "/placeholder.jpg"}
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
          <div className="flex justify-center mt-10">
            <Button asChild variant="outline">
              <Link href="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center">
            <div className="space-y-4 flext">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Stay Updated
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Subscribe to our newsletter to receive the latest updates,
                articles, and insights directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="sm:max-w-md"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
            {/* <div className="flex justify-center lg:justify-end">
              <Image
                src="/placeholder.svg"
                alt="Newsletter illustration"
                width={500}
                height={350}
                className="rounded-xl"
              />
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
