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
        template: '%s — Kelurahan Aneka Marga',
        default: 'Kelurahan Aneka Marga — Kecamatan Rarowatu Utara, Kabupaten Bombana',
    },
    description:
        'Website resmi Kelurahan Aneka Marga, Kecamatan Rarowatu Utara, Kabupaten Bombana, Sulawesi Tenggara. Informasi profil kelurahan, pemerintahan, potensi, UMKM, layanan, berita, dan galeri.',
    openGraph: {
        title: 'Kelurahan Aneka Marga',
        description:
            'Website resmi Kelurahan Aneka Marga, Kecamatan Rarowatu Utara, Kabupaten Bombana, Sulawesi Tenggara.',
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
