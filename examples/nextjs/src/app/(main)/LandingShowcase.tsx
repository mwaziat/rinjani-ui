"use client";

import Link from "next/link";
import { Badge, Button, DataTable, Tree } from "rinjani-ui";
import type { ColumnDef, TreeNodeData } from "rinjani-ui";
import {
  LuArrowRight,
  LuArrowUpRight,
  LuBraces,
  LuCheck,
  LuDatabase,
  LuFile,
  LuFolder,
  LuGithub,
  LuLayers3,
  LuPlus,
} from "react-icons/lu";

type FeatureRow = {
  component: string;
  coverage: string;
  status: "Included";
};

const featureRows: FeatureRow[] = [
  { component: "DataTable", coverage: "Sorting + pagination", status: "Included" },
  { component: "Tree", coverage: "Nested navigation", status: "Included" },
  { component: "Autocomplete", coverage: "Local + live search", status: "Included" },
];

const featureColumns: ColumnDef<FeatureRow>[] = [
  { header: "Component", accessorKey: "component", sortable: true },
  { header: "What ships", accessorKey: "coverage" },
  {
    header: "Access",
    accessorKey: "status",
    cell: () => (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-semibold text-primary-700">
        <LuCheck size={12} /> Free
      </span>
    ),
  },
];

const treeData: TreeNodeData[] = [
  {
    id: "src",
    label: "src",
    icon: <LuFolder size={14} />,
    children: [
      {
        id: "components",
        label: "components",
        icon: <LuFolder size={14} />,
        children: [
          { id: "button", label: "Button.tsx", icon: <LuFile size={14} /> },
          { id: "table", label: "DataTable.tsx", icon: <LuFile size={14} /> },
        ],
      },
      { id: "index", label: "index.ts", icon: <LuFile size={14} /> },
    ],
  },
  { id: "package", label: "package.json", icon: <LuFile size={14} /> },
];

const buttonExamples = [
  { label: "Button XXS", size: "xxs" as const, variant: "filled" as const, icon: <LuPlus size={12} /> },
  { label: "Button XS", size: "xs" as const, variant: "filled" as const, icon: <LuPlus size={13} /> },
  { label: "Button SM", size: "sm" as const, variant: "filled" as const, icon: <LuPlus size={14} /> },
  { label: "Button MD", size: "md" as const, variant: "filled" as const, icon: <LuArrowRight size={15} /> },
  { label: "Button LG", size: "lg" as const, variant: "filled" as const, icon: <LuArrowUpRight size={16} /> },
  { label: "Button XL", size: "xl" as const, variant: "filled" as const, icon: <LuArrowUpRight size={17} /> },
];

export default function LandingShowcase() {
  return (
    <section className="bg-(--docs-paper)">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">More than form controls</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-5xl">The useful data pieces are free, too.</h2>
            <p className="mt-5 max-w-xl leading-7 text-neutral-600">DataTable, Tree, and the controls around them are part of the open component set. No premium tier between your product and the interface it needs.</p>
          </div>
          <Badge color="success" variant="soft" isPill>Open components</Badge>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.55fr_0.8fr]">
          <div className="min-w-0 rounded-3xl bg-white p-5 shadow-[0_24px_70px_-45px_rgba(20,37,26,0.5)] sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
                  <LuDatabase className="text-primary-600" size={17} />
                  DataTable
                </div>
                <p className="mt-1 text-xs text-neutral-500">Sortable data, ready for local or server workflows.</p>
              </div>
              <Link href="/rinjani/components/data-display/data-table" className="hidden items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-900 sm:flex">
                Explore <LuArrowUpRight size={14} />
              </Link>
            </div>
            <div className="overflow-hidden rounded-xl bg-neutral-50/70 px-2 py-1">
              <DataTable data={featureRows} columns={featureColumns} rowKey={(row) => row.component} contained={false} variant="striped" />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 text-neutral-950 shadow-[0_24px_70px_-45px_rgba(20,37,26,0.5)] sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <LuLayers3 className="text-primary-600" size={17} />
                  Tree
                </div>
                <p className="mt-1 text-xs text-neutral-500">Nested navigation without a paid add-on.</p>
              </div>
              <LuBraces className="text-primary-700" size={20} />
            </div>
            <div className="mt-6 rounded-xl bg-primary-50/55 p-3">
              <Tree data={treeData} title="Project files" variant="minimal" defaultExpanded />
            </div>
            <Link href="/rinjani/components/navigation/tree" className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-950">
              See Tree docs <LuArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-5 shadow-[0_24px_70px_-45px_rgba(20,37,26,0.4)] sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
                <LuGithub className="text-primary-600" size={17} />
                Buttons that scale with the action
              </div>
              <p className="mt-1 text-xs text-neutral-500">One API, several sizes, familiar icon placement.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {buttonExamples.map((example) => (
                <Button key={example.label} size={example.size} variant={example.variant} leftIcon={example.icon}>
                  {example.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-500">
          <span className="flex items-center gap-2"><LuCheck className="text-primary-600" size={16} /> No premium data components</span>
          <span className="flex items-center gap-2"><LuCheck className="text-primary-600" size={16} /> TypeScript-first APIs</span>
          <span className="flex items-center gap-2"><LuCheck className="text-primary-600" size={16} /> Tailwind-native styling</span>
        </div>
      </div>
    </section>
  );
}
