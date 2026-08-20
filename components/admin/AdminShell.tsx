'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '🏠' },
    { href: '/admin/umkm', label: 'UMKM', icon: '🛍️' },
    { href: '/admin/berita', label: 'Berita', icon: '📰' },
    { href: '/admin/galeri', label: 'Galeri', icon: '🖼️' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()

    async function handleLogout() {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-56 bg-desa-900 flex flex-col fixed inset-y-0 left-0 z-30">
                <div className="px-5 py-6 border-b border-white/10">
                    <p className="text-white font-extrabold text-sm leading-tight">Panel Admin</p>
                    <p className="text-white/50 text-xs mt-0.5">Kelurahan Aneka Marga</p>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${pathname === item.href
                                    ? 'bg-white/15 text-white'
                                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-3 border-t border-white/10">
                    <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors mb-1">
                        <span>🌐</span> Lihat Website
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                    >
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="ml-56 flex-1 p-8">{children}</main>
        </div>
    )
}
