import type { Metadata } from 'next'
import LayananList from '@/components/public/LayananList'
import { createClient } from '@/lib/supabase/server'
import type { Service } from '@/types'

export const revalidate = 0

export const metadata: Metadata = {
    title: 'Layanan Administrasi',
    description: 'Daftar layanan administrasi Kelurahan Aneka Marga beserta persyaratan dan estimasi waktu pengurusan surat.',
}

async function getServices(): Promise<Service[]> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('layanan')
            .select('*')
            .order('nama', { ascending: true })
        if (error || !data) return []
        return data as Service[]
    } catch {
        return []
    }
}

export default async function LayananPage() {
    const services = await getServices()

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* ── HEADER ── */}
            <section className="bg-white pt-14 pb-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <span className="inline-flex items-center gap-1.5 bg-desa-100 text-desa-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Administrasi Digital
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 max-w-xl leading-tight">
                        Layanan Administrasi Kelurahan
                    </h1>
                    <p className="text-gray-500 max-w-md leading-relaxed">
                        Dapatkan kemudahan dalam mengurus berbagai keperluan surat-menyurat secara transparan dan efisien langsung dari smartphone Anda.
                    </p>
                </div>
            </section>

            {/* ── KONTEN 2 KOLOM ── */}
            <section className="py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">

                    {/* Kiri: Jam Operasional + Foto */}
                    <div className="space-y-4">
                        {/* Jam Operasional */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h2 className="font-bold text-gray-900 text-base mb-5">Jam Operasional</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Senin – Kamis</span>
                                    <span className="font-semibold text-gray-900">08:00 – 15:30</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Jumat</span>
                                    <span className="font-semibold text-gray-900">08:00 – 11:30</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-red-500 font-medium">Sabtu – Minggu</span>
                                    <span className="font-semibold text-red-500">Tutup</span>
                                </div>
                            </div>

                            <div className="mt-5 pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wide mb-2">Butuh Bantuan?</p>
                                <a
                                    href="https://wa.me/6281234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-desa-600 hover:text-desa-700 text-sm font-semibold"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Hubungi WhatsApp Kelurahan
                                </a>
                            </div>
                        </div>

                        {/* Foto */}
                        <div className="relative rounded-2xl overflow-hidden h-52 shadow-sm">
                            <img
                                src="/hero-desa.png"
                                alt="Kantor Kelurahan Aneka Marga"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <p className="absolute bottom-4 left-4 text-white font-bold text-sm">Melayani Dengan Sepenuh Hati</p>
                        </div>
                    </div>

                    {/* Kanan: Daftar Layanan */}
                    <div>
                        <h2 className="font-bold text-gray-900 text-lg mb-4">Daftar Persyaratan Surat</h2>
                        {services.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
                                <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-400 text-sm">Data layanan belum tersedia.</p>
                            </div>
                        ) : (
                            <LayananList services={services} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
