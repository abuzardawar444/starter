// app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-background">
      <Card className="w-full max-w-2xl text-center">
        <CardContent className="py-10 px-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to Your Starter Template
          </h1>
          <p className="mt-4 text-muted-foreground">
            This is a clean Next.js + ShadCN UI setup to kickstart your project.
            Easily extend, style, and build features.
          </p>

          <Separator className="my-6 w-1/2" />

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link
                href="https://ui.shadcn.com/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                ShadCN Docs
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
