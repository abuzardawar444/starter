"use client";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader, Loader2 } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

export const CustomSignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState<
    "google" | "github" | null
  >(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    // Basic validation
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // Replace refresh with push to home page
        router.push("/"); // Navigate to home page
      } else {
        console.log("Additional steps required");
        setError("Additional verification required. Please check your email.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider: "google" | "github") => {
    if (!isLoaded) return;

    setIsOAuthLoading(provider);
    try {
      signIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: `${window.location.origin}/oauth-callback`,
        redirectUrlComplete: `${window.location.origin}`, // This will redirect to home after OAuth
      });
    } catch (err) {
      console.log(err);
      setIsOAuthLoading(null);
      setError("OAuth login failed. Please try again.");
    }
  };

  return (
    <Card className="max-w-md w-full px-10">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
      </CardHeader>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button
              variant="link"
              size="sm"
              className="text-xs text-muted-foreground hover:text-primary"
              type="button"
              onClick={() => {
                router.push("/reset-password");
              }}
            >
              Forgot password?
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="px-2 text-sm font-medium text-destructive">{error}</p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex gap-2 flex-col">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuth("google")}
          disabled={isOAuthLoading !== null}
        >
          {isOAuthLoading === "google" ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <FaGoogle className="mr-2 size-4" />
          )}
          Google
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuth("github")}
          disabled={isOAuthLoading !== null}
        >
          {isOAuthLoading === "github" ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <FaGithub className="mr-2 size-4" />
          )}
          GitHub
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Button variant="link" className="p-0 text-sm text-primary" asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </Card>
  );
};
