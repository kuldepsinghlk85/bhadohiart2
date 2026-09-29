"use client";

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] bg-[#FAF7F0] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-[var(--color-brand-border)]">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-[var(--color-brand-dark)]">Register</h1>
          <p className="text-[var(--color-brand-muted)] mt-2">Create an account at Bhadohi Arts & Weave</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Full Name</label>
            <input 
              name="name" 
              type="text" 
              required 
              className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[var(--color-brand-dark)] mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              minLength={6}
              className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-brand-dark)] text-white py-3 font-bold hover:bg-[var(--color-brand-burgundy)] transition-colors mt-2 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[var(--color-brand-muted)]">
          Already have an account? <Link href="/login" className="text-[var(--color-brand-burgundy)] hover:underline font-bold">Login here</Link>
        </p>
      </div>
    </div>
  )
}
