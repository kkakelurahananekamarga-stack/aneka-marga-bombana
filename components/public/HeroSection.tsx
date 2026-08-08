import Image from 'next/image'

interface HeroSectionProps {
    title: string
    subtitle: string
    imageSrc: string | null
    badge?: string
}

export default function HeroSection({ title, subtitle, imageSrc, badge }: HeroSectionProps) {
    return (
        <section className="relative w-full h-[420px] sm:h-[500px] overflow-hidden">
            {/* Background */}
            {imageSrc ? (
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-desa-800 via-desa-700 to-desa-600" />
            )}

            {/* Overlay — lebih gelap di kiri bawah agar teks terbaca */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.1) 100%)',
                }}
                aria-hidden="true"
            />

            {/* Konten rata kiri bawah */}
            <div className="absolute inset-0 flex items-end">
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-16">
                    {/* Badge */}
                    <div className="mb-4">
                        <span className="inline-block bg-desa-500/80 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                            {badge ?? 'Kelurahan Aneka Marga'}
                        </span>
                    </div>

                    {/* Judul */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-2xl mb-4 drop-shadow-md">
                        {title}
                    </h1>

                    {/* Subtitle */}
                    {subtitle && (
                        <p className="text-white/80 text-base sm:text-lg max-w-lg leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}
