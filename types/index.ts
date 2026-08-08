export interface Profile {
    id: string
    sejarah: string
    visi: string
    misi: string
    geografis: string
    luas: string
    penduduk: string | null
}

export interface Official {
    id: string
    nama: string
    jabatan: string
    foto: string | null
    urutan: number
    kategori: string
}

export interface Potential {
    id: string
    nama: string
    deskripsi: string
    gambar: string | null
    kategori: string
}

export interface Umkm {
    id: string
    nama: string
    deskripsi: string
    foto: string | null
    whatsapp: string | null
    maps: string | null
    kategori: string | null
}

export interface Service {
    id: string
    nama: string
    persyaratan: string
}

export interface News {
    id: string
    judul: string
    isi: string
    gambar: string | null
    tanggal: string
    created_at: string
}

export interface GalleryItem {
    id: string
    foto: string
    deskripsi: string | null
    created_at: string
}

export interface Contact {
    id: string
    telepon: string | null
    email: string | null
    alamat: string | null
    maps: string | null
    jam_pelayanan: string | null
}
