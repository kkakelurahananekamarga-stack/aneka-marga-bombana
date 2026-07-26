'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/profil', label: 'Profil Desa' },
    { href: '/pemerintahan', label: 'Pemerintahan' },
    { href: '/potensi', label: 'Potensi Desa' },
    { href: '/umkm', label: 'UMKM' },
    { href: '/layanan', label: 'Layanan' },
    { href: '/berita', label: 'Berita' },
    { href: '/galeri', label: 'Galeri' },
    { href: '/kontak', label: 'Kontak' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo / Branding */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-8 h-8 bg-desa-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">AM</span>
                        </div>
                        <span className="font-bold text-desa-700 text-sm sm:text-base leading-tight">
                            Desa Aneka Marga
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(link.href)
                                        ? 'bg-desa-100 text-desa-700 font-semibold'
                                        : 'text-gray-600 hover:text-desa-600 hover:bg-desa-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-desa-600 hover:bg-desa-50 focus:outline-none focus:ring-2 focus:ring-desa-500"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <span className="sr-only">Buka menu navigasi</span>
                        {isOpen ? (
                            /* X icon */
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            /* Hamburger icon */
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive(link.href)
                                        ? 'bg-desa-100 text-desa-700 font-semibold'
                                        : 'text-gray-600 hover:text-desa-600 hover:bg-desa-50'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}
