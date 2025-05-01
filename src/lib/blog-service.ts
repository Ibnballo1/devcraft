// Types
export type PostWithAuthor = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  published: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
};

// For now, we'll use dummy data
const dummyPosts: PostWithAuthor[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    excerpt: "Learn how to build modern web applications with Next.js",
    content: "This is the full content of the blog post about Next.js...",
    coverImage: "/placeholder.svg",
    published: true,
    featured: true,
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01"),
    viewCount: 1245,
    author: {
      id: "1",
      name: "John Doe",
      image: "/placeholder.svg",
    },
    categories: [
      {
        id: "1",
        name: "Web Development",
        slug: "web-development",
      },
      {
        id: "2",
        name: "Next.js",
        slug: "nextjs",
      },
    ],
  },
  {
    id: "2",
    title: "Understanding React Server Components",
    slug: "understanding-react-server-components",
    excerpt: "Explore the power of React Server Components in Next.js",
    content: "This is the full content about React Server Components...",
    coverImage: "/placeholder.svg",
    published: true,
    featured: false,
    createdAt: new Date("2024-03-28"),
    updatedAt: new Date("2024-03-28"),
    viewCount: 982,
    author: {
      id: "1",
      name: "John Doe",
      image: "/placeholder.svg",
    },
    categories: [
      {
        id: "1",
        name: "Web Development",
        slug: "web-development",
      },
      {
        id: "2",
        name: "Next.js",
        slug: "nextjs",
      },
    ],
  },
  {
    id: "3",
    title: "The Future of Web Development",
    slug: "future-of-web-development",
    excerpt: "Predictions and trends for the future of web development",
    content: "This is the full content about the future of web development...",
    coverImage: "/placeholder.svg",
    published: true,
    featured: true,
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
    viewCount: 756,
    author: {
      id: "2",
      name: "Jane Smith",
      image: "/placeholder.svg",
    },
    categories: [
      {
        id: "1",
        name: "Web Development",
        slug: "web-development",
      },
      {
        id: "3",
        name: "Trends",
        slug: "trends",
      },
    ],
  },
  {
    id: "4",
    title: "Building Accessible UIs",
    slug: "building-accessible-uis",
    excerpt: "Best practices for creating accessible user interfaces",
    content: "This is the full content about building accessible UIs...",
    coverImage: "/placeholder.svg",
    published: true,
    featured: false,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
    viewCount: 543,
    author: {
      id: "2",
      name: "Jane Smith",
      image: "/placeholder.svg",
    },
    categories: [
      {
        id: "4",
        name: "Accessibility",
        slug: "accessibility",
      },
      {
        id: "5",
        name: "UI/UX",
        slug: "ui-ux",
      },
    ],
  },
  {
    id: "5",
    title: "Optimizing Database Queries",
    slug: "optimizing-database-queries",
    excerpt: "Techniques to improve database performance in web applications",
    content: "This is the full content about optimizing database queries...",
    coverImage: "/placeholder.svg",
    published: true,
    featured: false,
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2024-02-28"),
    viewCount: 421,
    author: {
      id: "1",
      name: "John Doe",
      image: "/placeholder.svg",
    },
    categories: [
      {
        id: "6",
        name: "Database",
        slug: "database",
      },
      {
        id: "7",
        name: "Performance",
        slug: "performance",
      },
    ],
  },
  {
    id: "6",
    title: "Introduction to TypeScript",
    slug: "introduction-to-typescript",
    excerpt: "Learn the basics of TypeScript and how it improves JavaScript",
    content: "This is the full content about TypeScript introduction...",
    coverImage: "/placeholder.svg",
    published: true,
    featured: false,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
    viewCount: 387,
    author: {
      id: "2",
      name: "Jane Smith",
      image: "/placeholder.svg",
    },
    categories: [
      {
        id: "8",
        name: "TypeScript",
        slug: "typescript",
      },
      {
        id: "1",
        name: "Web Development",
        slug: "web-development",
      },
    ],
  },
];

// Get all categories (dummy data)
const dummyCategories = [
  { id: "1", name: "Web Development", slug: "web-development", postCount: 3 },
  { id: "2", name: "Next.js", slug: "nextjs", postCount: 2 },
  { id: "3", name: "Trends", slug: "trends", postCount: 1 },
  { id: "4", name: "Accessibility", slug: "accessibility", postCount: 1 },
  { id: "5", name: "UI/UX", slug: "ui-ux", postCount: 1 },
  { id: "6", name: "Database", slug: "database", postCount: 1 },
  { id: "7", name: "Performance", slug: "performance", postCount: 1 },
  { id: "8", name: "TypeScript", slug: "typescript", postCount: 1 },
];

