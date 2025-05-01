"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  Users,
  FileText,
  MessageSquare,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";

// Create a simple avatar component to avoid Image issues
function UserAvatar({ alt }: { alt: string }) {
  return (
    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
      <span className="text-xs font-medium">{alt.charAt(0)}</span>
    </div>
  );
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demonstration
  const posts = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      status: "Published",
      date: "2024-04-01",
      views: 1245,
      comments: 23,
    },
    {
      id: 2,
      title: "Understanding React Server Components",
      status: "Published",
      date: "2024-03-28",
      views: 982,
      comments: 17,
    },
    {
      id: 3,
      title: "The Future of Web Development",
      status: "Draft",
      date: "2024-04-05",
      views: 0,
      comments: 0,
    },
    {
      id: 4,
      title: "Optimizing Database Queries",
      status: "Published",
      date: "2024-03-15",
      views: 756,
      comments: 12,
    },
    {
      id: 5,
      title: "Building Accessible UIs",
      status: "Draft",
      date: "2024-04-02",
      views: 0,
      comments: 0,
    },
  ];

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="border-r bg-muted/40 w-full md:w-64 md:min-h-screen">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-lg font-bold">BlogFolio</span>
              <span className="text-xs bg-primary text-primary-foreground px-1 rounded">
                Admin
              </span>
            </Link>
          </div>
          <div className="flex-1 py-2">
            <nav className="grid gap-1 px-2">
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground"
              >
                <BarChart className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/posts"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              >
                <FileText className="h-4 w-4" />
                Posts
              </Link>
              <Link
                href="/admin/comments"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Comments
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              >
                <Users className="h-4 w-4" />
                Users
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center gap-3 py-2">
              <UserAvatar alt="Admin" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">
                  admin@example.com
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <Button asChild size="sm">
                <Link href="/admin/posts/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Link>
              </Button>
            </div>
          </header>

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Posts
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">142</div>
                  <p className="text-xs text-muted-foreground">
                    +12 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Views
                  </CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45,231</div>
                  <p className="text-xs text-muted-foreground">
                    +22% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Comments
                  </CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground">
                    +42 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,845</div>
                  <p className="text-xs text-muted-foreground">
                    +180 from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="h-8">
                    All Posts
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    Published
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    Drafts
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search posts..."
                    className="w-[200px] lg:w-[300px] pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Posts</CardTitle>
                  <CardDescription>Manage your blog posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Views</TableHead>
                        <TableHead className="text-right">Comments</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">
                            {post.title}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                post.status === "Published"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              }`}
                            >
                              {post.status}
                            </span>
                          </TableCell>
                          <TableCell>{post.date}</TableCell>
                          <TableCell className="text-right">
                            {post.views.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {post.comments}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
