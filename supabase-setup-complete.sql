-- ============================================================
-- SETUP LENGKAP SUPABASE — Kelurahan Aneka Marga
-- Jalankan file ini sekali di Supabase SQL Editor
-- ============================================================

-- 1. TABEL PROFIL
CREATE TABLE IF NOT EXISTS profil (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    sejarah text,
    visi text,
    misi text,
    geografis text,
    luas text,
    penduduk text,
    tahun_pembentukan text,
    dasar_hukum text,
    kode_pos text,
    tipologi text,
    tingkat_perkembangan text,
    batas_utara text,
    batas_selatan text,
    batas_barat text,
    batas_timur text,
    jarak_kecamatan text,
    jarak_kabupaten text,
    jarak_provinsi text,
    penduduk_laki text,
    penduduk_perempuan text,
    umr text,
    monografi_json jsonb,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE profil ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read profil" ON profil;
CREATE POLICY "public read profil" ON profil FOR SELECT USING (true);

-- 2. TABEL PEJABAT
CREATE TABLE IF NOT EXISTS pejabat (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    nama text NOT NULL,
    jabatan text NOT NULL,
    foto text,
    urutan int DEFAULT 0,
    kategori text DEFAULT 'Perangkat Kelurahan',
    created_at timestamptz DEFAULT now()
);
ALTER TABLE pejabat ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read pejabat" ON pejabat;
CREATE POLICY "public read pejabat" ON pejabat FOR SELECT USING (true);

-- 3. TABEL POTENSI
CREATE TABLE IF NOT EXISTS potensi (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    nama text NOT NULL,
    deskripsi text,
    gambar text,
    kategori text DEFAULT 'Umum',
    created_at timestamptz DEFAULT now()
);
ALTER TABLE potensi ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read potensi" ON potensi;
CREATE POLICY "public read potensi" ON potensi FOR SELECT USING (true);

-- 4. TABEL UMKM
CREATE TABLE IF NOT EXISTS umkm (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    nama text NOT NULL,
    deskripsi text,
    foto text,
    whatsapp text,
    maps text,
    kategori text,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE umkm ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read umkm" ON umkm;
CREATE POLICY "public read umkm" ON umkm FOR SELECT USING (true);

-- 5. TABEL LAYANAN
CREATE TABLE IF NOT EXISTS layanan (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    nama text NOT NULL,
    persyaratan text,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE layanan ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read layanan" ON layanan;
CREATE POLICY "public read layanan" ON layanan FOR SELECT USING (true);

-- 6. TABEL BERITA
CREATE TABLE IF NOT EXISTS berita (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    judul text NOT NULL,
    isi text,
    gambar text,
    tanggal date DEFAULT now(),
    created_at timestamptz DEFAULT now()
);
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read berita" ON berita;
CREATE POLICY "public read berita" ON berita FOR SELECT USING (true);

-- 7. TABEL GALERI
CREATE TABLE IF NOT EXISTS galeri (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    foto text NOT NULL,
    deskripsi text,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE galeri ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read galeri" ON galeri;
CREATE POLICY "public read galeri" ON galeri FOR SELECT USING (true);

-- 8. TABEL KONTAK
CREATE TABLE IF NOT EXISTS kontak (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    telepon text,
    email text,
    alamat text,
    maps text,
    jam_pelayanan text,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE kontak ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public read kontak" ON kontak;
CREATE POLICY "public read kontak" ON kontak FOR SELECT USING (true);

-- 9. TABEL KELEMBAGAAN
CREATE TABLE IF NOT EXISTS kelembagaan (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    organisasi text NOT NULL,
    kelompok text,
    jabatan text NOT NULL,
    nama text NOT NULL,
    urutan int DEFAULT 0,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE kelembagaan ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'kelembagaan' AND policyname = 'public read kelembagaan'
  ) THEN
    EXECUTE 'CREATE POLICY "public read kelembagaan" ON kelembagaan FOR SELECT USING (true)';
  END IF;
END $$;

SELECT 'Semua tabel berhasil dibuat.' AS status;
