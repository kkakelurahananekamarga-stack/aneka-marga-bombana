-- =====================================================
-- Tabel Kelembagaan Kelurahan Aneka Marga
-- Jalankan di Supabase SQL Editor
-- =====================================================

CREATE TABLE IF NOT EXISTS kelembagaan (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    organisasi text NOT NULL,         -- 'LPM' | 'TP_PKK' | 'KARANG_TARUNA'
    kelompok text,                    -- null / 'POKJA I' / 'Bidang Pendidikan' dll
    jabatan text NOT NULL,
    nama text NOT NULL,
    urutan int DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE kelembagaan ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read kelembagaan" ON kelembagaan FOR SELECT USING (true);

-- ── LPM ──────────────────────────────────────────────
INSERT INTO kelembagaan (organisasi, kelompok, jabatan, nama, urutan) VALUES
('LPM', null, 'Pengurus',  'H. Basri',       1),
('LPM', null, 'Anggota',   'Syadri',          2),
('LPM', null, 'Anggota',   'Arifuddin Ajim',  3);

-- ── TP PKK — Pengurus Inti ────────────────────────────
INSERT INTO kelembagaan (organisasi, kelompok, jabatan, nama, urutan) VALUES
('TP_PKK', 'Pengurus Inti', 'Ketua',      'Hayati',          1),
('TP_PKK', 'Pengurus Inti', 'Wakil Ketua','Dewi Hamdayani',  2),
('TP_PKK', 'Pengurus Inti', 'Sekretaris', 'Khoripah',        3),
('TP_PKK', 'Pengurus Inti', 'Bendahara',  'Murniati',        4);

-- ── TP PKK — POKJA I ─────────────────────────────────
INSERT INTO kelembagaan (organisasi, kelompok, jabatan, nama, urutan) VALUES
('TP_PKK', 'POKJA I', 'Ketua',      'Hayatul Almahfudho', 1),
('TP_PKK', 'POKJA I', 'Wakil',      'Sarah',              2),
('TP_PKK', 'POKJA I', 'Sekretaris', 'Yusmiati',           3),
('TP_PKK', 'POKJA I', 'Anggota',    'Windi Astuti',       4),
('TP_PKK', 'POKJA I', 'Anggota',    'Purwati Kasmir',     5),
('TP_PKK', 'POKJA I', 'Anggota',    'Sri Purwanti',       6),
('TP_PKK', 'POKJA I', 'Anggota',    'Hartini',            7),
('TP_PKK', 'POKJA I', 'Anggota',    'Mundryah',           8);

-- ── TP PKK — POKJA II ────────────────────────────────
INSERT INTO kelembagaan (organisasi, kelompok, jabatan, nama, urutan) VALUES
('TP_PKK', 'POKJA II', 'Ketua',      'Hariyani',       1),
('TP_PKK', 'POKJA II', 'Wakil',      'Sitti Aisah',    2),
('TP_PKK', 'POKJA II', 'Sekretaris', 'Dewi Ayu A.',    3),
('TP_PKK', 'POKJA II', 'Anggota',    'Sumiati',        4),
('TP_PKK', 'POKJA II', 'Anggota',    'Ana Safitri',    5),
('TP_PKK', 'POKJA II', 'Anggota',    'Sitti Khotijah', 6),
('TP_PKK', 'POKJA II', 'Anggota',    'Marifah',        7),
('TP_PKK', 'POKJA II', 'Anggota',    'Yenni Priyanti', 8);

-- ── TP PKK — POKJA III ───────────────────────────────
INSERT INTO kelembagaan (organisasi, kelompok, jabatan, nama, urutan) VALUES
('TP_PKK', 'POKJA III', 'Ketua',      'Rosmiati',       1),
('TP_PKK', 'POKJA III', 'Wakil',      'Yuli Bt. Nasir', 2),
('TP_PKK', 'POKJA III', 'Sekretaris', 'Nurmayana',      3),
('TP_PKK', 'POKJA III', 'Anggota',    'Yulia Sofianti', 4),
('TP_PKK', 'POKJA III', 'Anggota',    'Ritna Sari',     5),
('TP_PKK', 'POKJA III', 'Anggota',    'Nita Yanit',     6),
('TP_PKK', 'POKJA III', 'Anggota',    'Sri Ningsih',    7),
('TP_PKK', 'POKJA III', 'Anggota',    'Listiani',       8),
('TP_PKK', 'POKJA III', 'Anggota',    'Umiati',         9);

-- ── TP PKK — POKJA IV ────────────────────────────────
INSERT INTO kelembagaan (organisasi, kelompok, jabatan, nama, urutan) VALUES
('TP_PKK', 'POKJA IV', 'Ketua',      'Paina',           1),
('TP_PKK', 'POKJA IV', 'Wakil',      'M. Untari',       2),
('TP_PKK', 'POKJA IV', 'Sekretaris', 'Isni Nurhasanah', 3),
('TP_PKK', 'POKJA IV', 'Anggota',    'Juriah',          4),
('TP_PKK', 'POKJA IV', 'Anggota',    'Ida Listiorini',  5),
('TP_PKK', 'POKJA IV', 'Anggota',    'Sitti Mudayaroh', 6),
('TP_PKK', 'POKJA IV', 'Anggota',    'Hayati',          7),
('TP_PKK', 'POKJA IV', 'Anggota',    'Murniati',        8),
('TP_PKK', 'POKJA IV', 'Anggota',    'Marniati',        9);

-- ── Karang Taruna — Pengurus Inti ────────────────────
INSERT INTO kelembagaan (organisasi, kelompok, jabatan, nama, urutan) VALUES
('KARANG_TARUNA', 'Pengurus Inti', 'Ketua',      'Irman',        1),
('KARANG_TARUNA', 'Pengurus Inti', 'Wakil Ketua','Wahidin',       2),
('KARANG_TARUNA', 'Pengurus Inti', 'Sekretaris', 'Andi Musabar', 3),
('KARANG_TARUNA', 'Pengurus Inti', 'Bendahara',  'Samijo Anwar', 4);

-- ── Karang Taruna — Bidang ───────────────────────────
INSERT INTO kelembagaan (organisasi, kelompok, jabatan, nama, urutan) VALUES
('KARANG_TARUNA', 'Pendidikan & Pelatihan',       'Koordinator', 'Hesti Prabowo',      1),
('KARANG_TARUNA', 'Pendidikan & Pelatihan',       'Anggota',     'Bambang Ismoso',     2),
('KARANG_TARUNA', 'Pendidikan & Pelatihan',       'Anggota',     'Rahmad Adrina',      3),
('KARANG_TARUNA', 'Usaha & Kesejahteraan Sosial', 'Koordinator', 'Toni Sri Widodo',    1),
('KARANG_TARUNA', 'Usaha & Kesejahteraan Sosial', 'Anggota',     'Abdul Jalal',        2),
('KARANG_TARUNA', 'Usaha & Kesejahteraan Sosial', 'Anggota',     'Purwanti',           3),
('KARANG_TARUNA', 'Kelompok Usaha Bersama',       'Koordinator', 'Didik Dwi Prasetyo', 1),
('KARANG_TARUNA', 'Kelompok Usaha Bersama',       'Anggota',     'Jumari',             2),
('KARANG_TARUNA', 'Kelompok Usaha Bersama',       'Anggota',     'Abdul Yusuf',        3),
('KARANG_TARUNA', 'Keagamaan',                    'Koordinator', 'Ahmad Khoiri Sobri', 1),
('KARANG_TARUNA', 'Keagamaan',                    'Anggota',     'Rupaat',             2),
('KARANG_TARUNA', 'Keagamaan',                    'Anggota',     'Arifin',             3),
('KARANG_TARUNA', 'Olahraga & Seni Budaya',       'Koordinator', 'Sudriman',           1),
('KARANG_TARUNA', 'Olahraga & Seni Budaya',       'Anggota',     'Wahyu Ahsana',       2),
('KARANG_TARUNA', 'Olahraga & Seni Budaya',       'Anggota',     'Ihwan Muamar',       3),
('KARANG_TARUNA', 'Lingkungan Hidup',              'Koordinator', 'Agus Nurohman',     1),
('KARANG_TARUNA', 'Lingkungan Hidup',              'Anggota',     'Ari Aji Trinugroho',2),
('KARANG_TARUNA', 'Lingkungan Hidup',              'Anggota',     'Agus Salim',        3),
('KARANG_TARUNA', 'Humas & Kemitraan',             'Koordinator', 'Toni Sri Widodo',   1),
('KARANG_TARUNA', 'Humas & Kemitraan',             'Anggota',     'Arifin',            2),
('KARANG_TARUNA', 'Humas & Kemitraan',             'Anggota',     'Didik Dwi P.',      3),
('KARANG_TARUNA', 'Pemberdayaan Perempuan',        'Koordinator', 'Hariyani',          1),
('KARANG_TARUNA', 'Pemberdayaan Perempuan',        'Anggota',     'Khoripah',          2),
('KARANG_TARUNA', 'Pemberdayaan Perempuan',        'Anggota',     'Sri Ningsih',       3),
('KARANG_TARUNA', 'Koordinasi Bola Kaki',          'Koordinator', 'Irwan',             1),
('KARANG_TARUNA', 'Koordinasi Bola Kaki',          'Anggota',     'Febriyanti',        2),
('KARANG_TARUNA', 'Koordinasi Bola Kaki',          'Anggota',     'Yusuf',             3);
