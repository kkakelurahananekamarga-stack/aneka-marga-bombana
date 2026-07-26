import Image from 'next/image'
import Link from 'next/link'
import type { News } from '@/types'

interface NewsCardProps {
    news: News
}

export default function NewsCard({ news }: NewsCardProps) {
    const { id, judul, isi, gambar, tanggal } = news

    const excerpt = isi.length > 100 ? isi.slice(0, 100) + '...' : isi

    const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    return (
        <Link href={`/berita/${id}`} className="group block h-full">
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                {/* Thumbnail */}
                <div className="relative w-full h-52 flex-shrink-0 overflow-hidden bg-desa-50">
                    {gambar ? (
                        <Image
                            src={gambar}
                            alt={judul}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-desa-100 to-desa-200">
                            <svg className="w-12 h-12 text-desa-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                    )}
                    {/* Date badge on image */}
                    <div className="absolute top-3 left-3">
                        <time
                            dateTime={tanggal}
                            className="bg-desa-600/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full"
                        >
                            {formattedDate}
                        </time>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-800 text-base leading-snug mb-2 group-hover:text-desa-600 transition-colors line-clamp-2">
                        {judul}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">{excerpt}</p>

                    <div className="mt-4 flex items-center text-desa-600 text-sm font-semibold">
                        Baca selengkapnya
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </article>
        </Link>
    )
}
