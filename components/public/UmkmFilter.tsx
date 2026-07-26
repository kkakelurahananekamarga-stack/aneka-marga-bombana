'use client'

import { useState, useMemo } from 'react'
import UmkmCard from './UmkmCard'
import type { Umkm } from '@/types'

const CATEGORIES = ['Semua', 'Pertanian', 'Kerajinan', 'Makanan & Minuman', 'Jasa Lokal']

interface UmkmFilterProps {
    umkmList: Umkm[]
}

export default function UmkmFilter({ umkmList }: UmkmFilterProps) {
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('Semua')

    const filtered = useMemo(() => {
        return umkmList.filter((u) => {
            const matchSearch =
                search === '' ||
                u.nama.toLowerCase().includes(search.toLowerCase()) ||
                u.deskripsi.toLowerCase().includes(search.toLowerCase())

            const matchCategory =
                activeCategory === 'Semua' ||
                (u.kategori ?? '').toLowerCase() === activeCategory.toLowerCase()

            return matchSearch && matchCategory
        })
    }, [umkmList, search, activeCategory])

    return (
        <div>
            {/* Search + Filter bar */}
            <div className="flex gap-3 mb-6">
                <div className="relative flex-1">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="search"
                        placeholder="Cari produk atau usaha..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-desa-500 focus:border-transparent bg-white"
                    />
                </div>
            </div>

            {/* Kategori pills */}
            <div className="flex flex-wrap gap-2 mb-8">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat
                                ? 'bg-desa-700 text-white'
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Jumlah hasil */}
            {(search || activeCategory !== 'Semua') && (
                <p className="text-sm text-gray-500 mb-4">
                    Menampilkan <span className="font-semibold text-gray-800">{filtered.length}</span> hasil
                    {activeCategory !== 'Semua' && <> untuk kategori <span className="font-semibold text-desa-700">{activeCategory}</span></>}
                </p>
            )}

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-medium mb-1">Tidak ada UMKM ditemukan</p>
                    <button
                        type="button"
                        onClick={() => { setSearch(''); setActiveCategory('Semua') }}
                        className="text-xs text-desa-600 hover:underline mt-1"
                    >
                        Reset filter
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((umkm) => (
                        <UmkmCard key={umkm.id} umkm={umkm} />
                    ))}
                </div>
            )}
        </div>
    )
}
