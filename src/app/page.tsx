import Link from "next/link";
import axiosClient from "@/lib/utils/axios";

type post = {
  id: string;
  title: string;
  content: string;
  slug: string;
  coverImageUrl: string;
  readTime: number;
  author: {
    name: string;
  };
};
export default async function HomePage() {
  const { data: posts } = await axiosClient.get<post[]>("/api/posts");
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">DevCraft Blog</h1>

      {posts.map((post) => (
        <div
          key={post.id}
          className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <Link href={`/posts/${post.slug}`}>
            <h2 className="text-xl font-semibold text-blue-600 hover:underline">
              {post.title}
            </h2>
          </Link>
          <p className="text-sm text-gray-500">
            {post.author.name} · {post.readTime} min read
          </p>
          <p className="mt-2 text-gray-700 line-clamp-3">
            {post.content.slice(0, 200)}...
          </p>
        </div>
      ))}
    </div>
  );
}
