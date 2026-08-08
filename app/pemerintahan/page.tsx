import type { Metadata } from 'next'
import Image from 'next/image'

export const revalidate = 0

export const metadata: Metadata = {
    title: 'Pemerintahan Kelurahan',
    description: 'Struktur organisasi pemerintahan Kelurahan Aneka Marga beserta jabatan setiap perangkat kelurahan.',
}

function getInitials(name: string) {
    return name.split(' ').slice(0, 2).map((n) => n[0].toUpperCase()).join('')
}

function Avatar({ nama, size = 'md' }: { nama: string; size?: 'lg' | 'md' | 'sm' }) {
    const dim = size === 'lg' ? 'w-28 h-28' : size === 'md' ? 'w-20 h-20' : 'w-14 h-14'
    const textSize = size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-xl' : 'text-base'
    return (
        <div className={`${dim} rounded-full bg-gradient-to-br from-desa-400 to-desa-700 flex items-center justify-center ring-4 ring-white shadow-lg flex-shrink-0`}>
            <span className={`text-white font-bold ${textSize}`}>{getInitials(nama)}</span>
        </div>
    )
}

// ── DATA STRUKTUR ──────────────────────────────────────────────
const pimpinan = [
    { jabatan: 'Lurah', nama: 'Justang Busasa, S.IP' },
    { jabatan: 'Sekretaris Lurah', nama: 'Amrin Medeing, S.IP' },
]

const perangkat = [
    { jabatan: 'Kasi Tata Pemerintahan', nama: '—' },
    { jabatan: 'Kaur Pemberdayaan Masyarakat', nama: '—' },
    { jabatan: 'Kasi Ketentraman & Ketertiban', nama: 'Symran, S.IP' },
]

const lingkungan = [
    { no: 1, nama: 'Tony Sri Widodo' },
    { no: 2, nama: '—' },
    { no: 3, nama: 'Didik Prasetyo' },
]

const rt = [
    { id: 'RT 1A', nama: 'Nurmayana' },
    { id: 'RT 1B', nama: 'Sandi Pria Utama' },
    { id: 'RT 2', nama: 'Dominikus' },
    { id: 'RT 3', nama: 'Sudirman' },
    { id: 'RT 4', nama: 'Abd. Yusuf' },
    { id: 'RT 5', nama: 'Agus Nurochman' },
    { id: 'RT 6', nama: 'Suntoro' },
]

const posyandu = {
    ketua: 'Mintari',
    anggota: ['Siti Mudayaroh', 'Juriah', 'Marniati', 'Ida Listyorini'],
}
// ──────────────────────────────────────────────────────────────

export default function PemerintahanPage() {
    return (
        <div className="bg-gray-50 min-h-screen">

            {/* HEADER */}
            <section className="bg-white pt-10 sm:pt-16 pb-8 sm:pb-12 text-center px-4">
                <span className="inline-block bg-desa-100 text-desa-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
                    Transparansi Publik
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    Struktur Pemerintahan Kelurahan
                </h1>
                <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                    Mewujudkan tata kelola kelurahan yang bersih, transparan, dan profesional untuk
                    kemajuan seluruh masyarakat.
                </p>
            </section>

            {/* PIMPINAN: LURAH & SEKRETARIS */}
            <section className="py-10 px-4">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-center text-xs font-bold text-desa-600 uppercase tracking-widest mb-6">Pimpinan Kelurahan</h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {pimpinan.map((p) => (
                            <div key={p.jabatan} className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                                <Avatar nama={p.nama} size="lg" />
                                <h3 className="mt-4 text-base font-bold text-gray-900">{p.nama}</h3>
                                <span className="mt-1 text-xs font-bold text-desa-600 uppercase tracking-widest">{p.jabatan}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PERANGKAT KELURAHAN */}
            <section className="pb-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-center text-xs font-bold text-desa-600 uppercase tracking-widest mb-6">Perangkat Kelurahan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {perangkat.map((p) => (
                            <div key={p.jabatan} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center">
                                <Avatar nama={p.nama === '—' ? p.jabatan : p.nama} size="md" />
                                <h3 className="mt-3 font-semibold text-gray-800 text-sm leading-snug">{p.nama}</h3>
                                <span className="mt-1 text-xs font-bold text-desa-600 uppercase tracking-wider">{p.jabatan}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* KEPALA LINGKUNGAN */}
            <section className="pb-10 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-center text-xs font-bold text-desa-600 uppercase tracking-widest mb-6">Kepala Lingkungan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {lingkungan.map((l) => (
                            <div key={l.no} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center">
                                <Avatar nama={l.nama === '—' ? `L${l.no}` : l.nama} size="md" />
                                <h3 className="mt-3 font-semibold text-gray-800 text-sm">{l.nama}</h3>
                                <span className="mt-1 text-xs font-bold text-desa-600 uppercase tracking-wider">Kepala Lingkungan {l.no}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* KEPALA RT */}
            <section className="pb-10 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-center text-xs font-bold text-desa-600 uppercase tracking-widest mb-6">Ketua RT</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {rt.map((r) => (
                            <div key={r.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center">
                                <Avatar nama={r.nama} size="sm" />
                                <h3 className="mt-3 font-semibold text-gray-800 text-sm leading-snug">{r.nama}</h3>
                                <span className="mt-1 text-xs font-bold text-desa-600 uppercase tracking-wider">Ketua {r.id}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* KADER POSYANDU */}
            <section className="pb-14 px-4">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-center text-xs font-bold text-desa-600 uppercase tracking-widest mb-6">Kader Posyandu</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        {/* Ketua */}
                        <div className="flex flex-col items-center mb-6">
                            <Avatar nama={posyandu.ketua} size="md" />
                            <h3 className="mt-3 font-bold text-gray-900 text-sm">{posyandu.ketua}</h3>
                            <span className="mt-1 text-xs font-bold text-desa-600 uppercase tracking-wider">Ketua Kader Posyandu</span>
                        </div>
                        {/* Anggota */}
                        <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-3">Anggota</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {posyandu.anggota.map((a) => (
                                <div key={a} className="flex flex-col items-center text-center">
                                    <Avatar nama={a} size="sm" />
                                    <span className="mt-2 text-xs font-medium text-gray-700 leading-snug">{a}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* VISI & HUBUNGI */}
            <section className="py-10 px-4 bg-white">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-sm border border-gray-100">
                        <div className="relative w-full sm:w-40 h-48 sm:h-auto flex-shrink-0">
                            <Image src="/hero-desa.png" alt="Kelurahan Aneka Marga" fill className="object-cover" sizes="160px" />
                        </div>
                        <div className="p-6 flex flex-col justify-center bg-white">
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
                    <div className="bg-desa-800 text-white rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <h3 className="text-lg font-bold mb-2">Hubungi Kami</h3>
                            <p className="text-desa-200 text-sm leading-relaxed mb-6">
                                Butuh bantuan atau ingin menyampaikan aspirasi? Kami siap melayani Anda.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <a href="tel:+6281234567890" className="flex items-center gap-3 bg-desa-700 hover:bg-desa-600 rounded-xl px-4 py-3 transition-colors">
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

            {/* STATISTIK */}
            <section className="py-8 sm:py-16 bg-gray-50 px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    {[
                        { value: '±1.500', label: 'Total Penduduk' },
                        { value: '3', label: 'Kepala Lingkungan' },
                        { value: '7', label: 'Ketua RT' },
                        { value: '5', label: 'Kader Posyandu' },
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
