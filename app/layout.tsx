import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

export const metadata: Metadata = {
    title: {
        template: '%s — Desa Aneka Marga',
        default: 'Desa Aneka Marga — Kecamatan Rarowatu Utara, Kabupaten Bombana',
    },
    description:
        'Website resmi Desa Aneka Marga, Kecamatan Rarowatu Utara, Kabupaten Bombana, Sulawesi Tenggara. Informasi profil desa, pemerintahan, potensi, UMKM, layanan, berita, dan galeri.',
    openGraph: {
        title: 'Desa Aneka Marga',
        description:
            'Website resmi Desa Aneka Marga, Kecamatan Rarowatu Utara, Kabupaten Bombana, Sulawesi Tenggara.',
        locale: 'id_ID',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="id" className={inter.variable}>
            <body className="min-h-screen flex flex-col font-sans antialiased">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    )
}
