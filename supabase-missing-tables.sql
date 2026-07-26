-- SCRIPT INI HANYA MEMBUAT TABEL YANG BELUM ADA
-- Aman dijalankan karena tidak akan menghapus tabel umkm yang sudah ada

-- ============================================
-- 1. TABEL BERITA
-- ============================================
CREATE TABLE IF NOT EXISTS berita (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  judul TEXT NOT NULL,
  isi TEXT NOT NULL,
  gambar TEXT,
  tanggal TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. TABEL GALERI
-- ============================================
CREATE TABLE IF NOT EXISTS galeri (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  foto TEXT NOT NULL,
  deskripsi TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. TABEL PEJABAT
-- ============================================
CREATE TABLE IF NOT EXISTS pejabat (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  foto TEXT,
  urutan INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. TABEL PROFIL
-- ============================================
CREATE TABLE IF NOT EXISTS profil (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sejarah TEXT NOT NULL,
  visi TEXT NOT NULL,
  misi TEXT NOT NULL,
  geografis TEXT NOT NULL,
  luas TEXT NOT NULL,
  penduduk TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. TABEL POTENSI
-- ============================================
CREATE TABLE IF NOT EXISTS potensi (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  gambar TEXT,
  kategori TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. TABEL LAYANAN
-- ============================================
CREATE TABLE IF NOT EXISTS layanan (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama TEXT NOT NULL,
  persyaratan TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. TABEL KONTAK
-- ============================================
CREATE TABLE IF NOT EXISTS kontak (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  telepon TEXT,
  email TEXT,
  alamat TEXT,
  maps TEXT,
  jam_pelayanan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeri ENABLE ROW LEVEL SECURITY;
ALTER TABLE pejabat ENABLE ROW LEVEL SECURITY;
ALTER TABLE profil ENABLE ROW LEVEL SECURITY;
ALTER TABLE potensi ENABLE ROW LEVEL SECURITY;
ALTER TABLE layanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE kontak ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - PUBLIC READ ACCESS
-- ============================================
DROP POLICY IF EXISTS "Public read berita" ON berita;
DROP POLICY IF EXISTS "Public read galeri" ON galeri;
DROP POLICY IF EXISTS "Public read pejabat" ON pejabat;
DROP POLICY IF EXISTS "Public read profil" ON profil;
DROP POLICY IF EXISTS "Public read potensi" ON potensi;
DROP POLICY IF EXISTS "Public read layanan" ON layanan;
DROP POLICY IF EXISTS "Public read kontak" ON kontak;

CREATE POLICY "Public read berita" ON berita FOR SELECT USING (true);
CREATE POLICY "Public read galeri" ON galeri FOR SELECT USING (true);
CREATE POLICY "Public read pejabat" ON pejabat FOR SELECT USING (true);
CREATE POLICY "Public read profil" ON profil FOR SELECT USING (true);
CREATE POLICY "Public read potensi" ON potensi FOR SELECT USING (true);
CREATE POLICY "Public read layanan" ON layanan FOR SELECT USING (true);
CREATE POLICY "Public read kontak" ON kontak FOR SELECT USING (true);

-- ============================================
-- INSERT SAMPLE DATA — disesuaikan dengan Desa Aneka Marga
-- Kecamatan Rarowatu Utara, Kabupaten Bombana, Sulawesi Tenggara
-- ============================================

-- Berita
INSERT INTO berita (judul, isi, gambar, tanggal) VALUES
('Pembangunan Jalan Usaha Tani Selesai Dilaksanakan',
 'Pembangunan jalan usaha tani sepanjang 1,5 km di Desa Aneka Marga telah berhasil diselesaikan. Proyek ini merupakan program Dana Desa tahun 2025 yang bertujuan memperlancar akses petani menuju lahan pertanian dan perkebunan di wilayah desa. Dengan selesainya jalan ini, petani tidak lagi kesulitan mengangkut hasil panen ke pasar.',
 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
 NOW() - INTERVAL '3 days'),

('Posyandu Balita dan Lansia Bulan Juli 2025',
 'Kegiatan posyandu rutin bulan Juli 2025 akan dilaksanakan di Balai Desa Aneka Marga. Kegiatan meliputi penimbangan balita, imunisasi, pemeriksaan tekanan darah lansia, dan konsultasi gizi gratis. Seluruh warga diharapkan hadir tepat waktu.',
 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
 NOW() - INTERVAL '5 days'),

('Musyawarah Desa: Rencana Pembangunan 2026',
 'Pemerintah Desa Aneka Marga mengadakan Musyawarah Desa untuk menyusun Rencana Kerja Pemerintah Desa (RKPDes) tahun 2026. Seluruh elemen masyarakat diundang untuk menyampaikan usulan prioritas pembangunan. Musyawarah dilaksanakan di Balai Desa Aneka Marga.',
 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
 NOW() - INTERVAL '1 day'),

('Pelatihan Pengolahan Hasil Pertanian untuk Ibu PKK',
 'Dalam rangka meningkatkan nilai ekonomi hasil pertanian lokal, Pemerintah Desa Aneka Marga bekerja sama dengan Dinas Pertanian Kabupaten Bombana mengadakan pelatihan pengolahan hasil pertanian bagi ibu-ibu PKK. Pelatihan mencakup pembuatan produk olahan dari komoditas unggulan desa.',
 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
 NOW() - INTERVAL '7 days');

-- Galeri
INSERT INTO galeri (foto, deskripsi) VALUES
('https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?w=800', 'Upacara Peringatan HUT RI ke-79 di Lapangan Desa Aneka Marga'),
('https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800', 'Kegiatan Gotong Royong Membersihkan Lingkungan Desa'),
('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800', 'Hamparan Sawah dan Ladang Produktif Desa Aneka Marga'),
('https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800', 'Penyerahan Bantuan Sosial kepada Warga Kurang Mampu'),
('https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800', 'Rapat Koordinasi Pemerintah Desa dan BPD'),
('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800', 'Musyawarah Desa Penyusunan APBDes');

-- Pejabat
INSERT INTO pejabat (nama, jabatan, foto, urutan) VALUES
('Kepala Desa Aneka Marga', 'Kepala Desa', 'https://ui-avatars.com/api/?name=Kepala+Desa&size=400&background=2563eb&color=fff', 1),
('Sekretaris Desa', 'Sekretaris Desa', 'https://ui-avatars.com/api/?name=Sekretaris+Desa&size=400&background=16a34a&color=fff', 2),
('Kaur Pemerintahan', 'Kaur Pemerintahan', 'https://ui-avatars.com/api/?name=Kaur+Pemerintahan&size=400&background=ea580c&color=fff', 3),
('Kaur Pembangunan', 'Kaur Pembangunan', 'https://ui-avatars.com/api/?name=Kaur+Pembangunan&size=400&background=dc2626&color=fff', 4),
('Kaur Kesejahteraan', 'Kaur Kesejahteraan', 'https://ui-avatars.com/api/?name=Kaur+Kesra&size=400&background=9333ea&color=fff', 5),
('Kaur Keuangan', 'Kaur Keuangan', 'https://ui-avatars.com/api/?name=Kaur+Keuangan&size=400&background=0891b2&color=fff', 6),
('Kadus Dusun I', 'Kepala Dusun I', 'https://ui-avatars.com/api/?name=Kadus+I&size=400&background=65a30d&color=fff', 7),
('Kadus Dusun II', 'Kepala Dusun II', 'https://ui-avatars.com/api/?name=Kadus+II&size=400&background=b45309&color=fff', 8);

-- Profil
INSERT INTO profil (sejarah, visi, misi, geografis, luas, penduduk) VALUES
('Desa Aneka Marga merupakan salah satu desa yang terletak di Kecamatan Rarowatu Utara, Kabupaten Bombana, Provinsi Sulawesi Tenggara. Desa ini terbentuk dari keragaman latar belakang masyarakat yang bersatu membangun wilayah yang lebih baik. Nama "Aneka Marga" mencerminkan keberagaman asal-usul warganya yang datang dari berbagai daerah dan bersatu dalam satu komunitas yang harmonis. Sejak berdirinya, Desa Aneka Marga terus berkembang dengan memanfaatkan potensi sumber daya alam yang melimpah, khususnya di sektor pertanian dan perkebunan.',
 'Terwujudnya Desa Aneka Marga yang Maju, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Kearifan Lokal.',
 '1. Meningkatkan kualitas pelayanan publik kepada seluruh lapisan masyarakat.\n2. Mengembangkan potensi ekonomi lokal berbasis pertanian, perkebunan, dan UMKM.\n3. Meningkatkan kualitas infrastruktur dasar dan sarana prasarana desa.\n4. Memberdayakan masyarakat melalui pendidikan, pelatihan, dan pembinaan.\n5. Memperkuat tata kelola pemerintahan desa yang transparan, akuntabel, dan partisipatif.\n6. Menjaga ketertiban, keamanan, dan kerukunan antar warga masyarakat.',
 'Desa Aneka Marga terletak di Kecamatan Rarowatu Utara, Kabupaten Bombana, Provinsi Sulawesi Tenggara. Secara geografis, desa ini berada di wilayah daratan dengan kondisi topografi yang bervariasi. Desa Aneka Marga berbatasan langsung dengan desa-desa tetangga di lingkup Kecamatan Rarowatu Utara. Aksesibilitas menuju desa dapat dijangkau melalui jalan darat dari ibu kota Kabupaten Bombana.',
 'Kurang lebih 500 Ha',
 'Kurang lebih 1.500 jiwa');

-- Potensi
INSERT INTO potensi (nama, deskripsi, gambar, kategori) VALUES
('Pertanian Padi', 'Lahan persawahan produktif yang menghasilkan padi sebagai komoditas utama. Petani Desa Aneka Marga secara rutin melakukan panen dua kali dalam setahun dengan hasil yang cukup untuk memenuhi kebutuhan lokal.', 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600', 'Pertanian'),
('Perkebunan Kelapa', 'Perkebunan kelapa yang tersebar di berbagai wilayah desa. Hasil kelapa diolah menjadi kopra, minyak kelapa, dan berbagai produk turunan yang bernilai ekonomi tinggi.', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600', 'Pertanian'),
('Perkebunan Kakao', 'Tanaman kakao tumbuh subur di Desa Aneka Marga. Biji kakao berkualitas baik menjadi salah satu komoditas unggulan yang dipasarkan ke pengepul di tingkat kecamatan dan kabupaten.', 'https://images.unsplash.com/photo-1547414368-ac947d00b91d?w=600', 'Pertanian'),
('Peternakan Sapi', 'Usaha peternakan sapi potong yang dikelola warga secara tradisional. Sapi Bombana dikenal memiliki kualitas daging yang baik dan menjadi salah satu sumber pendapatan keluarga.', 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600', 'Peternakan'),
('Wisata Alam', 'Keindahan alam Desa Aneka Marga dengan hamparan sawah dan perkebunan yang asri berpotensi dikembangkan sebagai destinasi agrowisata untuk menarik wisatawan lokal.', 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600', 'Pariwisata'),
('Kerajinan Lokal', 'Warga desa memiliki keterampilan membuat kerajinan tangan dari bahan-bahan alam lokal yang dapat dikembangkan menjadi produk bernilai jual tinggi.', 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600', 'UMKM');

-- Layanan
INSERT INTO layanan (nama, persyaratan) VALUES
('Surat Keterangan Domisili', 'KTP asli dan fotokopi
Kartu Keluarga (KK) asli dan fotokopi
Surat Pengantar dari RT/RW'),

('Surat Keterangan Usaha', 'KTP asli dan fotokopi
Kartu Keluarga (KK) asli dan fotokopi
Foto tempat usaha
Surat Pengantar dari RT/RW'),

('Surat Keterangan Tidak Mampu (SKTM)', 'KTP asli dan fotokopi
Kartu Keluarga (KK) asli dan fotokopi
Surat Pengantar dari RT/RW
Foto kondisi rumah'),

('Surat Pengantar Pembuatan KTP', 'Formulir permohonan KTP (tersedia di kantor desa)
Kartu Keluarga (KK) asli dan fotokopi
Akta Kelahiran
Pas foto ukuran 4x6 (2 lembar, background merah untuk usia genap / biru untuk usia ganjil)'),

('Surat Pengantar Kartu Keluarga (KK)', 'Formulir permohonan KK (tersedia di kantor desa)
KTP pemohon asli dan fotokopi
Akta Kelahiran seluruh anggota keluarga
Buku Nikah / Akta Cerai (jika berlaku)'),

('Surat Keterangan Kematian', 'KTP almarhum/almarhumah
Kartu Keluarga (KK)
Surat Pengantar dari RT/RW
Surat keterangan dari tenaga kesehatan (jika ada)'),

('Surat Keterangan Kelahiran', 'Surat Keterangan Lahir dari bidan/rumah sakit
KTP kedua orang tua
Kartu Keluarga (KK)
Buku Nikah orang tua');

-- Kontak
INSERT INTO kontak (telepon, email, alamat, maps, jam_pelayanan) VALUES
(NULL,
 'desaanekamarga@gmail.com',
 'Kantor Desa Aneka Marga
Kecamatan Rarowatu Utara
Kabupaten Bombana
Provinsi Sulawesi Tenggara',
 NULL,
 'Senin – Kamis : 08.00 – 14.00 WITA
Jumat          : 08.00 – 11.30 WITA
Sabtu – Minggu : Libur');

SELECT 'Berhasil! Semua tabel yang hilang sudah dibuat dan data sample sudah diisi.' AS status;
