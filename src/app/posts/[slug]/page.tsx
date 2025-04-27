import axiosClient from "@/lib/utils/axios";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PostDetailPageProps {
  params: { slug: string };
}

const getPost = async (slug: string) => {
  try {
    const res = await axiosClient.get(`api/posts/${slug}`);
    return res.data;
  } catch (error) {
    console.log("error fetching post by slug", error);
    return null;
  }
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const post = await getPost(params.slug);
  if (!post) {
    notFound();
  }
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      {post.coverImageUrl && (
        <Image
          src={post.coverImageUrl}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-xl mb-8"
        />
      )}

      <div className="text-gray-500 text-sm mb-4">
        By <span className="font-semibold">{post.author?.name}</span> ·{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </div>

      <div className="prose prose-lg">
        <p>{post.content}</p>
      </div>
    </div>
  );
}
