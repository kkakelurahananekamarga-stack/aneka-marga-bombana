import type { Metadata } from 'next'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import type { Official } from '@/types'

export const revalidate = 86400

export const metadata: Metadata = {
    title: 'Pemerintahan Desa',
    description: 'Struktur organisasi pemerintahan Desa Aneka Marga beserta foto dan jabatan setiap perangkat desa.',
}

async function getOfficials(): Promise<Official[]> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('pejabat')
            .select('*')
            .order('urutan', { ascending: true })
        if (error || !data) return []
        return data as Official[]
    } catch {
        return []
    }
}

function getInitials(name: string) {
    return name.split(' ').slice(0, 2).map((n) => n[0].toUpperCase()).join('')
}

function AvatarCircle({ foto, nama, size = 'md' }: { foto: string | null; nama: string; size?: 'lg' | 'md' }) {
    const dim = size === 'lg' ? 'w-32 h-32' : 'w-20 h-20'
    const textSize = size === 'lg' ? 'text-3xl' : 'text-xl'
    return (
        <div className={`relative ${dim} flex-shrink-0`}>
            {foto ? (
                <Image
                    src={foto}
                    alt={nama}
                    fill
                    className="object-cover rounded-full ring-4 ring-white shadow-lg"
                    sizes={size === 'lg' ? '128px' : '80px'}
                />
            ) : (
                <div className={`${dim} rounded-full bg-gradient-to-br from-desa-400 to-desa-700 flex items-center justify-center ring-4 ring-white shadow-lg`}>
                    <span className={`text-white font-bold ${textSize}`}>{getInitials(nama)}</span>
                </div>
            )}
        </div>
    )
}

export default async function PemerintahanPage() {
    const officials = await getOfficials()
    const kepalaDesa = officials.find((o) => o.urutan === 1) ?? officials[0] ?? null
    const perangkat = officials.filter((o) => o !== kepalaDesa)

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* ── HEADER SECTION ── */}
            <section className="bg-white pt-10 sm:pt-16 pb-8 sm:pb-12 text-center px-4">
                <span className="inline-block bg-desa-100 text-desa-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
                    Transparansi Publik
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    Struktur Pemerintahan Desa
                </h1>
                <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                    Mewujudkan tata kelola desa yang bersih, transparan, dan profesional untuk
                    kemajuan seluruh masyarakat Desa Aneka Marga.
                </p>
            </section>

            {/* ── KEPALA DESA ── */}
            <section className="py-10 pb-14 px-4">
                <div className="max-w-xs mx-auto">
                    {kepalaDesa ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
                            <AvatarCircle foto={kepalaDesa.foto} nama={kepalaDesa.nama} size="lg" />
                            <h2 className="mt-5 text-xl font-bold text-gray-900">{kepalaDesa.nama}</h2>
                            <span className="mt-1 text-xs font-bold text-desa-600 uppercase tracking-widest">
                                {kepalaDesa.jabatan}
                            </span>
                            <div className="mt-4 flex items-center gap-4 text-gray-400">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-200 p-8 text-center text-gray-400">
                            Data kepala desa belum tersedia.
                        </div>
                    )}

                    {/* Garis penghubung ke bawah */}
                    {perangkat.length > 0 && (
                        <div className="flex justify-center py-4">
                            <div className="w-px h-12 bg-gray-300" />
                        </div>
                    )}
                </div>
            </section>

            {/* ── PERANGKAT DESA ── */}
            {perangkat.length > 0 && (
                <section className="pb-10 px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                            {perangkat.map((official) => (
                                <div
                                    key={official.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <AvatarCircle foto={official.foto} nama={official.nama} />
                                    <h3 className="mt-3 font-semibold text-gray-800 text-sm leading-snug">{official.nama}</h3>
                                    <span className="mt-1 text-xs font-bold text-desa-600 uppercase tracking-wider">
                                        {official.jabatan}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── VISI & HUBUNGI ── */}
            <section className="py-10 px-4 bg-white">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Visi card */}
                    <div className="rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-sm border border-gray-100">
                        <div className="relative w-full sm:w-40 h-48 sm:h-auto flex-shrink-0">
                            <Image
                                src="/hero-desa.png"
                                alt="Desa Aneka Marga"
                                fill
                                className="object-cover"
                                sizes="160px"
                            />
                        </div>
                        <div className="p-6 flex flex-col justify-center bg-white">
                            <p className="text-xs font-bold text-desa-600 uppercase tracking-widest mb-2">Visi &amp; Misi 2024</p>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Aneka Marga Digital</h3>
                            <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                Kami berupaya mengintegrasikan teknologi digital dalam setiap aspek pelayanan publik untuk menciptakan efisiensi dan transparansi mutlak bagi warga.
                            </p>
                            <ul className="space-y-1.5">
                                {['Pelayanan Mandiri Online', 'Transparansi Dana Desa'].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-desa-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Hubungi Kami */}
                    <div className="bg-desa-800 text-white rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <h3 className="text-lg font-bold mb-2">Hubungi Kami</h3>
                            <p className="text-desa-200 text-sm leading-relaxed mb-6">
                                Butuh bantuan atau ingin menyampaikan aspirasi? Kami siap melayani Anda.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <a
                                href="tel:+6281234567890"
                                className="flex items-center gap-3 bg-desa-700 hover:bg-desa-600 rounded-xl px-4 py-3 transition-colors"
                            >
                                <div className="w-8 h-8 bg-desa-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-white">+62 812-3456-7890</span>
                            </a>
                            <div className="flex items-center gap-3 bg-desa-700 rounded-xl px-4 py-3">
                                <div className="w-8 h-8 bg-desa-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-white">Jl. Marga Utama No. 01, Aneka Marga</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATISTIK ── */}
            <section className="py-8 sm:py-16 bg-gray-50 px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    {[
                        { value: '±1.500', label: 'Total Penduduk' },
                        { value: String(officials.length || 8), label: 'Perangkat Desa' },
                        { value: '15', label: 'Program Unggulan' },
                        { value: '98%', label: 'Kepuasan Layanan' },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p className="text-2xl sm:text-4xl font-extrabold text-desa-700">{stat.value}</p>
                            <p className="text-gray-500 text-xs sm:text-sm mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
