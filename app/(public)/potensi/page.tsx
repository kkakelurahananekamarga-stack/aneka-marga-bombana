import type { Metadata } from 'next'
import HeroSection from '@/components/public/HeroSection'
import PotentialFilter from '@/components/public/PotentialFilter'
import { createClient } from '@/lib/supabase/server'
import type { Potential } from '@/types'

export const revalidate = 0

export const metadata: Metadata = {
    title: 'Potensi Kelurahan',
    description:
        'Potensi sumber daya alam dan ekonomi Kelurahan Aneka Marga meliputi pertanian, perkebunan, peternakan, perikanan, dan wisata.',
    openGraph: {
        title: 'Potensi Kelurahan — Kelurahan Aneka Marga',
        description: 'Potensi sumber daya Kelurahan Aneka Marga: pertanian, perkebunan, peternakan, perikanan, dan wisata.',
        images: ['/og-default.jpg'],
    },
}

async function getPotentials(): Promise<Potential[]> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('potensi')
            .select('*')
            .order('nama', { ascending: true })

        if (error || !data) return []
        return data as Potential[]
    } catch {
        return []
    }
}

export default async function PotensiPage() {
    const potentials = await getPotentials()

    return (
        <div>
            <HeroSection
                title="Potensi Kelurahan"
                subtitle="Kekayaan sumber daya alam dan ekonomi Kelurahan Aneka Marga"
                imageSrc="/hero-desa.png"
                badge="Potensi Lokal"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                <div className="text-center mb-8">
                    <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2">
                        Potensi Kelurahan Aneka Marga
                    </h2>
                    <p className="text-gray-500 text-sm">Jelajahi beragam potensi yang dimiliki Kelurahan Aneka Marga</p>
                </div>

                {potentials.length === 0 ? (
                    <p className="text-center text-gray-500 py-12">
                        Data potensi kelurahan belum tersedia.
                    </p>
                ) : (
                    <PotentialFilter potentials={potentials} />
                )}
            </div>
        </div>
    )
}
