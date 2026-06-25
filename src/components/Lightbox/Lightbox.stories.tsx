import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Lightbox } from './Lightbox'
import type { LightboxSlide } from './Lightbox.types'
import { ZoomInIcon } from '../Icons'
import { Button } from '../Button'

const meta: Meta<typeof Lightbox> = {
  title: 'Components/Lightbox',
  component: Lightbox,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    showThumbnails: { control: 'boolean' },
    showZoom: { control: 'boolean' },
    index: { control: 'number' },
    autoplay: { control: 'boolean' },
    autoplayDuration: { control: 'number' },
    isDraggable: { control: 'boolean' },
    loop: { control: 'boolean' },
  },
  args: {
    open: false,
    showThumbnails: true,
    showZoom: true,
    index: 0,
    autoplay: false,
    autoplayDuration: 3000,
    isDraggable: true,
    loop: true,
  },
}

export default meta
type Story = StoryObj<typeof Lightbox>

const sampleSlides: LightboxSlide[] = [
  {
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop',
    title: 'Mountain Peaks',
    description: 'Beautiful mountain range during sunset',
  },
  {
    src: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2070&auto=format&fit=crop',
    title: 'Desert Dunes',
    description: 'Vast desert landscape under clear skies',
  },
  {
    src: 'https://images.unsplash.com/photo-1682695796497-31a44225d6d0?q=80&w=2070&auto=format&fit=crop',
    title: 'Ocean Waves',
    description: 'Crashing waves on a rocky shoreline',
  },
  {
    src: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2070&auto=format&fit=crop',
    title: 'Forest Path',
    description: 'A serene path through a dense forest',
  },
  {
    src: 'https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?q=80&w=2070&auto=format&fit=crop',
    title: 'Canyon River',
    description: 'A winding river through deep canyons',
  },
]

interface DemoLightboxProps {
  title: string
  slides?: LightboxSlide[]
  showThumbnails?: boolean
  showZoom?: boolean
  autoplay?: boolean
  autoplayDuration?: number
  isDraggable?: boolean
  loop?: boolean
}

const DemoLightbox: React.FC<DemoLightboxProps> = ({ 
  title, 
  slides = sampleSlides, 
  showThumbnails = true, 
  showZoom = true,
  autoplay = false,
  autoplayDuration = 3000,
  isDraggable = true,
  loop = true,
}) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const openLightbox = (i: number) => {
    setIndex(i)
    setOpen(true)
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
      <h2 className="text-xl font-bold text-neutral-800 mb-6">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {slides.map((slide, idx) => (
          <div 
            key={idx} 
            className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
            onClick={() => openLightbox(idx)}
          >
            <img 
              src={slide.src} 
              alt={slide.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300 drop-shadow-md">
                <ZoomInIcon size={32} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        showThumbnails={showThumbnails}
        showZoom={showZoom}
        autoplay={autoplay}
        autoplayDuration={autoplayDuration}
        isDraggable={isDraggable}
        loop={loop}
      />
    </div>
  )
}

export const Showcase: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8 w-full">
        <DemoLightbox 
          title="Standard Lightbox" 
        />
        <DemoLightbox 
          title="Without Thumbnails" 
          showThumbnails={false} 
        />
        <DemoLightbox 
          title="Without Zoom Controls" 
          showZoom={false} 
        />
        <DemoLightbox 
          title="Single Image (No Navigation)" 
          slides={sampleSlides.slice(0, 1)} 
        />
        <DemoLightbox 
          title="Autoplay Slider (Auto Loop)" 
          autoplay={true}
          autoplayDuration={2000}
        />
        <DemoLightbox 
          title="No Looping (Stops at ends)" 
          loop={false} 
        />
        <DemoLightbox 
          title="Non-Draggable (Buttons Only)" 
          isDraggable={false} 
        />
      </div>
    )
  }
}

const PlaygroundLightbox: React.FC<React.ComponentProps<typeof Lightbox>> = (args) => {
  const [open, setOpen] = useState(args.open)

  return (
    <div className="flex flex-col items-center justify-center p-12 border border-neutral-200 border-dashed rounded-xl bg-neutral-50 w-full">
      <p className="text-sm text-neutral-500 mb-6">
        Use the Controls tab in Storybook to modify `showThumbnails`, `showZoom`, etc.
      </p>
      <Button variant="filled" color="primary" onClick={() => setOpen(true)}>
        Open Lightbox Playground
      </Button>
      <Lightbox
        {...args}
        open={open}
        close={() => setOpen(false)}
        slides={sampleSlides}
      />
    </div>
  )
}

export const Playground: Story = {
  render: (args) => <PlaygroundLightbox {...args} />
}
