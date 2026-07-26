import Link from 'next/link'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-desa-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Grid: 1 kolom di HP, 3 kolom di desktop */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Identitas */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-desa-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs font-bold">AM</span>
                            </div>
                            <span className="font-bold text-base">Desa Aneka Marga</span>
                        </div>
                        <p className="text-desa-300 text-sm leading-relaxed">
                            Kecamatan Rarowatu Utara<br />
                            Kabupaten Bombana<br />
                            Sulawesi Tenggara
                        </p>
                    </div>

                    {/* Menu Cepat — 2 kolom kecil di dalam */}
                    <div>
                        <h3 className="font-semibold text-desa-100 mb-3">Menu Cepat</h3>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                            {[
                                { href: '/profil', label: 'Profil Desa' },
                                { href: '/pemerintahan', label: 'Pemerintahan' },
                                { href: '/potensi', label: 'Potensi Desa' },
                                { href: '/umkm', label: 'UMKM' },
                                { href: '/layanan', label: 'Layanan' },
                                { href: '/berita', label: 'Berita' },
                                { href: '/galeri', label: 'Galeri' },
                                { href: '/kontak', label: 'Kontak' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-desa-300 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ikuti Kami */}
                    <div>
                        <h3 className="font-semibold text-desa-100 mb-3">Ikuti Kami</h3>
                        <div className="flex gap-3">
                            {/* Facebook */}
                            <a href="#" aria-label="Facebook" className="w-9 h-9 bg-desa-700 hover:bg-desa-600 rounded-lg flex items-center justify-center transition-colors">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a href="#" aria-label="Instagram" className="w-9 h-9 bg-desa-700 hover:bg-desa-600 rounded-lg flex items-center justify-center transition-colors">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            {/* YouTube */}
                            <a href="#" aria-label="YouTube" className="w-9 h-9 bg-desa-700 hover:bg-desa-600 rounded-lg flex items-center justify-center transition-colors">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                        <p className="text-desa-400 text-xs mt-4 leading-relaxed">
                            Ikuti media sosial kami untuk informasi terbaru seputar kegiatan desa.
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-desa-700 mt-8 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-center sm:text-left">
                    <p className="text-desa-400 text-xs">
                        &copy; {currentYear} Desa Aneka Marga, Kec. Rarowatu Utara, Kab. Bombana. Hak cipta dilindungi.
                    </p>
                    <p className="text-desa-500 text-xs">Dibuat dalam rangka program KKN</p>
                </div>
            </div>
        </footer>
    )
}
