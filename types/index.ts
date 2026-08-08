export interface Profile {
    id: string
    sejarah: string
    visi: string
    misi: string
    geografis: string
    luas: string
    penduduk: string | null
    // Monografi 2026
    tahun_pembentukan: string | null
    dasar_hukum: string | null
    kode_pos: string | null
    tipologi: string | null
    tingkat_perkembangan: string | null
    batas_utara: string | null
    batas_selatan: string | null
    batas_barat: string | null
    batas_timur: string | null
    jarak_kecamatan: string | null
    jarak_kabupaten: string | null
    jarak_provinsi: string | null
    penduduk_laki: string | null
    penduduk_perempuan: string | null
    umr: string | null
    monografi_json: MonografiJson | null
}

export interface MonografiItem { nama: string; jumlah: number | string; satuan?: string }
export interface MonografiJson {
    pekerjaan: MonografiItem[]
    pendidikan: MonografiItem[]
    partisipasi_sekolah: MonografiItem[]
    perlindungan_sosial: MonografiItem[]
    sarana_kesehatan: MonografiItem[]
    sarana_pendidikan: MonografiItem[]
    sarana_ibadah: MonografiItem[]
    sarana_umum: MonografiItem[]
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
