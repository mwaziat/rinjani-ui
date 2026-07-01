import React from 'react'
import MainLayout from '@/layouts/MainLayout'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainLayout>{children}</MainLayout>
  )
}

export default layout