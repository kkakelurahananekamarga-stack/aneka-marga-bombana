import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { News } from '@/types'

export const revalidate = 3600

interface BeritaDetailPageProps {
    params: Promise<{ id: string }>
}

async function getNewsById(id: string): Promise<News | null> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('berita')
            .select('*')
            .eq('id', id)
            .single()

        if (error || !data) return null
        return data as News
    } catch {
        return null
    }
}

export async function generateMetadata({ params }: BeritaDetailPageProps): Promise<Metadata> {
    const { id } = await params
    const article = await getNewsById(id)

    if (!article) {
        return {
            title: 'Berita Tidak Ditemukan',
        }
    }

    return {
        title: article.judul,
        description: article.isi.slice(0, 160),
        openGraph: {
            title: `${article.judul} — Kelurahan Aneka Marga`,
            description: article.isi.slice(0, 160),
            images: article.gambar ? [{ url: article.gambar }] : ['/og-default.jpg'],
            type: 'article',
            publishedTime: article.tanggal,
        },
    }
}

export default async function BeritaDetailPage({ params }: BeritaDetailPageProps) {
    const { id } = await params
    const article = await getNewsById(id)

    if (!article) {
        notFound()
    }

    const formattedDate = new Date(article.tanggal).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
                <ol className="flex items-center gap-2">
                    <li>
                        <Link href="/" className="hover:text-desa-600 transition-colors">
                            Home
                        </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li>
                        <Link href="/berita" className="hover:text-desa-600 transition-colors">
                            Berita
                        </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li className="text-gray-700 truncate max-w-xs">{article.judul}</li>
                </ol>
            </nav>

            {/* Artikel */}
            <article>
                {/* Tanggal */}
                <time
                    dateTime={article.tanggal}
                    className="text-sm text-desa-600 font-medium block mb-3"
                >
                    {formattedDate}
                </time>

                {/* Judul */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-6">
                    {article.judul}
                </h1>

                {/* Gambar */}
                {article.gambar && (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
                        <Image
                            src={article.gambar}
                            alt={article.judul}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 768px"
                            priority
                        />
                    </div>
                )}

                {/* Isi Artikel */}
                <div className="prose prose-gray prose-lg max-w-none">
                    {article.isi.split('\n').map((paragraph, idx) =>
                        paragraph.trim() ? (
                            <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                                {paragraph}
                            </p>
                        ) : (
                            <br key={idx} />
                        )
                    )}
                </div>
            </article>

            {/* Kembali ke Berita */}
            <div className="mt-10 pt-6 border-t border-gray-200">
                <Link
                    href="/berita"
                    className="inline-flex items-center gap-2 text-desa-600 hover:text-desa-700 font-medium transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali ke Berita
                </Link>
            </div>
        </div>
    )
}
