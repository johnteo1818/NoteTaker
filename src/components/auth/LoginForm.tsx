"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/app";
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#191919] mb-2">
          Welcome back
        </h1>
        <p className="text-[#6B6B6B]">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#191919] mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className={cn(
              "w-full h-10 px-3 rounded-md border border-[#E8E8E8]",
              "text-sm text-[#191919] placeholder:text-[#9B9B9B]",
              "focus:outline-none focus:ring-2 focus:ring-[#2383E2] focus:border-transparent",
              "transition-all"
            )}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#191919] mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className={cn(
              "w-full h-10 px-3 rounded-md border border-[#E8E8E8]",
              "text-sm text-[#191919] placeholder:text-[#9B9B9B]",
              "focus:outline-none focus:ring-2 focus:ring-[#2383E2] focus:border-transparent",
              "transition-all"
            )}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full h-10 rounded-md text-sm font-medium",
            "bg-[#191919] text-white",
            "hover:bg-[#383838]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-colors"
          )}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-[#6B6B6B]">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-[#191919] hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}