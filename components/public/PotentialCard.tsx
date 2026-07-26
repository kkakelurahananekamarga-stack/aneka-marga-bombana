import Image from 'next/image'
import type { Potential } from '@/types'

interface PotentialCardProps {
    potential: Potential
}

const categoryColors: Record<string, string> = {
    Pertanian: 'bg-lime-100 text-lime-700 border-lime-200',
    Perkebunan: 'bg-green-100 text-green-700 border-green-200',
    Peternakan: 'bg-amber-100 text-amber-700 border-amber-200',
    Perikanan: 'bg-blue-100 text-blue-700 border-blue-200',
    Pariwisata: 'bg-purple-100 text-purple-700 border-purple-200',
    UMKM: 'bg-orange-100 text-orange-700 border-orange-200',
}

function getCategoryColor(kategori: string): string {
    return categoryColors[kategori] ?? 'bg-desa-100 text-desa-700 border-desa-200'
}

export default function PotentialCard({ potential }: PotentialCardProps) {
    const { nama, deskripsi, gambar, kategori } = potential

    return (
        <article className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            {/* Foto */}
            <div className="relative w-full h-52 flex-shrink-0 overflow-hidden bg-desa-50">
                {gambar ? (
                    <Image
                        src={gambar}
                        alt={nama}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-desa-50 to-desa-100">
                        <svg className="w-14 h-14 text-desa-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                )}
                {/* Category badge on image */}
                <div className="absolute top-3 right-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${getCategoryColor(kategori)} backdrop-blur-sm`}>
                        {kategori}
                    </span>
                </div>
            </div>

            {/* Konten */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-800 text-base mb-2 leading-snug group-hover:text-desa-600 transition-colors">
                    {nama}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">{deskripsi}</p>
            </div>
        </article>
    )
}
