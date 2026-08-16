'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Pimpinan {
    nama: string
    jabatan: string
    foto: string
    nip?: string
    motto?: string
}

function Modal({ p, onClose }: { p: Pimpinan; onClose: () => void }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Card */}
            <div
                className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header gradasi */}
                <div className="relative h-40 bg-gradient-to-br from-desa-800 via-desa-700 to-emerald-600">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
                        aria-label="Tutup"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Foto menonjol ke atas */}
                <div className="flex flex-col items-center -mt-16 px-6 pb-6">
                    <div className="relative w-32 h-32 rounded-full ring-4 ring-white shadow-2xl overflow-hidden bg-gray-200">
                        <Image
                            src={p.foto}
                            alt={p.nama}
                            fill
                            className="object-cover object-top"
                            sizes="128px"
                        />
                    </div>

                    <h2 className="mt-4 text-lg font-extrabold text-gray-900 text-center">{p.nama}</h2>
                    <span className="mt-1 text-xs font-bold text-desa-600 uppercase tracking-widest bg-desa-50 px-3 py-1 rounded-full">
                        {p.jabatan}
                    </span>

                    {p.nip && (
                        <p className="mt-3 text-xs text-gray-500">NIP: {p.nip}</p>
                    )}

                    {p.motto && (
                        <div className="mt-4 bg-gray-50 rounded-2xl p-4 w-full border border-gray-100">
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Motto</p>
                            <p className="text-sm text-gray-700 italic leading-relaxed">&ldquo;{p.motto}&rdquo;</p>
                        </div>
                    )}

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

export default function PimpinanCard({ p, isMain }: { p: Pimpinan; isMain?: boolean }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`flex-1 relative rounded-3xl overflow-hidden p-6 flex flex-col items-center text-center border border-white/10 cursor-pointer transition-transform hover:scale-105 hover:brightness-110 active:scale-95 ${isMain ? 'ring-2 ring-amber-400/50' : ''}`}
                style={{
                    background: isMain
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)',
                    backdropFilter: 'blur(12px)',
                }}
                aria-label={`Lihat profil ${p.nama}`}
            >
                {isMain && (
                    <div className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                        Pimpinan
                    </div>
                )}

                {/* Foto */}
                <div className={`relative ${isMain ? 'w-32 h-32' : 'w-24 h-24'} rounded-full ring-4 ring-white/40 shadow-xl overflow-hidden bg-white/20`}>
                    <Image
                        src={p.foto}
                        alt={p.nama}
                        fill
                        className="object-cover object-top"
                        sizes="128px"
                    />
                </div>

                <h3 className="mt-4 text-base font-bold text-white">{p.nama}</h3>
                <span className="mt-1 text-xs font-semibold text-amber-300 uppercase tracking-widest">{p.jabatan}</span>

                {/* Hint tap */}
                <span className="mt-3 flex items-center gap-1 text-white/50 text-xs">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Lihat profil
                </span>
            </button>

            {open && <Modal p={p} onClose={() => setOpen(false)} />}
        </>
    )
}
