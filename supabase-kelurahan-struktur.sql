-- ============================================
-- MIGRASI: Ubah tabel pejabat untuk kelurahan
-- Jalankan di Supabase → SQL Editor
-- ============================================

-- 1. Tambah kolom kategori jika belum ada
ALTER TABLE pejabat ADD COLUMN IF NOT EXISTS kategori TEXT DEFAULT 'perangkat';

-- 2. Hapus data lama (opsional — hapus comment jika ingin reset)
-- TRUNCATE TABLE pejabat;

-- 3. Insert data struktur kelurahan
-- Urutan menentukan posisi tampilan (semakin kecil semakin atas)

INSERT INTO pejabat (nama, jabatan, kategori, foto, urutan) VALUES
-- PIMPINAN
('Justang Busasa, S.IP',  'Lurah',             'pimpinan', NULL, 1),
('Amrin Medeing, S.IP',   'Sekretaris Lurah',  'pimpinan', NULL, 2),

-- PERANGKAT KELURAHAN
('—',          'Kasi Tata Pemerintahan',            'perangkat', NULL, 3),
('—',          'Kaur Pemberdayaan Masyarakat',       'perangkat', NULL, 4),
('Symran, S.IP','Kasi Ketentraman & Ketertiban',     'perangkat', NULL, 5),

-- KEPALA LINGKUNGAN
('Tony Sri Widodo', 'Kepala Lingkungan 1', 'lingkungan', NULL, 6),
('—',               'Kepala Lingkungan 2', 'lingkungan', NULL, 7),
('Didik Prasetyo',  'Kepala Lingkungan 3', 'lingkungan', NULL, 8),

-- KETUA RT
('Nurmayana',       'Ketua RT 1A', 'rt', NULL, 9),
('Sandi Pria Utama','Ketua RT 1B', 'rt', NULL, 10),
('Dominikus',       'Ketua RT 2',  'rt', NULL, 11),
('Sudirman',        'Ketua RT 3',  'rt', NULL, 12),
('Abd. Yusuf',      'Ketua RT 4',  'rt', NULL, 13),
('Agus Nurochman',  'Ketua RT 5',  'rt', NULL, 14),
('Suntoro',         'Ketua RT 6',  'rt', NULL, 15),

-- KADER POSYANDU
('Mintari',         'Ketua Kader Posyandu',    'posyandu', NULL, 16),
('Siti Mudayaroh',  'Anggota Kader Posyandu',  'posyandu', NULL, 17),
('Juriah',          'Anggota Kader Posyandu',  'posyandu', NULL, 18),
('Marniati',        'Anggota Kader Posyandu',  'posyandu', NULL, 19),
('Ida Listyorini',  'Anggota Kader Posyandu',  'posyandu', NULL, 20);

SELECT 'Data struktur kelurahan berhasil dimasukkan.' AS status;
