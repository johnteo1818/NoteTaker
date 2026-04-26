import Link from "next/link";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Simple Writing",
    description: "A clean, distraction-free editor that lets you focus on what matters — your ideas.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    title: "Powerful Search",
    description: "Find any note instantly with our fast and intelligent search capabilities.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Real-time Collaboration",
    description: "Work together seamlessly with your team on shared documents and projects.",
  },
];

const navLinks = [
  { label: "Product", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[#E8E8E8]">
        <nav className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#191919] rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>
            <span className="font-semibold text-lg text-[#191919]">Pagewise</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[#6B6B6B] hover:text-[#191919] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="h-9 px-4 flex items-center justify-center rounded-md text-sm font-medium text-[#191919] hover:bg-[#F7F6F3] transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="h-9 px-4 flex items-center justify-center rounded-md text-sm font-medium bg-[#191919] text-white hover:bg-[#383838] transition-colors"
            >
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E8E8E8] bg-[#F7F6F3] mb-6">
              <span className="text-xs font-medium text-[#6B6B6B]">Introducing Pagewise</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-[#191919] leading-[1.05] tracking-tight mb-6">
              The calm home for the things you think.
            </h1>

            <p className="text-lg md:text-xl text-[#6B6B6B] leading-relaxed mb-8 max-w-xl mx-auto">
              Pagewise is a quiet place to write, plan, and connect ideas — without the chrome and clutter of every other tool.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <Link
                href="/signup"
                className="h-11 px-6 flex items-center justify-center rounded-lg text-sm font-medium bg-[#191919] text-white hover:bg-[#383838] transition-colors w-full sm:w-auto"
              >
                Get started
              </Link>
              <Link
                href="#features"
                className="h-11 px-6 flex items-center justify-center rounded-lg text-sm font-medium text-[#6B6B6B] hover:text-[#191919] hover:bg-[#F7F6F3] transition-colors w-full sm:w-auto"
              >
                Learn more
              </Link>
            </div>

            <p className="text-sm text-[#9B9B9B]">
              Free for individuals. No credit card required.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 bg-[#F7F6F3]">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl border border-[#E8E8E8] shadow-lg p-8 overflow-hidden">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#EB5757]" />
                <div className="w-3 h-3 rounded-full bg-[#F5A623]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-[#F7F6F3] rounded w-3/4" />
                <div className="h-4 bg-[#F7F6F3] rounded w-1/2" />
                <div className="h-4 bg-[#F7F6F3] rounded w-5/6" />
                <div className="h-4 bg-[#F7F6F3] rounded w-2/3" />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#191919] mb-4">
                Everything you need, nothing you don&apos;t
              </h2>
              <p className="text-lg text-[#6B6B6B] max-w-xl mx-auto">
                A thoughtfully designed set of tools to help you capture and organize your thoughts.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border border-[#E8E8E8] hover:border-[#191919] transition-colors"
                >
                  <div className="w-12 h-12 bg-[#F7F6F3] rounded-lg flex items-center justify-center text-[#191919] mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#191919] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-[#191919]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-[#9B9B9B] mb-8">
              Join thousands of people who use Pagewise every day.
            </p>
            <Link
              href="/signup"
              className="inline-flex h-11 px-6 items-center justify-center rounded-lg text-sm font-medium bg-white text-[#191919] hover:bg-[#F7F6F3] transition-colors"
            >
              Create free account
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E8E8E8] py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#191919] rounded flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </div>
              <span className="font-medium text-sm text-[#191919]">Pagewise</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-[#6B6B6B]">
              <a href="#" className="hover:text-[#191919] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#191919] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#191919] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[#191919] transition-colors">GitHub</a>
            </div>

            <p className="text-sm text-[#9B9B9B]">
              © 2026 Pagewise. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}