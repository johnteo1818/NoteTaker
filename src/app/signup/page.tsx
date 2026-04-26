import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[#E8E8E8]">
        <nav className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#191919] rounded-lg flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>
            <span className="font-semibold text-lg text-[#191919]">Pagewise</span>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <SignupForm />
      </main>
    </div>
  );
}