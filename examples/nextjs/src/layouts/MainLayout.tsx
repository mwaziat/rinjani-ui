import React from 'react'
import Link from 'next/link'
import { FiGithub } from 'react-icons/fi'

const Navbar = () => (
  <nav className="sticky top-0 z-50 w-full flex-none border-b border-primary-100 bg-white transition-colors duration-500 lg:z-50">
    <div className="w-full px-4 sm:px-6 lg:px-10">
      <div className="py-4 border-b border-slate-900/10 lg:border-0">
        <div className="relative flex items-center justify-between">
          <Link href="/" className="flex-none font-extrabold text-2xl tracking-tight flex items-center gap-2 group">
            <span className="text-primary-700 drop-shadow-sm group-hover:scale-105 transition-transform">
              Rinjani UI
            </span>
          </Link>

          <div className="relative hidden lg:flex items-center ml-auto">
            <nav className="text-sm leading-6 font-semibold text-slate-700">
              <ul className="flex space-x-8">
                <li><Link href="/rinjani/getting-started/overview" className="hover:text-primary-600 transition-colors">Documentation</Link></li>
                <li><Link href="/rinjani/components/general/button" className="hover:text-primary-600 transition-colors">Components</Link></li>
                <li><Link href="/rinjani/getting-started/changelog" className="hover:text-primary-600 transition-colors">Changelog</Link></li>
              </ul>
            </nav>
            <div className="flex items-center border-l border-slate-200 ml-6 pl-6 space-x-5">
              <a href="https://github.com/mwaziat/rinjani-ui" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                <span className="sr-only">Rinjani UI on GitHub</span>
                <FiGithub className="w-5 h-5" />
              </a>
              <Link href="/rinjani/getting-started/overview" className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md active:scale-95">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
)

const Footer = () => (
  <footer className="border-t border-[#375924] bg-[#132b10] pb-10 pt-16 text-[#ebf5e3]">
    <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr] lg:gap-10">
        <div className="max-w-xs">
          <Link href="/" className="inline-flex text-xl font-extrabold tracking-tight text-primary-300 transition-colors hover:text-primary-200">
            Rinjani UI
          </Link>
          <p className="mt-5 text-sm leading-6 text-[#d8ebca]">
            Lightweight React components for interfaces that stay close to the platform.
          </p>
          <a href="https://github.com/mwaziat/rinjani-ui" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary-300 transition-colors hover:text-white">
            <FiGithub className="h-4 w-4" />
            View the repository
          </a>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f6faf2]">Components</h3>
          <ul role="list" className="mt-5 space-y-3">
            <li><Link href="/rinjani/components/form/input-field" className="text-sm text-[#d8ebca] transition-colors hover:text-white">Forms</Link></li>
            <li><Link href="/rinjani/components/data-display/data-table" className="text-sm text-[#d8ebca] transition-colors hover:text-white">DataTable</Link></li>
            <li><Link href="/rinjani/components/navigation/tree" className="text-sm text-[#d8ebca] transition-colors hover:text-white">Tree</Link></li>
            <li><Link href="/rinjani/components/feedback/alert" className="text-sm text-[#d8ebca] transition-colors hover:text-white">Feedback</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f6faf2]">Resources</h3>
          <ul role="list" className="mt-5 space-y-3">
            <li><Link href="/rinjani/getting-started/overview" className="text-sm text-[#d8ebca] transition-colors hover:text-white">Documentation</Link></li>
            <li><Link href="/rinjani/getting-started/installation" className="text-sm text-[#d8ebca] transition-colors hover:text-white">Installation</Link></li>
            <li><Link href="/rinjani/getting-started/theming" className="text-sm text-[#d8ebca] transition-colors hover:text-white">Theming</Link></li>
            <li><Link href="/rinjani/getting-started/changelog" className="text-sm text-[#d8ebca] transition-colors hover:text-white">Changelog</Link></li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[#375924] bg-[#1b3a14] p-5">
          <div className="flex items-center gap-2 text-primary-300">
            <FiGithub className="h-4 w-4" />
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">Built in the open</p>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#d8ebca]">
            Have an idea, a fix, or a component that belongs here? Contributions are welcome.
          </p>
          <a href="https://github.com/mwaziat/rinjani-ui" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-300 transition-colors hover:text-white">
            Contribute on GitHub
          </a>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-3 border-t border-[#375924] pt-6 text-xs text-[#b9db9f] sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Rinjani UI. Open source and made for React.</p>
        <p>MIT licensed</p>
      </div>
    </div>
  </footer>
)

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-primary-100 selection:text-primary-900">
      <Navbar />
      <main className="grow flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
