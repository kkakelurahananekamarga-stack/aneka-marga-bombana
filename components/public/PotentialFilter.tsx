'use client'

import { useState } from 'react'
import PotentialCard from './PotentialCard'
import type { Potential } from '@/types'

const KATEGORI_LIST = ['Semua', 'Pertanian', 'Perkebunan', 'Peternakan', 'Perikanan', 'Wisata']

interface PotentialFilterProps {
    potentials: Potential[]
}

export default function PotentialFilter({ potentials }: PotentialFilterProps) {
    const [activeCategory, setActiveCategory] = useState('Semua')

    // Kumpulkan kategori yang ada di data + default list
    const availableCategories = [
        'Semua',
        ...Array.from(new Set([
            ...KATEGORI_LIST.slice(1),
            ...potentials.map((p) => p.kategori),
        ])),
    ]

    const filtered =
        activeCategory === 'Semua'
            ? potentials
            : potentials.filter((p) => p.kategori === activeCategory)

    return (
        <>
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
                {availableCategories.map((kat) => (
                    <button
                        key={kat}
                        type="button"
                        onClick={() => setActiveCategory(kat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === kat
                                ? 'bg-desa-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-desa-100 hover:text-desa-700'
                            }`}
                    >
                        {kat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <p className="text-center text-gray-500 py-12">
                    Tidak ada data potensi untuk kategori ini.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((potential) => (
                        <PotentialCard key={potential.id} potential={potential} />
                    ))}
                </div>
            )}
        </>
    )
}
