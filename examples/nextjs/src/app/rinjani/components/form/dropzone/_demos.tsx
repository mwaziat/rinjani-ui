"use client"

import React, { useState } from "react"
import { Dropzone } from "rinjani-ui"
import type { FileWithPreview } from "rinjani-ui"

export function BasicDemo() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  return (
    <div className="w-full max-w-lg">
      <Dropzone label="Attachment" values={files} onChange={setFiles} />
    </div>
  )
}

export function MultipleDemo() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  return (
    <div className="w-full max-w-lg">
      <Dropzone
        label="Images"
        values={files}
        onChange={setFiles}
        accept="image/*"
        multiple
        maxFiles={5}
        maxSize={2}
      />
    </div>
  )
}

export function DashedDemo() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  return (
    <div className="w-full max-w-lg">
      <Dropzone label="Upload" values={files} onChange={setFiles} dashed />
    </div>
  )
}

export function ErrorDemo() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  return (
    <div className="w-full max-w-lg">
      <Dropzone label="Required file" values={files} onChange={setFiles} error="Please upload a file." />
    </div>
  )
}
