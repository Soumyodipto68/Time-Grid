import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080c14] px-4">
      <div className="w-full max-w-md">
        {/* your existing brand section */}

        <div className="rounded-2xl border border-white/10 bg-[#0d1420] p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white">
            Welcome back
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Sign in to continue to your dashboard.
          </p>

          <LoginForm />

          <div className="mt-6 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-gray-400">
              Dont have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-purple-400 transition hover:text-purple-300"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}