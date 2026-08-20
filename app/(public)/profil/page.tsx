import type { Metadata } from 'next'
import HeroSection from '@/components/public/HeroSection'
import { createClient } from '@/lib/supabase/server'
import type { Profile, MonografiItem } from '@/types'

export const revalidate = 0

export const metadata: Metadata = {
    title: 'Profil Kelurahan',
    description: 'Profil lengkap Kelurahan Aneka Marga — Monografi Tahun 2026.',
}

async function getProfile(): Promise<Profile | null> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('profil').select('*').limit(1).single()
        if (error || !data) return null
        return data as Profile
    } catch { return null }
}

// Fallback data monografi 2026
const fallback: Profile = {
    id: 'fallback',
    tahun_pembentukan: '2003',
    dasar_hukum: 'UU No. 29 Tahun 2003',
    kode_pos: '93788',
    tipologi: 'Persawahan',
    tingkat_perkembangan: 'Berkembang',
    luas: '12,69 m²',
    batas_utara: 'Desa Marga Jaya',
    batas_selatan: 'Desa Tembe',
    batas_barat: 'Desa Wumbubangka',
    batas_timur: 'Desa Tunas Baru',
    jarak_kecamatan: '0 Km',
    jarak_kabupaten: '16,1 Km',
    jarak_provinsi: '136 Km',
    penduduk: '1.345 Jiwa',
    penduduk_laki: '669 Jiwa',
    penduduk_perempuan: '676 Jiwa',
    umr: 'Rp3.073.551,70',
    sejarah: 'Kelurahan Aneka Marga dibentuk pada tahun 2003 berdasarkan UU No. 29 Tahun 2003. Kelurahan ini terletak di Kecamatan Rarowatu Utara, Kabupaten Bombana, Provinsi Sulawesi Tenggara. Nama "Aneka Marga" mencerminkan keberagaman latar belakang warganya yang bersatu dalam satu komunitas yang harmonis.',
    visi: 'Terwujudnya Kelurahan Aneka Marga yang Maju, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Kearifan Lokal.',
    misi: 'Meningkatkan kualitas pelayanan publik kepada seluruh lapisan masyarakat.\nMengembangkan potensi ekonomi lokal berbasis pertanian, perkebunan, dan UMKM.\nMeningkatkan kualitas infrastruktur dasar dan sarana prasarana kelurahan.\nMemberdayakan masyarakat melalui pendidikan, pelatihan, dan pembinaan.\nMemperkuat tata kelola pemerintahan yang transparan, akuntabel, dan partisipatif.',
    geografis: 'Kelurahan Aneka Marga terletak di Kecamatan Rarowatu Utara, Kabupaten Bombana, Provinsi Sulawesi Tenggara. Wilayah ini memiliki tipologi persawahan yang subur.',
    monografi_json: {
        pekerjaan: [
            { nama: 'Pertanian, Perkebunan, Kehutanan, Perburuan, dan Perikanan', jumlah: 267 },
            { nama: 'Pertambangan dan Penggalian', jumlah: 62 },
            { nama: 'Industri Pengolahan', jumlah: 63 },
            { nama: 'Pengadaan Listrik, Gas, Uap/Air Panas, dan Udara Dingin', jumlah: 1 },
            { nama: 'Pengadaan Air, Pengelolaan Sampah dan Daur Ulang', jumlah: 0 },
            { nama: 'Konstruksi', jumlah: 24 },
            { nama: 'Perdagangan Besar dan Eceran; Reparasi Kendaraan', jumlah: 131 },
            { nama: 'Transportasi dan Pergudangan', jumlah: 3 },
            { nama: 'Penyediaan Akomodasi dan Makan Minum', jumlah: 47 },
            { nama: 'Informasi dan Komunikasi', jumlah: 1 },
            { nama: 'Jasa Keuangan dan Asuransi', jumlah: 3 },
            { nama: 'Real Estate', jumlah: 0 },
            { nama: 'Jasa Perusahaan', jumlah: 3 },
            { nama: 'Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial', jumlah: 13 },
            { nama: 'Jasa Pendidikan', jumlah: 32 },
            { nama: 'Jasa Kesehatan dan Kegiatan Sosial', jumlah: 12 },
            { nama: 'Jasa Lainnya', jumlah: 6 },
        ],
        pendidikan: [
            { nama: 'SD/Sederajat', jumlah: 280 },
            { nama: 'SMP/Sederajat', jumlah: 204 },
            { nama: 'SMA/Sederajat', jumlah: 244 },
            { nama: 'Akademi/D1-D3', jumlah: 5 },
            { nama: 'Sarjana', jumlah: 85 },
            { nama: 'Pascasarjana', jumlah: 8 },
        ],
        partisipasi_sekolah: [
            { nama: 'Tidak/Belum Pernah Bersekolah', jumlah: 121 },
            { nama: 'Masih Bersekolah', jumlah: 298 },
            { nama: 'Tidak Bersekolah Lagi', jumlah: 857 },
        ],
        perlindungan_sosial: [
            { nama: 'Bantuan Sosial Sembako / BPNT', jumlah: 152, satuan: 'keluarga' },
            { nama: 'Program Keluarga Harapan (PKH)', jumlah: 57, satuan: 'keluarga' },
            { nama: 'Program BLT Desa', jumlah: 3, satuan: 'keluarga' },
            { nama: 'Program Subsidi Listrik', jumlah: 92, satuan: 'keluarga' },
            { nama: 'Program Bantuan Subsidi Pupuk', jumlah: 125, satuan: 'keluarga' },
            { nama: 'Program Subsidi LPG', jumlah: 419, satuan: 'keluarga' },
        ],
        sarana_kesehatan: [
            { nama: 'Kantor Kelurahan', jumlah: 'Ada' },
            { nama: 'Puskesmas', jumlah: 'Tidak Ada' },
            { nama: 'Poskesdes', jumlah: '0 buah' },
            { nama: 'UKBM (Posyandu, Polindes)', jumlah: '1 buah' },
        ],
        sarana_pendidikan: [
            { nama: 'Perpustakaan Kelurahan', jumlah: '0 buah' },
            { nama: 'Gedung Sekolah PAUD', jumlah: '0 buah' },
            { nama: 'Gedung Sekolah TK', jumlah: '1 buah' },
            { nama: 'Gedung Sekolah SD', jumlah: '2 buah' },
            { nama: 'Gedung Sekolah SMP', jumlah: '1 buah' },
            { nama: 'Gedung Sekolah SMA', jumlah: '1 buah' },
            { nama: 'Gedung Sekolah SMK', jumlah: '1 buah' },
            { nama: 'Gedung Sekolah MA', jumlah: '1 buah' },
            { nama: 'Gedung Perguruan Tinggi', jumlah: '0 buah' },
        ],
        sarana_ibadah: [
            { nama: 'Masjid', jumlah: '1 buah' },
            { nama: 'Mushola', jumlah: '4 buah' },
            { nama: 'Gereja', jumlah: '2 buah' },
            { nama: 'Pura', jumlah: '0 buah' },
            { nama: 'Vihara', jumlah: '0 buah' },
            { nama: 'Klenteng', jumlah: '0 buah' },
        ],
        sarana_umum: [
            { nama: 'Fasilitas Olahraga', jumlah: '1 buah' },
            { nama: 'Sarana Kesenian/Budaya', jumlah: '0 buah' },
            { nama: 'Balai Pertemuan', jumlah: '1 buah' },
            { nama: 'Sumur Kelurahan', jumlah: '0 buah' },
            { nama: 'Pasar Kelurahan', jumlah: '0 buah' },
            { nama: 'Perpustakaan Kelurahan', jumlah: '0 buah' },
        ],
    },
}

