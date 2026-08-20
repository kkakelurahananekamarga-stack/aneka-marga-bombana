import { createClient } from '@/lib/supabase/server'
import AdminShell from '@/components/admin/AdminShell'
import Link from 'next/link'

export default async function AdminDashboard() {
    const supabase = await createClient()
    const [umkm, berita, galeri] = await Promise.all([
        supabase.from('umkm').select('id', { count: 'exact', head: true }),
        supabase.from('berita').select('id', { count: 'exact', head: true }),
        supabase.from('galeri').select('id', { count: 'exact', head: true }),
    ])

    const stats = [
        {
            label: 'UMKM', count: umkm.count ?? 0, href: '/admin/umkm',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
            desc: 'usaha terdaftar',
        },
        {
            label: 'Berita', count: berita.count ?? 0, href: '/admin/berita',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            ),
            desc: 'artikel dipublikasi',
        },
        {
            label: 'Galeri', count: galeri.count ?? 0, href: '/admin/galeri',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            desc: 'foto tersimpan',
        },
    ]

    return (
        <AdminShell>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-400 text-sm mt-0.5">Kelola konten website Kelurahan Aneka Marga</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {stats.map(s => (
                        <Link key={s.label} href={s.href}
                            className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-desa-200 hover:shadow-sm transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-9 h-9 rounded-xl bg-gray-50 group-hover:bg-desa-50 flex items-center justify-center text-gray-400 group-hover:text-desa-600 transition-colors">
                                    {s.icon}
                                </div>
                                <svg className="w-4 h-4 text-gray-300 group-hover:text-desa-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{s.count}</p>
                            <p className="text-sm text-gray-400 mt-0.5">{s.desc}</p>
                            <p className="text-xs font-semibold text-gray-500 mt-1">{s.label}</p>
                        </Link>
                    ))}
                </div>

                {/* Quick links */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Aksi Cepat</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {stats.map(s => (
                            <Link key={s.label} href={s.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 hover:bg-desa-50 hover:border-desa-200 transition-all text-sm font-medium text-gray-600 hover:text-desa-700">
                                <span className="text-gray-400">{s.icon}</span>
                                Kelola {s.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AdminShell>
    )
}
