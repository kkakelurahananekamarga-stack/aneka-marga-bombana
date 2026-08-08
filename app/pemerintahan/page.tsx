import type { Metadata } from 'next'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import type { Official } from '@/types'

export const revalidate = 0

export const metadata: Metadata = {
    title: 'Pemerintahan Kelurahan',
    description: 'Struktur organisasi pemerintahan Kelurahan Aneka Marga beserta jabatan setiap perangkat kelurahan.',
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
    if (!name || name === '—') return '?'
    return name.split(' ').slice(0, 2).map((n) => n[0]?.toUpperCase() ?? '').join('')
}

function Avatar({ nama, foto, size = 'md', light = false }: {
    nama: string; foto?: string | null
    size?: 'xl' | 'lg' | 'md' | 'sm'
    light?: boolean
}) {
    const dim = size === 'xl' ? 'w-32 h-32' : size === 'lg' ? 'w-24 h-24' : size === 'md' ? 'w-16 h-16' : 'w-12 h-12'
    const text = size === 'xl' ? 'text-3xl' : size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-base' : 'text-sm'
    const ring = light ? 'ring-white/40' : 'ring-white'
    if (foto) {
        return (
            <div className={`relative ${dim} flex-shrink-0`}>
                <Image src={foto} alt={nama} fill className={`object-cover rounded-full ring-4 ${ring} shadow-xl`} sizes="128px" />
            </div>
        )
    }
    return (
        <div className={`${dim} rounded-full flex items-center justify-center ring-4 ${ring} shadow-xl flex-shrink-0 ${light
            ? 'bg-white/20 backdrop-blur-sm'
            : 'bg-gradient-to-br from-desa-400 to-desa-700'}`}>
            <span className={`font-bold ${text} ${light ? 'text-white' : 'text-white'}`}>{getInitials(nama)}</span>
        </div>
    )
}

