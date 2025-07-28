// components/footer.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Github, Send } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-background py-10 mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo & Social */}
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            MyApp
          </Link>
          <p className="text-sm text-muted-foreground">
            Build faster with this modern Next.js starter powered by ShadCN.
          </p>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 hover:text-primary" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-5 h-5 hover:text-primary" />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 hover:text-primary" />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 hover:text-primary" />
            </a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Subscribe to our newsletter</h4>
          <form className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Enter your email" />
            <Button type="submit">
              <Send className="w-4 h-4 mr-1" /> Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground">
            No spam. Only product updates and useful tips.
          </p>
        </div>

        {/* Footer Links */}
        <div className="space-y-2 text-sm">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-muted-foreground">
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-10 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