// Komponen tabel data ringan
function DataTable({ rows }: { rows: MonografiItem[] }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                    {rows.map((r, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-2.5 text-gray-700 font-medium">{r.nama}</td>
                            <td className="px-4 py-2.5 text-right font-bold text-desa-700 whitespace-nowrap">
                                {typeof r.jumlah === 'number'
                                    ? `${r.jumlah.toLocaleString('id-ID')} ${r.satuan ?? 'orang'}`
                                    : r.jumlah}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function SectionHeader({ title }: { title: string }) {
    return (
        <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-desa-600 rounded-full" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
        </div>
    )
}

export default async function ProfilPage() {
    const profile = (await getProfile()) ?? fallback
    const mj = profile.monografi_json ?? fallback.monografi_json!
    const misiList = profile.misi.split('\n').map((m) => m.replace(/^\d+\.\s*/, '').trim()).filter(Boolean)

    return (
        <div className="bg-white">
            <HeroSection
                title="Menuju Kemandirian & Digitalisasi Kelurahan"
                subtitle="Monografi Kelurahan Aneka Marga Tahun 2026 — Kecamatan Rarowatu Utara, Kabupaten Bombana."
                imageSrc="/hero-desa.png"
                badge="Profil Kelurahan"
            />

            {/* ══ 1. IDENTITAS KELURAHAN ══════════════════════════════ */}
            <section className="py-10 sm:py-14 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader title="Identitas Kelurahan" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {[
                            { label: 'Nama', value: 'Aneka Marga' },
                            { label: 'Tahun Pembentukan', value: profile.tahun_pembentukan ?? '2003' },
                            { label: 'Dasar Hukum', value: profile.dasar_hukum ?? 'UU No. 29 Tahun 2003' },
                            { label: 'Kode Pos', value: profile.kode_pos ?? '93788' },
                            { label: 'Kecamatan', value: 'Rarowatu Utara' },
                            { label: 'Kabupaten/Kota', value: 'Bombana' },
                            { label: 'Provinsi', value: 'Sulawesi Tenggara' },
                            { label: 'Tipologi', value: profile.tipologi ?? 'Persawahan' },
                            { label: 'Tingkat Perkembangan', value: profile.tingkat_perkembangan ?? 'Berkembang' },
                            { label: 'Luas Wilayah', value: profile.luas },
                            { label: 'UMR Kabupaten', value: profile.umr ?? 'Rp3.073.551,70' },
                        ].map((item) => (
                            <div key={item.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
                                <p className="font-bold text-gray-800 text-sm leading-snug">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 2. SEJARAH + GEOGRAFIS ══════════════════════════════ */}
            <section className="py-10 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                                {profile.sejarah.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                            </div>
                            <div className="mt-8 grid grid-cols-3 gap-3">
                                <div className="text-center p-3 bg-gray-50 rounded-2xl">
                                    <p className="text-xl font-extrabold text-desa-700">{profile.tahun_pembentukan ?? '2003'}</p>
                                    <p className="text-xs text-gray-500 mt-1">Tahun Pembentukan</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-2xl">
                                    <p className="text-xl font-extrabold text-desa-700">{profile.penduduk ?? '1.345 Jiwa'}</p>
                                    <p className="text-xs text-gray-500 mt-1">Total Penduduk</p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-2xl">
                                    <p className="text-xl font-extrabold text-desa-700">{profile.luas}</p>
                                    <p className="text-xs text-gray-500 mt-1">Luas Wilayah</p>
                                </div>
                            </div>
                        </div>

                        {/* Letak Geografis */}
                        <div className="lg:col-span-1">
                            <div className="bg-desa-800 text-white rounded-2xl p-6 h-full flex flex-col">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg className="w-5 h-5 text-desa-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <h3 className="font-bold text-desa-200 text-sm uppercase tracking-wide">Letak Geografis</h3>
                                </div>
                                <p className="text-desa-100 text-sm leading-relaxed flex-1">{profile.geografis}</p>
                                <div className="mt-6 pt-4 border-t border-desa-700 space-y-3">
                                    {[
                                        { label: 'Luas Wilayah', value: profile.luas },
                                        { label: 'Kecamatan', value: 'Rarowatu Utara' },
                                        { label: 'Kabupaten', value: 'Bombana' },
                                        { label: 'Provinsi', value: 'Sulawesi Tenggara' },
                                    ].map((r) => (
                                        <div key={r.label} className="flex justify-between items-center">
                                            <span className="text-desa-400 text-xs">{r.label}</span>
                                            <span className="text-white font-semibold text-sm">{r.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 3. BATAS WILAYAH + ORBITASI ════════════════════════ */}
            <section className="py-10 sm:py-14 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Batas Wilayah */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <SectionHeader title="Batas Wilayah" />
                            <div className="space-y-3">
                                {[
                                    { arah: 'Utara', icon: '↑', value: profile.batas_utara ?? 'Desa Marga Jaya' },
                                    { arah: 'Selatan', icon: '↓', value: profile.batas_selatan ?? 'Desa Tembe' },
                                    { arah: 'Barat', icon: '←', value: profile.batas_barat ?? 'Desa Wumbubangka' },
                                    { arah: 'Timur', icon: '→', value: profile.batas_timur ?? 'Desa Tunas Baru' },
                                ].map((b) => (
                                    <div key={b.arah} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                                        <span className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                            <span className="w-7 h-7 bg-desa-100 text-desa-700 rounded-full flex items-center justify-center text-xs font-bold">{b.icon}</span>
                                            {b.arah}
                                        </span>
                                        <span className="font-bold text-gray-800 text-sm">{b.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Orbitasi */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <SectionHeader title="Orbitasi" />
                            <div className="space-y-3">
                                {[
                                    { label: 'Jarak ke Pusat Pemerintahan Kecamatan', value: profile.jarak_kecamatan ?? '0 Km' },
                                    { label: 'Jarak ke Ibukota Kabupaten', value: profile.jarak_kabupaten ?? '16,1 Km' },
                                    { label: 'Jarak ke Ibukota Provinsi', value: profile.jarak_provinsi ?? '136 Km' },
                                ].map((o) => (
                                    <div key={o.label} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                                        <span className="text-sm text-gray-600 font-medium">{o.label}</span>
                                        <span className="font-bold text-desa-700 text-sm">{o.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 4. VISI & MISI ══════════════════════════════════════ */}
            <section className="py-10 sm:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Visi &amp; Misi</h2>
                        <div className="mt-2 w-12 h-1 bg-desa-600 rounded-full mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <div className="space-y-8">
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
                                <blockquote className="bg-gray-50 border-l-4 border-desa-600 rounded-r-xl p-5 shadow-sm">
                                    <p className="text-gray-700 italic leading-relaxed font-medium">&ldquo;{profile.visi}&rdquo;</p>
                                </blockquote>
                            </div>
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
                                        <li key={i} className="flex gap-3 bg-gray-50 rounded-xl p-4 shadow-sm">
                                            <span className="w-7 h-7 bg-desa-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                                            <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="relative hidden lg:block">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                                <img src="/hero-desa.png" alt="Kelurahan Aneka Marga" className="w-full h-full object-cover" />
                            </div>
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

            {/* ══ 5. DEMOGRAFI PENDUDUK ═══════════════════════════════ */}
            <section className="py-10 sm:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Demografi Penduduk</h2>
                            <p className="text-gray-500 mt-1 text-sm">Data kependudukan Kelurahan Aneka Marga Tahun 2026.</p>
                        </div>
                        <a href="/pemerintahan" className="text-desa-600 text-sm font-semibold hover:underline whitespace-nowrap flex items-center gap-1">
                            Lihat Pemerintahan
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                        {[
                            { value: profile.penduduk ?? '1.345 Jiwa', label: 'Total Penduduk', color: 'text-desa-700', bg: 'bg-desa-50' },
                            { value: profile.penduduk_laki ?? '669 Jiwa', label: 'Laki-laki', color: 'text-blue-700', bg: 'bg-blue-50' },
                            { value: profile.penduduk_perempuan ?? '676 Jiwa', label: 'Perempuan', color: 'text-pink-700', bg: 'bg-pink-50' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center">
                                <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <p className={`text-2xl sm:text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
                                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* ══ 6. PEKERJAAN ══ */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-bold text-gray-800 text-base mb-3">Pekerjaan / Mata Pencaharian</h3>
                            <DataTable rows={mj.pekerjaan} />
                        </div>
                        <div className="space-y-6">
                            {/* ══ 7. PENDIDIKAN ══ */}
                            <div>
                                <h3 className="font-bold text-gray-800 text-base mb-3">Tingkat Pendidikan Masyarakat</h3>
                                <DataTable rows={mj.pendidikan} />
                            </div>
                            {/* ══ 8. PARTISIPASI SEKOLAH ══ */}
                            <div>
                                <h3 className="font-bold text-gray-800 text-base mb-3">Partisipasi Sekolah</h3>
                                <DataTable rows={mj.partisipasi_sekolah} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 9. PERLINDUNGAN SOSIAL ══════════════════════════════ */}
            <section className="py-10 sm:py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader title="Program Perlindungan Sosial" />
                    <div className="max-w-2xl">
                        <DataTable rows={mj.perlindungan_sosial} />
                    </div>
                </div>
            </section>

            {/* ══ 10. SARANA & PRASARANA ══════════════════════════════ */}
            <section className="py-10 sm:py-14 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader title="Sarana dan Prasarana" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Kesehatan', rows: mj.sarana_kesehatan },
                            { title: 'Pendidikan', rows: mj.sarana_pendidikan },
                            { title: 'Ibadah', rows: mj.sarana_ibadah },
                            { title: 'Umum', rows: mj.sarana_umum },
                        ].map((s) => (
                            <div key={s.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="bg-desa-700 px-4 py-2.5">
                                    <p className="text-white text-xs font-bold uppercase tracking-widest">{s.title}</p>
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {s.rows.map((r, i) => (
                                        <div key={i} className="flex justify-between items-center px-4 py-2.5 text-sm">
                                            <span className="text-gray-600">{r.nama}</span>
                                            <span className="font-bold text-desa-700 whitespace-nowrap ml-2">{String(r.jumlah)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
