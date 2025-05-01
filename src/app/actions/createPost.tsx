"use server";

import axiosClient from "@/lib/utils/axios";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import slugify from "slugify";

export default async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const authorId = formData.get("authorId") as string;

  if (!title || !content || !authorId) {
    throw new Error("Missing required fields");
  }

  const slug = slugify(title, { lower: true });

  await axiosClient.post("api/posts", {
    title,
    content,
    slug,
    authorId,
    readTime: 4, // basic read time estimate
  });

  // Optional: refresh homepage
  revalidatePath("/");
}
