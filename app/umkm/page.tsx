import type { Metadata } from 'next'
import UmkmFilter from '@/components/public/UmkmFilter'
import { createClient } from '@/lib/supabase/server'
import type { Umkm } from '@/types'

export const revalidate = 3600

export const metadata: Metadata = {
    title: 'UMKM Desa',
    description: 'Daftar Usaha Mikro, Kecil, dan Menengah (UMKM) milik warga Desa Aneka Marga.',
}

async function getUmkm(): Promise<Umkm[]> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('umkm')
            .select('*')
            .order('nama', { ascending: true })
        if (error || !data) return []
        return data as Umkm[]
    } catch {
        return []
    }
}

export default async function UmkmPage() {
    const umkmList = await getUmkm()

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* ── HEADER ── */}
            <section className="bg-white pt-16 pb-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <span className="inline-block bg-desa-100 text-desa-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
                        Katalog Produk Lokal
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 max-w-xl leading-tight">
                        Berdayakan UMKM Desa Aneka Marga
                    </h1>
                    <p className="text-gray-500 max-w-lg leading-relaxed">
                        Temukan produk-produk unggulan karya warga desa, mulai dari hasil tani segar hingga kerajinan tangan estetik yang dibuat dengan cinta.
                    </p>
                </div>
            </section>

            {/* ── KONTEN ── */}
            <section className="py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {umkmList.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-desa-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-desa-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 font-medium">Data UMKM belum tersedia.</p>
                            <p className="text-gray-400 text-sm mt-1">Silakan cek kembali nanti.</p>
                        </div>
                    ) : (
                        <UmkmFilter umkmList={umkmList} />
                    )}
                </div>
            </section>
        </div>
    )
}
