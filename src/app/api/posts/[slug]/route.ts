import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { slug: string };
}

export async function GET({ params }: Params) {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        slug,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("Error fetching post by slug ", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