export async function getFeaturedPosts(): Promise<PostWithAuthor[]> {
  // In a real app, we would fetch from the database
  // const posts = await db.post.findMany({
  //   where: { featured: true, published: true },
  //   include: {
  //     author: { select: { id: true, name: true, image: true } },
  //     categories: true,
  //   },
  //   orderBy: { createdAt: "desc" },
  //   take: 3,
  // })

  // For now, return dummy data
  return dummyPosts.filter((post) => post.featured).slice(0, 3);
}

export async function getLatestPosts(limit = 6): Promise<PostWithAuthor[]> {
  // In a real app, we would fetch from the database
  // const posts = await db.post.findMany({
  //   where: { published: true },
  //   include: {
  //     author: { select: { id: true, name: true, image: true } },
  //     categories: true,
  //   },
  //   orderBy: { createdAt: "desc" },
  //   take: limit,
  // })

  // For now, return dummy data
  return dummyPosts.slice(0, limit);
}

export async function getPostBySlug(
  slug: string
): Promise<PostWithAuthor | null> {
  // In a real app, we would fetch from the database
  // const post = await db.post.findUnique({
  //   where: { slug },
  //   include: {
  //     author: { select: { id: true, name: true, image: true } },
  //     categories: true,
  //   },
  // })

  // For now, return dummy data
  return dummyPosts.find((post) => post.slug === slug) || null;
}

export async function getRelatedPosts(
  postId: string,
  limit = 3
): Promise<PostWithAuthor[]> {
  // In a real app, we would fetch related posts based on categories
  // const post = await db.post.findUnique({
  //   where: { id: postId },
  //   include: { categories: true },
  // })
  //
  // if (!post) return []
  //
  // const categoryIds = post.categories.map(category => category.id)
  //
  // const relatedPosts = await db.post.findMany({
  //   where: {
  //     id: { not: postId },
  //     published: true,
  //     categories: { some: { id: { in: categoryIds } } },
  //   },
  //   include: {
  //     author: { select: { id: true, name: true, image: true } },
  //     categories: true,
  //   },
  //   orderBy: { createdAt: "desc" },
  //   take: limit,
  // })

  // For now, return dummy data
  const currentPost = dummyPosts.find((post) => post.id === postId);
  if (!currentPost) return [];

  const categoryIds = currentPost.categories.map((category) => category.id);

  return dummyPosts
    .filter(
      (post) =>
        post.id !== postId &&
        post.categories.some((category) => categoryIds.includes(category.id))
    )
    .slice(0, limit);
}

export async function getAllCategories() {
  // In a real app, we would fetch from the database
  // const categories = await db.category.findMany({
  //   include: { _count: { select: { posts: true } } },
  //   orderBy: { name: "asc" },
  // })
  //
  // return categories.map(category => ({
  //   ...category,
  //   postCount: category._count.posts,
  // }))

  // For now, return dummy data
  return dummyCategories;
}

export async function getPostsByCategory(
  categorySlug: string,
  limit = 10
): Promise<PostWithAuthor[]> {
  // In a real app, we would fetch from the database
  // const posts = await db.post.findMany({
  //   where: {
  //     published: true,
  //     categories: { some: { slug: categorySlug } },
  //   },
  //   include: {
  //     author: { select: { id: true, name: true, image: true } },
  //     categories: true,
  //   },
  //   orderBy: { createdAt: "desc" },
  //   take: limit,
  // })

  // For now, return dummy data
  const category = dummyCategories.find((cat) => cat.slug === categorySlug);
  if (!category) return [];

  return dummyPosts
    .filter((post) => post.categories.some((cat) => cat.id === category.id))
    .slice(0, limit);
}

export async function searchPosts(query: string): Promise<PostWithAuthor[]> {
  // In a real app, we would search the database
  // const posts = await db.post.findMany({
  //   where: {
  //     published: true,
  //     OR: [
  //       { title: { contains: query, mode: "insensitive" } },
  //       { content: { contains: query, mode: "insensitive" } },
  //     ],
  //   },
  //   include: {
  //     author: { select: { id: true, name: true, image: true } },
  //     categories: true,
  //   },
  //   orderBy: { createdAt: "desc" },
  // })

  // For now, search dummy data
  const lowercaseQuery = query.toLowerCase();
  return dummyPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt?.toLowerCase().includes(lowercaseQuery)
  );
}
