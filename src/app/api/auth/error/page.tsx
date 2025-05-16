"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <div className="flex min-h-screen items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-red-500">
          {error ? decodeURIComponent(error) : "An unknown error occurred."}
        </p>
      </div>
    </div>
  );
}
