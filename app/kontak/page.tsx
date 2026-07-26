import type { Metadata } from 'next'
import HeroSection from '@/components/public/HeroSection'
import { createClient } from '@/lib/supabase/server'
import type { Contact } from '@/types'

export const revalidate = 0

export const metadata: Metadata = {
    title: 'Kontak',
    description:
        'Informasi kontak Desa Aneka Marga: nomor telepon, email, alamat kantor desa, jam pelayanan, dan peta lokasi.',
    openGraph: {
        title: 'Kontak — Desa Aneka Marga',
        description: 'Hubungi atau kunjungi Kantor Desa Aneka Marga.',
        images: ['/og-default.jpg'],
    },
}

async function getContact(): Promise<Contact | null> {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('kontak')
            .select('*')
            .limit(1)
            .single()

        if (error || !data) return null
        return data as Contact
    } catch {
        return null
    }
}

export default async function KontakPage() {
    const contact = await getContact()

    return (
        <div>
            <HeroSection
                title="Kontak"
                subtitle="Hubungi atau kunjungi Kantor Desa Aneka Marga"
                imageSrc="/hero-desa.png"
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                <div className="text-center mb-8">
                    <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2">
                        Informasi Kontak
                    </h2>
                    <p className="text-gray-500 text-sm">Kami siap melayani Anda</p>
                </div>

                {contact ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {/* Telepon */}
                        {contact.telepon && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
                                <div className="w-10 h-10 bg-desa-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-desa-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-desa-600 font-semibold uppercase tracking-wide mb-1">Telepon</p>
                                    <a
                                        href={`tel:${contact.telepon}`}
                                        className="text-gray-800 font-medium hover:text-desa-600 transition-colors"
                                    >
                                        {contact.telepon}
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        {contact.email && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
                                <div className="w-10 h-10 bg-desa-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-desa-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-desa-600 font-semibold uppercase tracking-wide mb-1">Email</p>
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="text-gray-800 font-medium hover:text-desa-600 transition-colors break-all"
                                    >
                                        {contact.email}
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Alamat */}
                        {contact.alamat && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
                                <div className="w-10 h-10 bg-desa-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-desa-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-desa-600 font-semibold uppercase tracking-wide mb-1">Alamat</p>
                                    <p className="text-gray-800 font-medium whitespace-pre-line">{contact.alamat}</p>
                                </div>
                            </div>
                        )}

                        {/* Jam Pelayanan */}
                        {contact.jam_pelayanan && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
                                <div className="w-10 h-10 bg-desa-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-desa-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-desa-600 font-semibold uppercase tracking-wide mb-1">Jam Pelayanan</p>
                                    <p className="text-gray-800 font-medium whitespace-pre-line">{contact.jam_pelayanan}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-desa-50 border border-desa-200 rounded-xl p-8 text-center mb-10">
                        <p className="text-gray-500">Informasi kontak belum tersedia.</p>
                    </div>
                )}

                {/* Google Maps Embed */}
                {contact?.maps && (
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Lokasi Kantor Desa</h3>
                        <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 aspect-video">
                            <iframe
                                src={contact.maps}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Lokasi Kantor Desa Aneka Marga di Google Maps"
                                className="w-full h-full"
                            />
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
