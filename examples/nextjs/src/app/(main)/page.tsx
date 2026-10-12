
import Link from "next/link";
import { Badge, Button } from "rinjani-ui";
import {
  LuArrowDownRight,
  LuArrowUpRight,
  LuBraces,
  LuCheck,
  LuGithub,
  LuLayers3,
  LuTerminal,
  LuZap,
} from "react-icons/lu";
import LandingSampler from "./LandingSampler";
import LandingShowcase from "./LandingShowcase";

const principles = [
  {
    icon: LuZap,
    eyebrow: "Tailwind native",
    title: "Your CSS pipeline stays in charge.",
    description:
      "Bring Rinjani into an existing Tailwind v4 app without adding a second global reset or a styling runtime.",
  },
  {
    icon: LuBraces,
    eyebrow: "React first",
    title: "Simple props. Familiar composition.",
    description:
      "Build with regular React components, TypeScript, and HTML primitives that stay easy to inspect and extend.",
  },
  {
    icon: LuLayers3,
    eyebrow: "Built to compose",
    title: "Start small. Scale when needed.",
    description:
      "Use one button or assemble a complete form, table, and feedback flow without adopting an application framework.",
  },
];

const componentGroups = [
  { label: "Forms", items: "InputField · Select · Autocomplete" },
  { label: "Feedback", items: "Alert · Dialog · Toast · Modal" },
  { label: "Data", items: "DataTable · EditDataTable · Tree" },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="relative bg-(--docs-paper)">
        <div className="pointer-events-none absolute -right-40 -top-48 h-136 w-136 rounded-full bg-primary-200/35 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-40 h-44 w-44 rounded-full border border-primary-300/50" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-20 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-12 lg:pb-32 lg:pt-28">
          <div className="max-w-2xl">
            <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary-700">
              <span className="h-px w-10 bg-primary-500" />
              React components, without the weight
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-neutral-950 sm:text-7xl">
              The UI layer that lets your app stay fast.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600 sm:text-xl">
              Rinjani UI is a practical React component library built on native Tailwind CSS. Ship polished interfaces with a small surface area, clear APIs, and no styling runtime to manage.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/rinjani/getting-started/overview">
                <Button size="lg" rightIcon={<LuArrowUpRight size={18} />}>
                  Read the docs
                </Button>
              </Link>
              <Link href="/rinjani/components/general/button">
                <Button size="lg" variant="outlined" color="neutral" rightIcon={<LuArrowDownRight size={18} />}>
                  Browse components
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-500">
              <span className="flex items-center gap-2"><LuCheck className="text-primary-600" /> React 18+ / 19</span>
              <span className="flex items-center gap-2"><LuCheck className="text-primary-600" /> Tailwind CSS v4</span>
              <span className="flex items-center gap-2"><LuCheck className="text-primary-600" /> TypeScript ready</span>
            </div>
          </div>

          <div className="relative lg:pl-8">
            <div className="relative overflow-hidden rounded-4xl bg-neutral-950 shadow-[0_30px_90px_-35px_rgba(20,37,26,0.55)]">
              <div className="flex items-center justify-between px-5 py-4 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff766d]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8dcc45]" />
                </div>
                <span className="font-mono">app/page.tsx</span>
              </div>

              <div className="grid gap-6 p-6 sm:p-8">
                <div className="font-mono text-[13px] leading-7 text-neutral-300 sm:text-sm">
                  <p><span className="text-[#c792ea]">import</span> &#123; Button &#125; <span className="text-[#c792ea]">from</span> <span className="text-[#c3e88d]">&quot;rinjani-ui&quot;</span></p>
                  <p className="mt-4 text-neutral-500">{"// regular React, familiar Tailwind"}</p>
                  <p><span className="text-[#c792ea]">export default function</span> <span className="text-[#82aaff]">Action</span>() &#123;</p>
                  <p className="pl-5"><span className="text-[#c792ea]">return</span> (</p>
                  <p className="pl-10 text-[#89ddff]">&lt;Button</p>
                  <p className="pl-16">color=<span className="text-[#c3e88d]">&quot;primary&quot;</span></p>
                  <p className="pl-16">variant=<span className="text-[#c3e88d]">&quot;filled&quot;</span></p>
                  <p className="pl-10 text-[#89ddff]">&gt;Ship faster&lt;/Button&gt;</p>
                  <p className="pl-5">);</p>
                  <p>&#125;</p>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 p-4">
                  <div>
                    <p className="text-sm font-semibold text-white">No runtime styling layer.</p>
                    <p className="mt-1 text-xs text-neutral-400">The application owns Tailwind.</p>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-500/15 text-primary-300">
                    <LuTerminal size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/70 shadow-[0_18px_55px_-45px_rgba(20,37,26,0.4)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 sm:grid-cols-3 sm:px-10 lg:px-12">
          {componentGroups.map((group) => (
            <div key={group.label} className="rounded-2xl bg-primary-50/55 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">{group.label}</p>
              <p className="mt-2 text-sm text-neutral-500">{group.items}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Badge color="success" variant="soft" isPill>Why Rinjani</Badge>
            <h2 className="mt-5 max-w-md text-4xl font-semibold leading-tight tracking-[-0.04em] text-neutral-950 sm:text-5xl">
              Less machinery. More interface.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-neutral-600">
              Keep the design system close to the platform. Rinjani gives you useful defaults, then gets out of the way when your product needs to be itself.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <article key={principle.eyebrow} className="group rounded-2xl bg-white/65 p-5 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_45px_-35px_rgba(20,37,26,0.5)]">
                  <div className="mb-9 grid h-11 w-11 place-items-center rounded-xl bg-primary-50 text-primary-700 transition-transform group-hover:scale-105">
                    <Icon size={20} />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">{principle.eyebrow}</p>
                  <h3 className="mt-3 text-xl font-semibold leading-tight text-neutral-950">{principle.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-neutral-600">{principle.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#eef5e7]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-28 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-12 lg:py-36">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">A small taste</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-5xl">Useful defaults, ready to customize.</h2>
            <p className="mt-5 max-w-lg leading-7 text-neutral-600">Use real Rinjani primitives in your first screen: accessible fields, searchable inputs, and the data surfaces most products need.</p>

            <div className="mt-8 grid max-w-lg gap-3 sm:grid-cols-2">
              <Link href="/rinjani/components/data-display/data-table" className="group rounded-2xl bg-white/60 p-4 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_45px_-35px_rgba(20,37,26,0.5)]">
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-50 text-primary-700"><LuLayers3 size={17} /></span>
                  <LuArrowUpRight className="text-primary-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={17} />
                </div>
                <p className="mt-4 text-sm font-semibold text-neutral-950">DataTable included</p>
                <p className="mt-1 text-xs leading-5 text-neutral-500">Sorting, pagination, and responsive data views.</p>
              </Link>
              <Link href="/rinjani/components/navigation/tree" className="group rounded-2xl bg-white/60 p-4 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_45px_-35px_rgba(20,37,26,0.5)]">
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-50 text-primary-700"><LuBraces size={17} /></span>
                  <LuArrowUpRight className="text-primary-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={17} />
                </div>
                <p className="mt-4 text-sm font-semibold text-neutral-950">Tree included</p>
                <p className="mt-1 text-xs leading-5 text-neutral-500">Nested navigation without a paid tier.</p>
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary-800">
              <Badge color="success" variant="soft" isPill>Free to use</Badge>
              <span>Core components stay open for every React project.</span>
            </div>
          </div>

          <LandingSampler />
        </div>
      </section>

      <LandingShowcase />

      <section className="relative overflow-hidden bg-[#eef5e7]">
        <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary-200/35 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-white/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">Start with the surface</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-neutral-950 sm:text-6xl">Make the first screen feel finished.</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">Read the integration guide, bring your own theme, and keep building with the parts your product actually needs.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/rinjani/getting-started/installation">
                <Button size="lg" rightIcon={<LuArrowUpRight size={18} />}>Install Rinjani</Button>
              </Link>
              <a href="https://github.com/mwaziat/rinjani-ui" target="_blank" rel="noreferrer">
                <Button size="lg" variant="outlined" color="neutral" leftIcon={<LuGithub size={18} />}>View on GitHub</Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
