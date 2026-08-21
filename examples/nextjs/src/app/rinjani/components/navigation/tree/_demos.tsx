"use client"

import React, { useState } from "react"
import { Tree } from "rinjani-ui"
import type { TreeNodeData } from "rinjani-ui"
import { FiFolder, FiFile } from "react-icons/fi"

const sampleData: TreeNodeData[] = [
  {
    id: "1", label: "src",
    icon: <FiFolder size={14} />,
    children: [
      {
        id: "1-1", label: "components",
        icon: <FiFolder size={14} />,
        children: [
          { id: "1-1-1", label: "Button.tsx", icon: <FiFile size={14} /> },
          { id: "1-1-2", label: "Badge.tsx", icon: <FiFile size={14} /> },
        ],
      },
      { id: "1-2", label: "index.ts", icon: <FiFile size={14} /> },
    ],
  },
  {
    id: "2", label: "public",
    icon: <FiFolder size={14} />,
    children: [
      { id: "2-1", label: "favicon.ico", icon: <FiFile size={14} /> },
    ],
  },
  { id: "3", label: "package.json", icon: <FiFile size={14} /> },
]

export function BasicDemo() {
  return (
    <div className="w-72">
      <Tree data={sampleData} title="Project files" />
    </div>
  )
}

export function VariantsDemo() {
  return (
    <div className="flex gap-6 flex-wrap">
      {(["minimal", "lined", "filled"] as const).map((variant) => (
        <div key={variant} className="w-56">
          <Tree data={sampleData} title={variant} variant={variant} />
        </div>
      ))}
    </div>
  )
}

export function NumberingDemo() {
  return (
    <div className="w-72">
      <Tree data={sampleData} title="Numbered tree" deepLevelNumbering defaultExpanded />
    </div>
  )
}

export function ActiveNodeDemo() {
  const [activeId, setActiveId] = useState<string | number>("1-1-1")
  return (
    <div className="w-72">
      <Tree
        data={sampleData}
        title="Click a node"
        activeNodeId={activeId}
        onNodeClick={(node) => setActiveId(node.id)}
        defaultExpanded
      />
    </div>
  )
}
