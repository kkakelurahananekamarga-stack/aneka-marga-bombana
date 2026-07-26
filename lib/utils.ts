import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { News } from '@/types'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png']
const MAX_FILE_SIZE = 5_242_880 // 5MB in bytes

export function validateImageFile(file: File): { valid: boolean; error: string } {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: 'Format file tidak didukung. Gunakan JPEG atau PNG.',
        }
    }

    if (file.size > MAX_FILE_SIZE) {
        return {
            valid: false,
            error: 'Ukuran file melebihi 5MB. Pilih file yang lebih kecil.',
        }
    }

    return { valid: true, error: '' }
}

export function sortNewsByDate(articles: News[]): News[] {
    return [...articles].sort((a, b) => {
        if (b.tanggal > a.tanggal) return 1
        if (b.tanggal < a.tanggal) return -1
        return 0
    })
}

export function formatWhatsAppUrl(phone: string): string {
    const digits = phone.replace(/\D/g, '')
    return `https://wa.me/${digits}`
}
