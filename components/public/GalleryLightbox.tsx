'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import type { GalleryItem } from '@/types'

interface GalleryLightboxProps {
    items: GalleryItem[]
    selectedIndex: number
    onClose: () => void
    onPrev: () => void
    onNext: () => void
}

export default function GalleryLightbox({
    items,
    selectedIndex,
    onClose,
    onPrev,
    onNext,
}: GalleryLightboxProps) {
    const item = items[selectedIndex]

    // Close on Escape key, navigate with arrow keys
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') onPrev()
            if (e.key === 'ArrowRight') onNext()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose, onPrev, onNext])

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    if (!item) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            role="dialog"
            aria-modal="true"
            aria-label="Lightbox galeri foto"
            onClick={onClose}
        >
            {/* Inner container — stop propagation to avoid closing when clicking inside */}
            <div
                className="relative max-w-5xl w-full mx-4 flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    type="button"
                    className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors p-2"
                    onClick={onClose}
                    aria-label="Tutup lightbox"
                >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image */}
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                    <Image
                        src={item.foto}
                        alt={item.deskripsi ?? `Foto galeri ${selectedIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1280px) 100vw, 1280px"
                        priority
                    />
                </div>

                {/* Description & Counter */}
                {item.deskripsi && (
                    <p className="mt-3 text-white/80 text-sm text-center max-w-2xl">{item.deskripsi}</p>
                )}
                <p className="mt-2 text-white/50 text-xs">
                    {selectedIndex + 1} / {items.length}
                </p>
            </div>

            {/* Prev button */}
            {items.length > 1 && (
                <button
                    type="button"
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition-colors"
                    onClick={(e) => { e.stopPropagation(); onPrev() }}
                    aria-label="Foto sebelumnya"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {/* Next button */}
            {items.length > 1 && (
                <button
                    type="button"
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition-colors"
                    onClick={(e) => { e.stopPropagation(); onNext() }}
                    aria-label="Foto berikutnya"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}
        </div>
    )
}
