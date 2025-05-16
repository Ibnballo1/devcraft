import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Subscribe to our Newsletter
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Stay updated with the latest news and articles from our blog.
          </p>
          <form className="flex flex-col gap-2 min-[400px]:flex-row">
            <Input type="email" placeholder="Enter your email" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
