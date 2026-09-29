import { signIn } from "@/auth"
import Link from "next/link"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string, from?: string }> }) {
  const { error, from } = await searchParams;

  return (
    <div className="min-h-[80vh] bg-[#FAF7F0] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-[var(--color-brand-border)]">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-[var(--color-brand-dark)]">Login</h1>
          <p className="text-[var(--color-brand-muted)] mt-2">Welcome back to Bhadohi Arts & Weave</p>
        </div>

        {error === 'CredentialsSignin' && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
            Invalid email or password. Please try again.
          </div>
        )}
        
        <form
          action={async (formData) => {
            "use server"
            try {
              if (from) formData.append('redirectTo', from)
              await signIn("credentials", formData)
            } catch (error) {
              if (error instanceof AuthError) {
                switch (error.type) {
                  case "CredentialsSignin":
                    redirect("/login?error=CredentialsSignin")
                  default:
                    redirect("/login?error=Default")
                }
              }
              throw error; // Rethrow to allow Next.js redirect to work on success
            }
          }}
          className="space-y-4"
        >
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
              className="w-full border border-[var(--color-brand-border)] px-4 py-2 focus:border-[var(--color-brand-burgundy)] outline-none"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[var(--color-brand-dark)] text-white py-3 font-bold hover:bg-[var(--color-brand-burgundy)] transition-colors mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 flex items-center">
          <div className="flex-1 border-t border-[var(--color-brand-border)]"></div>
          <span className="px-4 text-sm text-[var(--color-brand-muted)]">OR</span>
          <div className="flex-1 border-t border-[var(--color-brand-border)]"></div>
        </div>

        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: from || undefined })
          }}
          className="mt-6"
        >
          <button 
            type="submit"
            className="w-full bg-white text-[var(--color-brand-dark)] border border-[var(--color-brand-border)] py-3 font-bold hover:bg-[#FAF7F0] transition-colors flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Sign In with Google
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[var(--color-brand-muted)]">
          Don't have an account? <Link href="/register" className="text-[var(--color-brand-burgundy)] hover:underline font-bold">Register here</Link>
        </p>
        <p className="mt-4 text-center text-xs text-[var(--color-brand-muted)]">
          Are you an administrator? <Link href="/admin/login" className="text-[var(--color-brand-dark)] hover:underline font-bold">Admin Login</Link>
        </p>
      </div>
    </div>
  )
}
