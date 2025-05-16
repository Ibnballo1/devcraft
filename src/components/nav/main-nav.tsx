"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export function MainNav() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 px-8 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="font-bold text-xl">
            DevCraft
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  isActive(item.href) ? "text-red-500" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] lg:w-[300px]"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="ml-2"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        session.user.image ||
                        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAmwMBEQACEQEDEQH/xAAbAAEAAQUBAAAAAAAAAAAAAAAABQIDBAYHAf/EADwQAAEDAgQDBAYJAwUBAAAAAAEAAgMEEQUGEiETMUEHUXGRFDJhgaHRFRYiI0JSVLHBYnKiQ1OCg+Ez/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAECAwQFBgf/xAAwEQACAgECBAUCBgIDAAAAAAAAAQIDEQQSBSExQRMWUVKhYZEGFCIyQrEj8IHB0f/aAAwDAQACEQMRAD8A62uEbwQBAEAQBAEAQGLW4hRUDdVdVwU475ZA391eMJS6IhySI45ty+HafpWAnvFyPMBX/L2+hXxI+pnUWL4bXm1FX007vyxygnyVJVzj1RKmn3M1ULBAEAQBAEAQBAEAQBAEAQBAEBS9zWMc57g1rRcknkO9SlnkG8HHs59qNRNPLSZcfwaVt2uq7fblPez8rfbzPs69CnSxSzPqa0rG+SOa1ONVTpC90rnyHnJI4ucfEncrb5LoY+pjjG60G/Hd5pkYJCjzK8OAqWhwHXqEGDo2VM/VFPoYZ3VtLezopX3lYP6HHn4H4LBbp4T5rqWjY11Or0FbT4hRxVdHJxIZRdrv4I6FcyUXF4ZtRaaMhVJCAIAgCAIAgCAIAgCAIDxAc67R8zPqqg5RwSGSprqoAT8I+q3mW93LmTsAVvaanH+SRhsk29qNaouyPE6todiVfBRA/wCnE3iuHv2C23MqqvUm6XsZwNm9TX1057tTWj4D+VXey/hxRnN7Icq23ZVH2+kOUbpDZH0LNR2MZblH3U9fBbqyUH9wVdSZXYuxC1vYpU05dLgeOguHqx1MWm5/ub8lO4q4GXk3GMUyfi5wDNlOIG1R4kM4eHMJGxc0jmOV+RHOywainxFldRCTi8M6uuYbIQBAEAQBAEAQBAEAQBAROacYZgWBVWIPsXRstG0/ieeQWaivxJ47FLJbUaX2TYMY6CfMdeNeIYq9z2vdzEV7/wCRF/JdGb7Fao4WTf8AWseTLg9EiZG0qEikhouNepyRgrD1KZVo13tAy/8AWPLk0MItX0/39G/qJG729429/sV08FJLKMPsyzCMdy5FrfeeABrt99PTy5e5aOrr2y3LuWqllYNvWoZQgCAIAgCAIAgCAIAgOY9rk8uJYhhGWqQky1cm4HTUbX9w1FdHRxxByNe15aROT5syvgjGYacVpYzSsEXCYblukWtt12WXbJmVTiu5pOYu1Kr47osvQ03BB/8AvUAkv9ob0HjfwCtGtdykrn/EzMpdo/GZMM0VdDTuBHCcwEF3fcWt3Ksoe0mFvuNnZnvLJF/pqjA/vVNkjI7IepE5n7SKKDDSctVtFVVpeBpk1EBvU+KvGDzzKTsWP0kJgnaxXxzNbjVPBJEfWdDsfEdPgr7F2MSsfdG+UvaDlWcsa3HKVj3EWEl2EeYVdrMm6Jp+XpPqx2s1eFXDaLFQZqUg/ZcH/aFv+VwoujuqaMcXtmdZXJNk9QBAEAQBAEAQBAEB4XBrS4mwHMqUsvCBoWE4pHV9omYWwQNmm9EgbBK/bhMAOu3M7l48bLq0/wCOtGvKG6bTOa9pGVH4LjsVUJDJFWtc4m3qvBFx8R8VkUm0HWovkajNFobyCZKtBjQ4AOAseiDsbLhOTKbEcE9MfLM2pka58TG20EC+m+3XxWOVuJYM8aM17jWogWQjaziLm6uzCuh7DZ92yNDhzuQgiyQwjBfp/FoaKNrhsXvMdtWgDe1/bYe9Tu2rJKjvkkdTzRiM2HYLgMNdhXCkp8RphS1Yka4tDTdw7xdoKb98WhOvY1hnT4ZY54xJC7Ux3Irjyg4vDNjoVqoCAIAgCAIAgCAIDExRr30EwjBvbostLW7mSupzzJNHUQZ9xmSWCRsUlEzTIW7OOpuwK6TacUVsX+Vsns+ZedmDBTBTlvpcD+JBqNgTYgtJ6XHXoQFEXgiccrkcWrMu4xCSypwitY4H/ZLh5tuCrGF59C7hWUMXxGpZG6jmpqW4Ms0rdFm9Q0HclQ5KKLRg5PHY6lFQNpML9HhjsA0BrR+EDYfALXydOO1RwjnGZMrVsFW+WjpnTU8hLhwhcsJ3II58ySCO9ZoTTXPqc6ypxba6EPBgmJyuLYsNrHk7ACB3yVzGk12OqdmWUqnBGVGIYowMrakBjIb34TBvuR1Jty7lScs8kZa4tc2Xu1qnnqsOwWOmhfM76Sa4hjSdI0O3Ps3UweMicXJrBuGWWyNoCJPzfwtG/qjPZjdyJda5jCAIAgCAIAgCAIApQMdlHDE98kbNLnCxtyW1RY3LaxKTxgtPWywjHkF+aoy5jTMaGl2m9hew5nwUFuxDyYtT6tBocT1cjahkI8w2ybSu/BWymEzWyBj2at9LxYjxCq0ZNxIUsQjbZWRDM2M2UoozJNJFVRs42rS03AabXVLp7Ekiqk0+RlxsZEwMjaGtHIBaTeXkgqUAIAgCAIAgCAIAgCAK0ZbWmGY07bXK6fVbkRFmK9UaLliRQWMZ53UYJLeoJgFbZQFOAZFMS94AV4xKyeETUbdLGt7loXT3z5FCpYgEAQBAEAQBAEAQBAEAQFLm6xZbFF2zk+hDRg1DCwrf2qXNEpmHI5Q4lzGkcFG0nJjOfupUBk9ia6RwAvusirwVcsE/QUfBaHP9buWnfqFjbApzZnLRJCAIAgCAIAgCAIAgCAIAgCApfG2RhBC2tL4jliLKykomuV9Q2BxEmplj+Jth5rcc2nzM0VnoyNkr47amuv4KN6L7SxDWyVUmimhkkP8AS1WjZ6IiUcdWbjhtC2np2vcLyn1ieiwat2Yz2NZSi5YRmrnlwgCAIAgCAIAgCAIAgCAIDxALouYzyIzFcapqCF32w+To1pXZ4dw++c92MI5eu4jTRDrlkK3NeFzt0zOEbuokbb48l1LOHWx7ZNejidNi5SwaxV19IcTcaUtdBrbrtyH5lyLa3G3ZjmegosU6d+fUnnZtponGOiiBANm6G7LrV8PsfY4Go4nRXzlL/smsDxtlVGfSTokcdrnotXiXDrsLZzK6Hi1FsnnkTgNxe49y89KLi8M7kZKSymeqCQgCAIAgCAIAgCAIAgPCQAVKTbwiG0llkPiGPQU12xWc7vPJdzScFlYlK3kcLV8cqr5V8zWsQzDUTggPNugGwXf0/DaKf2x5nn9Rxi63uQFVNJMbvcSujGKSOc7JTeWYZi1cwrllPBVO2KkouMWn1jfSLki11wNZBfn4Sa+v2PV8OvlLhVkU+aeF/wA4/wDS7h8zKimjnYxzQ8XAe2xC7NdniQUsYyeR1NTpsdbecehIwSOjP2SQpkk+prKyUHlEzQ4vNERaRw960r9HVasSWTpabiltb5PBPUWNsksJgP7guFqeDLrU+foei0vHU+Vv3JiN7ZGBzHAtPIhcGyuVcts1hnoq7Y2R3QeUVKhcIAgCAIAgCAIAgNdzXiTqdjaWE2c8anEdAvR8D0anm+Xbkjy34i4hKtKiHV82abI4uddxJPtXqUkjx2W+bLblJYtOCsWTKQAhbJYxAzGBkdKWifU4sL+Q26rmaiE3qoOHXDO9oLa48OtjZ03R/wB+C/SibgxtqC189gHFg2J9i34blBb3z7nEu2TsfhLl2M5kE55QTH/rKq7Ie5EflLn/AAf2ZdMckYHEjey/LW0hFKL6M17KbK/3RaLkcpHXkocckRscSey7ih9KbTyn7Mmw8VxeL6JWU+JFc1/R6LgPEpQvVM+kv7NqXkT3IQBAEAQBAEAQBSDnmPVHpGJ1D77B5a3wGy9/w+rwtNCP0/s+ZcTv8fWWT+uPsRjit00kWyULlF1YseIBfwUY55JzywUtrHUVVTVEYBdHMxwB5HdVsrVkHF9za0c/DtVmM4NvizrOG2ko43HvbIR81y3wmHaXwdVfiCfetfdkfjGYJsUijjkiiY1j9Q03J5eK2dNoo0Scos5+u4lPWRUJRSS5ke1628HHaLsMhjka9psWkEFUnFSi0+5MJOuSmuq5nSIJRNDHKOT2h3mvnVsHXY4PsfV6bFZXGa7pMuLGZQgCAIAgCAIC3UP4cMj/AMrSfILJVHdZGPq1/ZjunsrlL0TOYyvLnFx5k3X0eKwsHyjLk8ssOcrF0iy5ysZEiguQlI81ITgakGDFrXbMJ5B4PxQ2KV1Lhr6cbcRvmmCv5ax9iuKrjm2jOqx6JgpKmUP3Gax+yjBruJdY9VMbR0LLsnFwamceYBb5ErwvF4bdZNH0XgdjnoK89uX2eCSXNOsEAQBAEAQBAW52cSJ7D+Npb5iyvXLZNS9GY7Yb4Sh6o5jVxvp5nxSNIewlpBHcvo9dkbIKcejPls6pVzcJLmjCkfZZUWiiw56GRIpL0LJHmpCcHhehOCh1nCxCErkU6W/lCktuZW14Zy2Qo1kutnsoKusvx1AJG6Mxups6fgFO+lwimilBD9OpwPMXN7fFfP8Aid0btVOUenT7H0HhOnen0cIS69fuSK0DohAEAQBAEAQBARuK4LRYkNUzHMktbiRmzv8A1dDR8Sv0vKDyvRnO1vC9Pq+c1iXqupr1Rkhxd9zXC3c+P5FdmH4iWP11/ZnGl+G3n9FnwYrsjVl9qyn94KzeYqO8H8FPL13aa+Sk5Frf1dN8fkp8w6f2v4I8vX+5fJ4ciV/6qm/y+SeYtP7X8Dy/f7l8nn1Fr/1VN5u+SeYtN7X8Dy/qPch9RK79XS/5fJPMWn9r+CfL+o9y+R9Q679XTfH5J5i0/tfwPL9/uXyPqDWnnWQD3FR5io9j+C3l+73r5LkXZ9KT97iLQOuiMn+Vjl+I4fxrf3MkeASz+qfwTmD5Rw3DZBMRJUTA3a6Y7NPsby/dcvV8Z1Gojt/avodPS8J09D3Pm/qbCuQdQIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCA//Z"
                      }
                      alt={session.user.name || ""}
                    />
                    <AvatarFallback>
                      {session.user.name
                        ? session.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                {session.user.role === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-foreground ${
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            {!session && (
              <div className="flex flex-col space-y-2">
                <Button asChild variant="outline">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
