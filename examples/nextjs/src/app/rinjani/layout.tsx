import React from 'react'
import RinjaniLayout from '@/layouts/RinjaniLayout'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RinjaniLayout>{children}</RinjaniLayout>
  )
}

export default layout