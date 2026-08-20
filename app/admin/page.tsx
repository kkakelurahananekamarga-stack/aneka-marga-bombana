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
        { label: 'UMKM', count: umkm.count ?? 0, href: '/admin/umkm', icon: '🛍️', color: 'bg-emerald-50 text-emerald-700' },
        { label: 'Berita', count: berita.count ?? 0, href: '/admin/berita', icon: '📰', color: 'bg-blue-50 text-blue-700' },
        { label: 'Galeri', count: galeri.count ?? 0, href: '/admin/galeri', icon: '🖼️', color: 'bg-purple-50 text-purple-700' },
    ]

    return (
        <AdminShell>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Dashboard</h1>
                <p className="text-gray-500 text-sm mb-8">Kelola konten website Kelurahan Aneka Marga</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {stats.map(s => (
                        <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 ${s.color}`}>{s.icon}</div>
                            <p className="text-3xl font-extrabold text-gray-900">{s.count}</p>
                            <p className="text-sm text-gray-500 mt-1">{s.label} terdaftar</p>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminShell>
    )
}