export default async function PemerintahanPage() {
    const officials = await getOfficials()

    const pimpinan = officials.filter((o) => o.kategori === 'pimpinan')
    const perangkat = officials.filter((o) => o.kategori === 'perangkat')
    const lingkungan = officials.filter((o) => o.kategori === 'lingkungan')
    const rt = officials.filter((o) => o.kategori === 'rt')
    const posyandu = officials.filter((o) => o.kategori === 'posyandu')
    const ketuaPos = posyandu.find((o) => o.jabatan.toLowerCase().includes('ketua'))
    const anggotaPos = posyandu.filter((o) => o !== ketuaPos)

    return (
        <div className="min-h-screen">

            {/* ══ HERO BANNER — gradasi + motif Sosoronga ══════════════ */}
            <section className="relative overflow-hidden">
                {/* Gradasi hijau → teal → emas khas Bombana */}
                <div className="absolute inset-0 bg-gradient-to-br from-desa-900 via-desa-700 to-emerald-500" />
                {/* Overlay gradasi warna emas di kanan */}
                <div className="absolute inset-0 bg-gradient-to-l from-amber-700/30 via-transparent to-transparent" />
                {/* Motif Sosoronga SVG samar */}
                <div className="absolute inset-0 opacity-[0.1]"
                    style={{
                        backgroundImage: `url('/motif-sosoronga.svg')`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '200px 220px',
                    }}
                />
                {/* Motif Bosu-Bosu di bagian bawah hero */}
                <div className="absolute bottom-0 left-0 right-0 h-24 opacity-[0.15]"
                    style={{
                        backgroundImage: `url('/motif-burisininta.svg')`,
                        backgroundRepeat: 'repeat-x',
                        backgroundSize: '100px 100px',
                        backgroundPosition: 'bottom',
                    }}
                />

                <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center">
                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6 border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        Transparansi Publik
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
                        Struktur Pemerintahan
                        <span className="block text-amber-300 mt-1">Kelurahan Aneka Marga</span>
                    </h1>
                    <p className="text-white/75 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                        Mewujudkan tata kelola kelurahan yang bersih, transparan, dan profesional
                        untuk kemajuan seluruh masyarakat.
                    </p>

                    {/* Statistik di hero */}
                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                        {[
                            { v: '±1.500', l: 'Penduduk' },
                            { v: String(lingkungan.length || 3), l: 'Kepala Lingkungan' },
                            { v: String(rt.length || 7), l: 'Ketua RT' },
                            { v: String(posyandu.length || 5), l: 'Kader Posyandu' },
                        ].map((s) => (
                            <div key={s.l} className="bg-white/10 backdrop-blur-sm rounded-2xl px-3 py-4 border border-white/20">
                                <p className="text-2xl font-extrabold text-amber-300">{s.v}</p>
                                <p className="text-white/70 text-xs mt-0.5">{s.l}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ PIMPINAN ═══════════════════════════════════════════════ */}
            {pimpinan.length > 0 && (
                <section className="relative overflow-hidden py-14 px-4">
                    {/* Background gradasi Burisininta */}
                    <div className="absolute inset-0 bg-gradient-to-b from-desa-800 to-desa-900" />
                    <div className="absolute inset-0 opacity-[0.1]"
                        style={{
                            backgroundImage: `url('/motif-burisininta.svg')`,
                            backgroundRepeat: 'repeat',
                            backgroundSize: '100px 200px',
                        }}
                    />
                    <div className="relative max-w-2xl mx-auto">
                        <div className="text-center mb-8">
                            <span className="inline-block text-amber-300 text-xs font-bold uppercase tracking-widest mb-2">Pimpinan Kelurahan</span>
                            <div className="w-12 h-0.5 bg-amber-400 mx-auto rounded-full" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            {pimpinan.map((p, i) => (
                                <div key={p.id}
                                    className="flex-1 relative rounded-3xl overflow-hidden p-6 flex flex-col items-center text-center border border-white/10"
                                    style={{
                                        background: i === 0
                                            ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'
                                            : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                                        backdropFilter: 'blur(12px)',
                                    }}
                                >
                                    {i === 0 && (
                                        <div className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                                            Pimpinan
                                        </div>
                                    )}
                                    <Avatar nama={p.nama} foto={p.foto} size={i === 0 ? 'xl' : 'lg'} light />
                                    <h3 className="mt-4 text-base font-bold text-white">{p.nama}</h3>
                                    <span className="mt-1 text-xs font-semibold text-amber-300 uppercase tracking-widest">{p.jabatan}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ══ PERANGKAT ══════════════════════════════════════════════ */}
            {perangkat.length > 0 && (
                <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-3xl mx-auto">
                        <SectionHeading title="Perangkat Kelurahan" color="green" />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {perangkat.map((p) => <GreenCard key={p.id} official={p} />)}
                        </div>
                    </div>
                </section>
            )}

            {/* ══ KEPALA LINGKUNGAN ══════════════════════════════════════ */}
            {lingkungan.length > 0 && (
                <section className="py-12 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50" />
                    <div className="relative max-w-3xl mx-auto">
                        <SectionHeading title="Kepala Lingkungan" color="teal" />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {lingkungan.map((l, i) => <TealCard key={l.id} official={l} number={i + 1} />)}
                        </div>
                    </div>
                </section>
            )}

            {/* ══ KETUA RT ═══════════════════════════════════════════════ */}
            {rt.length > 0 && (
                <section className="py-12 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <SectionHeading title="Ketua RT" color="green" />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {rt.map((r) => <SmallCard key={r.id} official={r} />)}
                        </div>
                    </div>
                </section>
            )}

            {/* ══ KADER POSYANDU ═════════════════════════════════════════ */}
            {posyandu.length > 0 && (
                <section className="py-12 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-pink-50" />
                    <div className="relative max-w-2xl mx-auto">
                        <SectionHeading title="Kader Posyandu" color="rose" />
                        <div className="bg-white rounded-3xl shadow-md border border-rose-100 overflow-hidden">
                            {/* Header posyandu */}
                            <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4">
                                <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Kesehatan Masyarakat</p>
                            </div>
                            <div className="p-6">
                                {ketuaPos && (
                                    <div className="flex flex-col items-center mb-6 pb-6 border-b border-rose-100">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center ring-4 ring-rose-100 shadow-lg">
                                            <span className="text-white font-bold text-lg">{getInitials(ketuaPos.nama)}</span>
                                        </div>
                                        <h3 className="mt-3 font-bold text-gray-900 text-sm">{ketuaPos.nama}</h3>
                                        <span className="mt-1 text-xs font-bold text-rose-600 uppercase tracking-wider">{ketuaPos.jabatan}</span>
                                    </div>
                                )}
                                {anggotaPos.length > 0 && (
                                    <>
                                        <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4">Anggota</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {anggotaPos.map((a) => (
                                                <div key={a.id} className="flex flex-col items-center text-center">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-300 to-pink-500 flex items-center justify-center ring-2 ring-rose-100 shadow">
                                                        <span className="text-white font-bold text-sm">{getInitials(a.nama)}</span>
                                                    </div>
                                                    <span className="mt-2 text-xs font-medium text-gray-700 leading-snug">{a.nama}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ══ VISI & HUBUNGI ═════════════════════════════════════════ */}
            <section className="py-12 px-4 bg-white">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="rounded-3xl overflow-hidden flex flex-col sm:flex-row shadow-md border border-gray-100">
                        <div className="relative w-full sm:w-40 h-48 sm:h-auto flex-shrink-0">
                            <Image src="/hero-desa.png" alt="Kelurahan Aneka Marga" fill className="object-cover" sizes="160px" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                        </div>
                        <div className="p-6 flex flex-col justify-center">
                            <p className="text-xs font-bold text-desa-600 uppercase tracking-widest mb-2">Visi &amp; Misi</p>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Kelurahan Aneka Marga</h3>
                            <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                Menghadirkan pelayanan publik yang cepat, transparan, dan berorientasi pada kepentingan warga.
                            </p>
                            <ul className="space-y-1.5">
                                {['Pelayanan Publik Prima', 'Transparansi Administrasi'].map((item) => (
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
                    <div className="relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between shadow-md">
                        <div className="absolute inset-0 bg-gradient-to-br from-desa-800 via-desa-700 to-teal-700" />
                        <div className="absolute inset-0 opacity-[0.1]"
                            style={{
                                backgroundImage: `url('/motif-sosoronga.svg')`,
                                backgroundRepeat: 'repeat',
                                backgroundSize: '200px 220px',
                            }}
                        />
                        <div className="relative">
                            <h3 className="text-lg font-bold text-white mb-2">Hubungi Kami</h3>
                            <p className="text-white/70 text-sm leading-relaxed mb-6">
                                Butuh bantuan atau ingin menyampaikan aspirasi? Kami siap melayani.
                            </p>
                        </div>
                        <div className="relative space-y-3">
                            <a href="tel:+6281234567890" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-3 transition-colors">
                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-white">+62 812-3456-7890</span>
                            </a>
                            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3">
                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
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
        </div>
    )
}

/* ── Sub-komponen ──────────────────────────────────────── */

function SectionHeading({ title, color }: { title: string; color: 'green' | 'teal' | 'rose' }) {
    const accent = color === 'green' ? 'bg-desa-600' : color === 'teal' ? 'bg-teal-500' : 'bg-rose-500'
    const text = color === 'green' ? 'text-desa-700' : color === 'teal' ? 'text-teal-700' : 'text-rose-600'
    return (
        <div className="text-center mb-8">
            <span className={`text-xs font-bold uppercase tracking-widest ${text}`}>{title}</span>
            <div className={`w-10 h-0.5 ${accent} mx-auto mt-2 rounded-full`} />
        </div>
    )
}

function GreenCard({ official }: { official: Official }) {
    return (
        <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-desa-50 to-transparent" />
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-desa-400 to-desa-700 flex items-center justify-center ring-4 ring-white shadow-md">
                <span className="text-white font-bold text-base">{getInitials(official.nama)}</span>
            </div>
            <h3 className="mt-3 font-semibold text-gray-800 text-sm leading-snug">{official.nama}</h3>
            <span className="mt-1.5 text-xs font-bold text-desa-600 bg-desa-50 px-3 py-1 rounded-full">{official.jabatan}</span>
        </div>
    )
}

function TealCard({ official, number }: { official: Official; number: number }) {
    return (
        <div className="group bg-white rounded-2xl shadow-sm border border-teal-100 p-5 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
            <div className="absolute top-3 left-3 w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">{number}</div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center ring-4 ring-white shadow-md">
                <span className="text-white font-bold text-base">{getInitials(official.nama)}</span>
            </div>
            <h3 className="mt-3 font-semibold text-gray-800 text-sm leading-snug">{official.nama}</h3>
            <span className="mt-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">{official.jabatan}</span>
        </div>
    )
}

function SmallCard({ official }: { official: Official }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-desa-300 to-desa-600 flex items-center justify-center ring-2 ring-white shadow">
                <span className="text-white font-bold text-sm">{getInitials(official.nama)}</span>
            </div>
            <h3 className="mt-2 font-semibold text-gray-800 text-xs leading-snug">{official.nama}</h3>
            <span className="mt-1 text-xs font-bold text-desa-500 bg-desa-50 px-2 py-0.5 rounded-full">{official.jabatan}</span>
        </div>
    )
}
