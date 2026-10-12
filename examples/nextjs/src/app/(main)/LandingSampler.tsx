"use client";

import { useState } from "react";
import { Autocomplete, Badge, Button, InputField } from "rinjani-ui";
import { LuArrowUpRight, LuCheck, LuPackage, LuSearch } from "react-icons/lu";

const samplerOptions = [
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "TypeScript", value: "typescript" },
  { label: "Tailwind CSS", value: "tailwind" },
];

export default function LandingSampler() {
  const [samplerValue, setSamplerValue] = useState<string | number>("react");

  return (
    <div className="rounded-3xl bg-white p-5 shadow-[0_24px_70px_-45px_rgba(20,37,26,0.5)] sm:p-7">
      <div className="flex items-center justify-between pb-2">
        <div>
          <p className="text-sm font-semibold text-neutral-950">A clean form surface</p>
          <p className="mt-1 text-xs text-neutral-500">Composed from Rinjani primitives</p>
        </div>
        <Badge color="success" isPill>Ready</Badge>
      </div>

      <div className="grid gap-4 pt-5 sm:grid-cols-2">
        <InputField label="Project name" leftIcon={<LuPackage size={16} />} placeholder="Rinjani dashboard" />
        <InputField label="Status" leftIcon={<LuCheck size={16} />} value="Production" readOnly />
        <div className="sm:col-span-2">
          <Autocomplete
            label="Search a stack"
            leftIcon={<LuSearch size={16} />}
            options={samplerOptions}
            value={samplerValue}
            onChange={(nextValue) => {
              if (typeof nextValue === "object" && nextValue !== null && "value" in nextValue) {
                setSamplerValue(nextValue.value);
                return;
              }

              setSamplerValue(nextValue);
            }}
            placeholder="Type to search..."
            isClearable
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-2">
        <p className="text-xs text-neutral-500">Compose familiar controls. Keep your app lightweight.</p>
        <Button rightIcon={<LuArrowUpRight size={15} />}>Continue</Button>
      </div>
    </div>
  );
}
