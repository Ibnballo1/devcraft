import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log("error fetching posts", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { title, content, coverImageUrl, authorId } = body;

//     if (!title || !content || !authorId) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const slug = `${slugify(title, { lower: true, strict: true })}-${
//       randomUUID().split("-")[0]
//     };`;

//     const post = await prisma.post.create({
//       data: {
//         title,
//         content,
//         slug,
//         coverImageUrl,
//         authorId,
//         readTime: Math.ceil(content.split(" ").length / 200),
//       },
//     });
//     return NextResponse.json(post, { status: 201 });
//   } catch (error) {
//     console.log("error creating post", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
