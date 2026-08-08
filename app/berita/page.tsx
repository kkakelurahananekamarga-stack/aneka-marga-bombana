import type { Metadata } from 'next'
import HeroSection from '@/components/public/HeroSection'
import NewsCard from '@/components/public/NewsCard'
import { createClient } from '@/lib/supabase/server'
import { sortNewsByDate } from '@/lib/utils'
import type { News } from '@/types'

export const revalidate = 0

export const metadata: Metadata = {
    title: 'Berita Kelurahan',
    description:
        'Berita dan informasi terbaru tentang kegiatan dan perkembangan Kelurahan Aneka Marga.',
    openGraph: {
        title: 'Berita Kelurahan — Kelurahan Aneka Marga',
        description: 'Berita dan informasi terbaru Kelurahan Aneka Marga.',
        images: ['/og-default.jpg'],
    },
}

async function getNews(): Promise<News[]> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('berita')
            .select('*')
            .order('created_at', { ascending: false })

        if (error || !data) return []
        return sortNewsByDate(data as News[])
    } catch {
        return []
    }
}

export default async function BeritaPage() {
    const newsList = await getNews()

    return (
        <div>
            <HeroSection
                title="Berita Kelurahan"
                subtitle="Informasi dan kegiatan terbaru Kelurahan Aneka Marga"
                imageSrc="/hero-desa.png"
                badge="Berita Terkini"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                <div className="text-center mb-8">
                    <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2">
                        Berita Terkini
                    </h2>
                    <p className="text-gray-500 text-sm">Ikuti perkembangan dan kegiatan Kelurahan Aneka Marga</p>
                </div>

                {newsList.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <p className="text-gray-500">Belum ada berita yang diterbitkan.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsList.map((news) => (
                            <NewsCard key={news.id} news={news} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
