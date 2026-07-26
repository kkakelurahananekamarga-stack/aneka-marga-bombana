import Image from 'next/image'
import type { Official } from '@/types'

interface OfficialCardProps {
    official: Official
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .slice(0, 2)
        .map((n) => n.charAt(0).toUpperCase())
        .join('')
}

export default function OfficialCard({ official }: OfficialCardProps) {
    const { nama, jabatan, foto } = official

    return (
        <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
            {/* Background accent */}
            <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-desa-50 to-transparent" aria-hidden="true" />

            {/* Foto / Avatar */}
            <div className="relative w-24 h-24 mb-4 flex-shrink-0 z-10">
                {foto ? (
                    <>
                        <Image
                            src={foto}
                            alt={`Foto ${nama}`}
                            fill
                            className="object-cover rounded-full ring-4 ring-white shadow-md group-hover:ring-desa-200 transition-all"
                            sizes="96px"
                        />
                    </>
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-desa-400 to-desa-600 flex items-center justify-center ring-4 ring-white shadow-md">
                        <span className="text-white font-bold text-xl" aria-hidden="true">
                            {getInitials(nama)}
                        </span>
                        <span className="sr-only">Foto {nama} tidak tersedia</span>
                    </div>
                )}
            </div>

            {/* Jabatan badge */}
            <span className="inline-block bg-desa-100 text-desa-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                {jabatan}
            </span>

            {/* Nama */}
            <h3 className="font-bold text-gray-800 text-sm leading-snug">{nama}</h3>
        </div>
    )
}
