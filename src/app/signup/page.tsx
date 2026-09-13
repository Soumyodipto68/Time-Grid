import Link from "next/link";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#05070d] px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-[#0b101b] p-8 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">
              Create account
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Create your Time-Zone Synchronizer account.
            </p>
          </div>

          <SignupForm />

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-purple-400 transition hover:text-purple-300"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}