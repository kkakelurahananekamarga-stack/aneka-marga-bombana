'use client'

import { useState, useMemo } from 'react'
import type { Service } from '@/types'

const SERVICE_ICONS: Record<string, string> = {
    'domisili': '📍',
    'usaha': '🏪',
    'mampu': '📋',
    'pindah': '🔄',
    'ktp': '🪪',
    'kartu keluarga': '👨‍👩‍👧',
    'kematian': '📄',
    'kelahiran': '👶',
}

function getIcon(nama: string) {
    const lower = nama.toLowerCase()
    for (const [key, icon] of Object.entries(SERVICE_ICONS)) {
        if (lower.includes(key)) return icon
    }
    return '📑'
}

function getEstimasi(nama: string) {
    const lower = nama.toLowerCase()
    if (lower.includes('domisili')) return '15 Menit'
    if (lower.includes('usaha')) return '1 Hari Kerja'
    if (lower.includes('mampu')) return '30 Menit'
    if (lower.includes('pindah')) return '2 Hari Kerja'
    if (lower.includes('ktp')) return '1 Hari Kerja'
    if (lower.includes('keluarga')) return '2 Hari Kerja'
    if (lower.includes('kematian')) return '30 Menit'
    if (lower.includes('kelahiran')) return '1 Hari Kerja'
    return '1 Hari Kerja'
}

interface LayananListProps {
    services: Service[]
}

export default function LayananList({ services }: LayananListProps) {
    const [search, setSearch] = useState('')
    const [openId, setOpenId] = useState<string | null>(services[0]?.id ?? null)

    const filtered = useMemo(() =>
        services.filter((s) =>
            s.nama.toLowerCase().includes(search.toLowerCase()) ||
            s.persyaratan.toLowerCase().includes(search.toLowerCase())
        ),
        [services, search]
    )

    const persyaratanList = (text: string) =>
        text.split('\n').map((s) => s.trim()).filter(Boolean)

    return (
        <div>
            {/* Search */}
            <div className="relative mb-4">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="search"
                    placeholder="Cari layanan..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-desa-500 bg-white"
                />
            </div>

            {/* Accordion */}
            <div className="space-y-2">
                {filtered.length === 0 ? (
                    <p className="text-center text-gray-400 py-8 text-sm">Layanan tidak ditemukan.</p>
                ) : (
                    filtered.map((service) => {
                        const isOpen = openId === service.id
                        const items = persyaratanList(service.persyaratan)
                        return (
                            <div key={service.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                                <button
                                    type="button"
                                    onClick={() => setOpenId(isOpen ? null : service.id)}
                                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <div className="w-9 h-9 bg-desa-50 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">
                                        {getIcon(service.nama)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 text-sm">{service.nama}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            Estimasi: {getEstimasi(service.nama)} • Biaya: <span className="text-desa-600">Gratis</span>
                                        </p>
                                    </div>
                                    <svg
                                        className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isOpen && (
                                    <div className="px-4 pb-4 border-t border-gray-100">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-3 mb-2">
                                            Persyaratan:
                                        </p>
                                        <ul className="space-y-1.5">
                                            {items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <svg className="w-4 h-4 text-desa-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )
                    })
                )}
            </div>

            {/* Info */}
            <div className="mt-4 flex gap-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-700 leading-relaxed">
                    Pengajuan melalui platform online akan diverifikasi dalam 1×24 jam. Anda akan menerima notifikasi via WhatsApp setelah surat siap diambil.
                </p>
            </div>
        </div>
    )
}
