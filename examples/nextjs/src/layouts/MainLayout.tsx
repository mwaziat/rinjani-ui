import React from 'react'
import Link from 'next/link'
import { FiGithub, FiTwitter } from 'react-icons/fi'

const Navbar = () => (
  <nav className="sticky top-0 z-50 w-full backdrop-blur-md flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-primary-100 bg-primary-50/80 supports-backdrop-filter:bg-primary-50/60">
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
                <li><Link href="/rinjani/components/button" className="hover:text-primary-600 transition-colors">Components</Link></li>
                <li><Link href="/blog" className="hover:text-primary-600 transition-colors">Blog</Link></li>
              </ul>
            </nav>
            <div className="flex items-center border-l border-slate-200 ml-6 pl-6 space-x-5">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
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
  <footer className="bg-primary-950 border-t border-primary-900 mt-24 pb-12 pt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="space-y-8 xl:col-span-1">
          <Link href="/" className="text-xl font-extrabold tracking-tight flex items-center gap-2">
            <span className="text-primary-400">
              Rinjani UI
            </span>
          </Link>
          <p className="text-sm leading-6 text-primary-200/80 max-w-xs">
            A beautiful, robust, and modern React UI library for building stunning web applications effortlessly.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-primary-500 hover:text-primary-300 transition-colors">
              <span className="sr-only">GitHub</span>
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="#" className="text-primary-500 hover:text-primary-300 transition-colors">
              <span className="sr-only">Twitter</span>
              <FiTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-primary-50">Components</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li><Link href="/rinjani/components/form" className="text-sm leading-6 text-primary-300 hover:text-primary-100 transition-colors">Forms</Link></li>
                <li><Link href="/rinjani/components/feedback" className="text-sm leading-6 text-primary-300 hover:text-primary-100 transition-colors">Feedback</Link></li>
                <li><Link href="/rinjani/components/drawer" className="text-sm leading-6 text-primary-300 hover:text-primary-100 transition-colors">Drawer</Link></li>
                <li><Link href="/rinjani/components/modal" className="text-sm leading-6 text-primary-300 hover:text-primary-100 transition-colors">Modal</Link></li>
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-primary-50">Resources</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li><Link href="/rinjani/getting-started/overview" className="text-sm leading-6 text-primary-300 hover:text-primary-100 transition-colors">Documentation</Link></li>
                <li><Link href="/rinjani/getting-started/installation" className="text-sm leading-6 text-primary-300 hover:text-primary-100 transition-colors">Installation</Link></li>
                <li><Link href="/rinjani/getting-started/theming" className="text-sm leading-6 text-primary-300 hover:text-primary-100 transition-colors">Theming</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 border-t border-primary-900 pt-8 sm:mt-20 lg:mt-24">
        <p className="text-xs leading-5 text-primary-500/80">&copy; {new Date().getFullYear()} Rinjani UI, Inc. All rights reserved.</p>
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