import type { Metadata } from 'next'
import HeroSection from '@/components/public/HeroSection'
import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/types'

export const revalidate = 0

export const metadata: Metadata = {
    title: 'Profil Kelurahan',
    description:
        'Profil lengkap Kelurahan Aneka Marga meliputi sejarah, visi, misi, letak geografis, luas wilayah, dan jumlah penduduk.',
}

const placeholderProfile: Profile = {
    id: 'placeholder',
    sejarah:
        'Terbentuk pada tahun 1978 sebagai kawasan transmigrasi, Kelurahan Aneka Marga memiliki latar belakang yang beragam. Bermula dari sekelompok gotong royong antar suku yang berbeda, kelurahan ini bertransformasi dari sekadar lahan pertanian menjadi pusat provisi lokal di wilayahnya.\n\nNama "Aneka Marga" sendiri melambangkan pertemuan dari berbagai jalan hidup yang bersatu untuk membangun satu visi yang sama: kesejahteraan bersama yang berlandaskan nilai-nilai luhur Pancasila dan adat setempat.',
    visi: 'Mewujudkan Kelurahan Aneka Marga yang Mandiri, Sejahtera, dan Digital berlandaskan Iman dan Taqwa di Tahun 2029.',
    misi:
        'Meningkatkan kualitas sumber daya manusia melalui program pendidikan dan kesehatan desa yang inklusif.\nOptimalisasi pengelolaan potensi pertanian dan perkebunan berbasis teknologi ramah lingkungan.\nTransformasi tata kelola pemerintahan desa melalui layanan administrasi berbasis digital yang transparan.',
    geografis:
        'Terletak di dataran tinggi yang subur dengan ketinggian 450 mdpl, dikelilingi oleh sungai dan kawasan hutan yang mendukung pertanian berkelanjutan.',
    luas: '1.340 Ha',
    penduduk: 'Kurang lebih 1.500 jiwa',
}

async function getProfile(): Promise<Profile | null> {
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

export default async function ProfilPage() {
    const profile = (await getProfile()) ?? placeholderProfile

    const misiList = profile.misi
        .split('\n')
        .map((m) => m.replace(/^\d+\.\s*/, '').trim())
        .filter(Boolean)

    return (
        <div className="bg-white">
            <HeroSection
                title="Menuju Kemandirian & Digitalisasi Kelurahan"
                subtitle="Dedikasi kami untuk membangun Aneka Marga yang harmonis, produktif, dan siap menyongsong masa depan teknologi."
                imageSrc="/hero-desa.png"
                badge="Profil Kelurahan"
            />

            {/* ── SEJARAH + GEOGRAFIS ── */}
            <section className="py-10 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Kiri: Sejarah */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-desa-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-desa-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Sejarah Singkat</h2>
                            </div>

                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                {profile.sejarah.split('\n\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="mt-8 grid grid-cols-3 gap-3">
                                <div className="text-center p-3 bg-gray-50 rounded-2xl">
                                    <p className="text-xl font-extrabold text-desa-700">1978</p>
                                    <p className="text-xs text-gray-500 mt-1">Tahun Berdiri</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-2xl">
                                    <p className="text-xl font-extrabold text-desa-700">45+</p>
                                    <p className="text-xs text-gray-500 mt-1">Pengalaman</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-2xl">
                                    <p className="text-xl font-extrabold text-desa-700">8+</p>
                                    <p className="text-xs text-gray-500 mt-1">Perangkat Kelurahan</p>
                                </div>
                            </div>
                        </div>

                        {/* Kanan: Letak Geografis */}
                        <div className="lg:col-span-1">
                            <div className="bg-desa-800 text-white rounded-2xl p-6 h-full flex flex-col">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg className="w-5 h-5 text-desa-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <h3 className="font-bold text-desa-200 text-sm uppercase tracking-wide">Letak Geografis</h3>
                                </div>

                                <p className="text-desa-100 text-sm leading-relaxed flex-1">
                                    {profile.geografis}
                                </p>

                                <div className="mt-6 pt-4 border-t border-desa-700 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-desa-400 text-xs">Luas Wilayah</span>
                                        <span className="text-white font-semibold text-sm">{profile.luas}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-desa-400 text-xs">Orbitasi Ibu Kota</span>
                                        <span className="text-white font-semibold text-sm">12 KM</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-desa-400 text-xs">Kecamatan</span>
                                        <span className="text-white font-semibold text-sm">Rarowatu Utara</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-desa-400 text-xs">Kabupaten</span>
                                        <span className="text-white font-semibold text-sm">Bombana</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VISI & MISI ── */}
            <section className="py-10 sm:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Visi &amp; Misi</h2>
                        <div className="mt-2 w-12 h-1 bg-desa-600 rounded-full mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Visi & Misi teks */}
                        <div className="space-y-8">
                            {/* Visi */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 bg-desa-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-desa-700 text-lg uppercase tracking-wide">Visi</h3>
                                </div>
                                <blockquote className="bg-white border-l-4 border-desa-600 rounded-r-xl p-5 shadow-sm">
                                    <p className="text-gray-700 italic leading-relaxed font-medium">
                                        &ldquo;{profile.visi}&rdquo;
                                    </p>
                                </blockquote>
                            </div>

                            {/* Misi */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-desa-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-desa-700 text-lg uppercase tracking-wide">Misi</h3>
                                </div>
                                <ol className="space-y-3">
                                    {misiList.map((item, i) => (
                                        <li key={i} className="flex gap-3 bg-white rounded-xl p-4 shadow-sm">
                                            <span className="w-7 h-7 bg-desa-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                                {i + 1}
                                            </span>
                                            <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        {/* Foto ilustrasi */}
                        <div className="relative hidden lg:block">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src="/hero-desa.png"
                                    alt="Kelurahan Aneka Marga"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Floating card */}
                            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-desa-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-desa-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Status</p>
                                    <p className="text-sm font-bold text-gray-800">Kelurahan Berkembang</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── DEMOGRAFI ── */}
            <section className="py-10 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Demografi Penduduk</h2>
                            <p className="text-gray-500 mt-1 text-sm">
                                Data kependudukan untuk memastikan ketetapan sasaran pembangunan dan layanan sosial kelurahan.
                            </p>
                        </div>
                        <a href="/pemerintahan" className="text-desa-600 text-sm font-semibold hover:underline whitespace-nowrap flex items-center gap-1">
                            Lihat Pemerintahan
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ),
                                value: profile.penduduk ?? '±1.500',
                                label: 'Total Penduduk',
                                color: 'text-desa-700',
                                bg: 'bg-desa-50',
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                ),
                                value: '±350',
                                label: 'Kepala Keluarga',
                                color: 'text-blue-700',
                                bg: 'bg-blue-50',
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                ),
                                value: '±750',
                                label: 'Wanita',
                                color: 'text-pink-700',
                                bg: 'bg-pink-50',
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                ),
                                value: '±750',
                                label: 'Pria',
                                color: 'text-indigo-700',
                                bg: 'bg-indigo-50',
                            },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
                                <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                    {stat.icon}
                                </div>
                                <p className={`text-2xl sm:text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
                                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
