'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Official } from '@/types'

function getInitials(name: string) {
    return name.split(' ').slice(0, 2).map(n => n[0]?.toUpperCase() ?? '').join('')
}

function Modal({ official, onClose }: { official: Official; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
                className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative h-32 bg-gradient-to-br from-desa-800 via-desa-700 to-teal-600">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Foto */}
                <div className="flex flex-col items-center -mt-14 px-6 pb-6">
                    <div className="relative w-28 h-28 rounded-full ring-4 ring-white shadow-xl overflow-hidden bg-gray-100">
                        {official.foto ? (
                            <Image src={official.foto} alt={official.nama} fill className="object-cover object-top" sizes="112px" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-desa-400 to-desa-700">
                                <span className="text-white font-bold text-2xl">{getInitials(official.nama)}</span>
                            </div>
                        )}
                    </div>

                    <h2 className="mt-4 text-lg font-extrabold text-gray-900 text-center">{official.nama}</h2>
                    <span className="mt-1 text-xs font-bold text-desa-600 uppercase tracking-widest bg-desa-50 px-3 py-1 rounded-full">
                        {official.jabatan}
                    </span>

                    <div className="mt-4 w-full bg-desa-50 rounded-2xl p-4 border border-desa-100">
                        <p className="text-xs text-desa-500 uppercase tracking-widest mb-1">Instansi</p>
                        <p className="text-sm font-semibold text-desa-800">Kelurahan Aneka Marga</p>
                        <p className="text-xs text-desa-600">Kec. Rarowatu Utara, Kab. Bombana</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function OfficialCard({ official, variant = 'small', number }: {
    official: Official
    variant?: 'teal' | 'small'
    number?: number
}) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`w-full text-left cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${variant === 'teal'
                        ? 'group bg-white rounded-2xl shadow-sm border border-teal-100 p-5 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1'
                        : 'bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-0.5'
                    }`}
            >
                {variant === 'teal' && number && (
                    <div className="self-start mb-2 w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">{number}</div>
                )}

                {/* Avatar */}
                {official.foto ? (
                    <div className={`relative rounded-full ring-4 ring-white shadow-md overflow-hidden ${variant === 'teal' ? 'w-16 h-16' : 'w-12 h-12 ring-2'}`}>
                        <Image src={official.foto} alt={official.nama} fill className="object-cover object-top" sizes="64px" />
                    </div>
                ) : (
                    <div className={`rounded-full flex items-center justify-center ring-white shadow-md ${variant === 'teal'
                            ? 'w-16 h-16 ring-4 bg-gradient-to-br from-teal-400 to-emerald-600'
                            : 'w-12 h-12 ring-2 bg-gradient-to-br from-desa-300 to-desa-600'
                        }`}>
                        <span className={`text-white font-bold ${variant === 'teal' ? 'text-base' : 'text-sm'}`}>
                            {getInitials(official.nama)}
                        </span>
                    </div>
                )}

                <h3 className={`mt-2 font-semibold text-gray-800 leading-snug ${variant === 'teal' ? 'mt-3 text-sm' : 'text-xs'}`}>
                    {official.nama}
                </h3>
                <span className={`mt-1 font-bold rounded-full ${variant === 'teal'
                        ? 'text-xs text-teal-700 bg-teal-50 px-3 py-1 mt-1.5'
                        : 'text-xs text-desa-500 bg-desa-50 px-2 py-0.5'
                    }`}>
                    {official.jabatan}
                </span>

                <span className="mt-2 text-xs text-gray-300 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Lihat profil
                </span>
            </button>

            {open && <Modal official={official} onClose={() => setOpen(false)} />}
        </>
    )
}
