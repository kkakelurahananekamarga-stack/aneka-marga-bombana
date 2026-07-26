import type { Metadata } from 'next'
import HeroSection from '@/components/public/HeroSection'
import PotentialFilter from '@/components/public/PotentialFilter'
import { createClient } from '@/lib/supabase/server'
import type { Potential } from '@/types'

export const revalidate = 86400

export const metadata: Metadata = {
    title: 'Potensi Desa',
    description:
        'Potensi sumber daya alam dan ekonomi Desa Aneka Marga meliputi pertanian, perkebunan, peternakan, perikanan, dan wisata.',
    openGraph: {
        title: 'Potensi Desa — Desa Aneka Marga',
        description: 'Potensi sumber daya Desa Aneka Marga: pertanian, perkebunan, peternakan, perikanan, dan wisata.',
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
                title="Potensi Desa"
                subtitle="Kekayaan sumber daya alam dan ekonomi Desa Aneka Marga"
                imageSrc="/hero-desa.png"
                badge="Potensi Lokal"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                        Potensi Desa Aneka Marga
                    </h2>
                    <p className="text-gray-500">
                        Jelajahi beragam potensi yang dimiliki Desa Aneka Marga
                    </p>
                </div>

                {potentials.length === 0 ? (
                    <p className="text-center text-gray-500 py-12">
                        Data potensi desa belum tersedia.
                    </p>
                ) : (
                    <PotentialFilter potentials={potentials} />
                )}
            </div>
        </div>
    )
}
