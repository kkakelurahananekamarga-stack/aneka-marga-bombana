import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/public/HeroSection'
import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/types'

export const revalidate = 0

export const metadata: Metadata = {
    title: 'Desa Aneka Marga — Kecamatan Rarowatu Utara, Kabupaten Bombana',
    description:
        'Selamat datang di website resmi Desa Aneka Marga. Temukan informasi profil desa, pemerintahan, potensi, UMKM, layanan, berita, dan galeri.',
    openGraph: {
        title: 'Desa Aneka Marga',
        description: 'Website resmi Desa Aneka Marga, Kecamatan Rarowatu Utara, Kabupaten Bombana.',
        images: ['/og-default.jpg'],
    },
}

const navMenu = [
    {
        href: '/profil',
        label: 'Profil Desa',
        description: 'Sejarah, visi, misi, dan informasi geografis desa',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        href: '/pemerintahan',
        label: 'Pemerintahan',
        description: 'Struktur organisasi dan perangkat desa',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
    {
        href: '/potensi',
        label: 'Potensi Desa',
        description: 'Sumber daya alam dan ekonomi desa',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        href: '/umkm',
        label: 'UMKM',
        description: 'Usaha mikro, kecil, dan menengah warga desa',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        ),
    },
    {
        href: '/layanan',
        label: 'Layanan',
        description: 'Persyaratan pengurusan surat administrasi',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
    },
    {
        href: '/berita',
        label: 'Berita',
        description: 'Informasi dan kegiatan terbaru desa',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
        ),
    },
    {
        href: '/galeri',
        label: 'Galeri',
        description: 'Dokumentasi foto kegiatan dan pembangunan',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        href: '/kontak',
        label: 'Kontak',
        description: 'Informasi kontak dan lokasi kantor desa',
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
    },
]

// Placeholder data jika Supabase belum dikonfigurasi
const placeholderProfile: Omit<Profile, 'id'> = {
    sejarah: 'Desa Aneka Marga adalah desa yang terletak di Kecamatan Rarowatu Utara, Kabupaten Bombana, Sulawesi Tenggara.',
    visi: 'Terwujudnya Desa Aneka Marga yang maju, mandiri, dan sejahtera.',
    misi: 'Meningkatkan pelayanan kepada masyarakat dan mengembangkan potensi desa.',
    geografis: 'Terletak di wilayah Kecamatan Rarowatu Utara, Kabupaten Bombana.',
    luas: 'Data belum tersedia',
    penduduk: null,
}

async function getProfileData(): Promise<Partial<Profile> | null> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('profil')
            .select('*')
            .limit(1)
            .single()

        if (error || !data) return null
        return data as Profile
    } catch {
        return null
    }
}

export default async function HomePage() {
    const profile = await getProfileData()
    const displayProfile = profile ?? placeholderProfile

    return (
        <div>
            {/* Hero Section */}
            <HeroSection
                title="Selamat Datang di Desa Aneka Marga"
                subtitle={displayProfile.visi ?? 'Kecamatan Rarowatu Utara, Kabupaten Bombana, Sulawesi Tenggara'}
                imageSrc="/hero-desa.png"
                badge="Website Resmi Desa"
            />

            {/* Ringkasan Desa */}
            <section className="py-10 sm:py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                        Tentang Desa Aneka Marga
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                        {displayProfile.sejarah
                            ? displayProfile.sejarah.slice(0, 300) + (displayProfile.sejarah.length > 300 ? '...' : '')
                            : 'Desa Aneka Marga adalah desa yang terletak di Kecamatan Rarowatu Utara, Kabupaten Bombana, Sulawesi Tenggara.'}
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-desa-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Kec. Rarowatu Utara, Kab. Bombana
                        </div>
                        {displayProfile.luas && (
                            <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-desa-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                Luas: {displayProfile.luas}
                            </div>
                        )}
                        {displayProfile.penduduk && (
                            <div className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-desa-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Penduduk: {displayProfile.penduduk}
                            </div>
                        )}
                    </div>
                    <Link
                        href="/profil"
                        className="mt-6 inline-block px-6 py-2.5 bg-desa-600 hover:bg-desa-700 text-white font-medium rounded-lg transition-colors text-sm"
                    >
                        Baca Profil Lengkap
                    </Link>
                </div>
            </section>

            {/* Grid Navigasi Menu Utama */}
            <section className="py-10 sm:py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
                        Jelajahi Desa Aneka Marga
                    </h2>
                    <p className="text-gray-500 text-center text-sm mb-6 sm:mb-8">Temukan berbagai informasi desa melalui menu di bawah ini</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {navMenu.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-desa-200 transition-all flex flex-col items-center text-center gap-2 sm:gap-3"
                            >
                                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-desa-50 group-hover:bg-desa-100 flex items-center justify-center text-desa-600 transition-colors">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 text-xs sm:text-sm group-hover:text-desa-600 transition-colors">
                                        {item.label}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5 leading-snug hidden sm:block">
                                        {item.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
