"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

import LoginCard from "./LoginCard";
import { loginUser, LoginResponse } from "@/lib/auth";

// Type-safe backend error
interface BackendError {
  detail?: string;
  email?: string[];
  username?: string[];
  [key: string]: unknown;
}

export default function StaffLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || password.length < 6) {
      setError("Please enter a valid email and password (min 6 characters)");
      return;
    }

    setIsPending(true);

    try {
      const data: LoginResponse = await loginUser(email.trim(), password);

      // Save access token
      Cookies.set("authToken", data.tokens.access, {
        expires: 1,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      localStorage.setItem("authToken", data.tokens.access);

      // Redirect to dashboard
      router.push("/auth/dashboard");
    } catch (err: unknown) {
      let msg = "Login failed. Please try again.";

      // Type-safe error parsing
      if (typeof err === "object" && err !== null) {
        const backendErr = err as BackendError;

        if (backendErr.detail) msg = backendErr.detail;
        else if (backendErr.email) msg = backendErr.email.join(" ");
        else if (backendErr.username) msg = backendErr.username.join(" ");
      }

      setError(msg);
      console.error("Login error:", err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Animated background */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0.85 }}
        animate={{ scale: 1.12, opacity: 1 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/room4.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-200/90 hover:text-white mb-8 transition-colors text-sm font-medium drop-shadow-sm"
        >
          ← Back to Home
        </Link>

        <LoginCard
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          isPending={isPending}
          error={error}
          handleSignIn={handleSignIn}
        />

        <p className="mt-8 text-center text-sm text-gray-300 drop-shadow">
          Restricted access • Unauthorized use is prohibited
        </p>
      </motion.div>
    </div>
  );
}



/**
 * SorftInn Hotel App
 * © 2026 Damola
 * Licensed under MIT
 */