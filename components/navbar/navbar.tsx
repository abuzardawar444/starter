"use client";

import { links } from "@/lib/links";
import Link from "next/link";
import { useSticky } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils"; // Optional utility for class merging
import { Button } from "@/components/ui/button"; // Assuming ShadCN UI
import MobileNav from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  const isSticky = useSticky(50);

  return (
    <nav
      className={cn(
        "w-full z-50 transition-all duration-300",
        isSticky &&
          "fixed top-0 left-0 right-0 bg-secondary/35 backdrop-blur-md shadow-md"
      )}
    >
      <div className="container mx-auto py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          MyApp
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex"
            >
              Login
            </Button>
          </Link>

          {/* Mobile menu trigger */}
          <MobileNav />
          <div className="">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
