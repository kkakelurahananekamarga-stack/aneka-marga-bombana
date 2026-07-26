import type { Metadata } from 'next'
import HeroSection from '@/components/public/HeroSection'
import GalleryGrid from '@/components/public/GalleryGrid'
import { createClient } from '@/lib/supabase/server'
import type { GalleryItem } from '@/types'

export const revalidate = 3600

export const metadata: Metadata = {
    title: 'Galeri Foto',
    description:
        'Galeri foto dokumentasi kegiatan, pembangunan, dan kehidupan masyarakat Desa Aneka Marga.',
    openGraph: {
        title: 'Galeri Foto — Desa Aneka Marga',
        description: 'Dokumentasi foto kegiatan dan perkembangan Desa Aneka Marga.',
        images: ['/og-default.jpg'],
    },
}

async function getGallery(): Promise<GalleryItem[]> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('galeri')
            .select('*')
            .order('created_at', { ascending: false })

        if (error || !data) return []
        return data as GalleryItem[]
    } catch {
        return []
    }
}

export default async function GaleriPage() {
    const items = await getGallery()

    return (
        <div>
            <HeroSection
                title="Galeri Foto"
                subtitle="Dokumentasi kegiatan dan perkembangan Desa Aneka Marga"
                imageSrc="/hero-desa.png"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                        Galeri Desa Aneka Marga
                    </h2>
                    <p className="text-gray-500">
                        Klik foto untuk melihat dalam ukuran penuh
                    </p>
                </div>

                <GalleryGrid items={items} />
            </div>
        </div>
    )
}
