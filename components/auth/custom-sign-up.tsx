"use client";
import { useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader, Loader2 } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

export const CustomSignUp = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState<
    "google" | "github" | null
  >(null);
  const [showVerification, setShowVerification] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
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
      const result = await signUp.create({
        emailAddress: email,
        password,
      });

      // If verification is required, show verification input
      if (result.status === "missing_requirements") {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setShowVerification(true);
        setError("");
      }

      // If sign-up is complete, activate session
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Sign-up failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !verificationCode) return;

    setLoading(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider: "google" | "github") => {
    if (!isLoaded) return;

    setIsOAuthLoading(provider);
    try {
      signUp.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: `${window.location.origin}/oauth-callback`,
        redirectUrlComplete: `${window.location.origin}`,
      });
    } catch (err) {
      console.log(err);
      setIsOAuthLoading(null);
      setError("OAuth sign-up failed. Please try again.");
    }
  };

  return (
    <Card className="max-w-md w-full px-10">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          {showVerification ? "Verify your email" : "Create your account"}
        </CardTitle>
      </CardHeader>

      {showVerification ? (
        <form onSubmit={handleVerification} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verification-code">Verification Code</Label>
            <Input
              id="verification-code"
              placeholder="Enter the 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={loading}
              autoComplete="one-time-code"
            />
            <p className="text-sm text-muted-foreground">
              We have sent a verification code to {email}
            </p>
          </div>

          {error && (
            <p className="px-2 text-sm font-medium text-destructive">{error}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader className="mr-2 size-4 animate-spin" />}
            Verify Email
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowVerification(false)}
            disabled={loading}
          >
            Back to Sign Up
          </Button>
        </form>
      ) : (
        <>
          <form onSubmit={handleSignUp} className="space-y-4">
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="new-password"
              />
            </div>

            {error && (
              <p className="px-2 text-sm font-medium text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader className="mr-2 size-4 animate-spin" />}
              Sign Up
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
            Already have an account?{" "}
            <Button variant="link" className="p-0 text-sm text-primary" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};
