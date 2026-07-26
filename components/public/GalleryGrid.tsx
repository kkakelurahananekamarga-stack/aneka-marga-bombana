'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { GalleryItem } from '@/types'
import GalleryLightbox from './GalleryLightbox'

interface GalleryGridProps {
    items: GalleryItem[]
}

export default function GalleryGrid({ items }: GalleryGridProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    if (items.length === 0) {
        return (
            <p className="text-center text-gray-500 py-12">
                Belum ada foto di galeri.
            </p>
        )
    }

    const openLightbox = (index: number) => setSelectedIndex(index)
    const closeLightbox = () => setSelectedIndex(null)
    const goPrev = () =>
        setSelectedIndex((prev) =>
            prev !== null ? (prev - 1 + items.length) % items.length : null
        )
    const goNext = () =>
        setSelectedIndex((prev) =>
            prev !== null ? (prev + 1) % items.length : null
        )

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {items.map((item, index) => (
                    <button
                        key={item.id}
                        type="button"
                        className="relative aspect-square overflow-hidden rounded-lg bg-desa-100 group focus:outline-none focus:ring-2 focus:ring-desa-500 focus:ring-offset-2"
                        onClick={() => openLightbox(index)}
                        aria-label={item.deskripsi ?? `Buka foto galeri ${index + 1}`}
                    >
                        <Image
                            src={item.foto}
                            alt={item.deskripsi ?? `Foto galeri ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </div>
                    </button>
                ))}
            </div>

            {selectedIndex !== null && (
                <GalleryLightbox
                    items={items}
                    selectedIndex={selectedIndex}
                    onClose={closeLightbox}
                    onPrev={goPrev}
                    onNext={goNext}
                />
            )}
        </>
    )
}
