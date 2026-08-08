-- ============================================================
-- MONOGRAFI KELURAHAN ANEKA MARGA 2026
-- Jalankan di Supabase → SQL Editor
-- ============================================================

-- 1. Tambah kolom baru ke tabel profil
ALTER TABLE profil ADD COLUMN IF NOT EXISTS tahun_pembentukan TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS dasar_hukum TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS kode_pos TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS tipologi TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS tingkat_perkembangan TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS batas_utara TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS batas_selatan TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS batas_barat TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS batas_timur TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS jarak_kecamatan TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS jarak_kabupaten TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS jarak_provinsi TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS penduduk_laki TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS penduduk_perempuan TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS umr TEXT;
ALTER TABLE profil ADD COLUMN IF NOT EXISTS monografi_json JSONB;

-- 2. Hapus data lama jika ada, lalu insert data monografi 2026
DELETE FROM profil;

INSERT INTO profil (
    sejarah, visi, misi, geografis, luas, penduduk,
    tahun_pembentukan, dasar_hukum, kode_pos,
    tipologi, tingkat_perkembangan,
    batas_utara, batas_selatan, batas_barat, batas_timur,
    jarak_kecamatan, jarak_kabupaten, jarak_provinsi,
    penduduk_laki, penduduk_perempuan,
    umr,
    monografi_json
) VALUES (
    -- sejarah
    'Kelurahan Aneka Marga dibentuk pada tahun 2003 berdasarkan UU No. 29 Tahun 2003. Kelurahan ini terletak di Kecamatan Rarowatu Utara, Kabupaten Bombana, Provinsi Sulawesi Tenggara. Nama "Aneka Marga" mencerminkan keberagaman latar belakang warganya yang bersatu dalam satu komunitas yang harmonis. Dengan tipologi persawahan dan status berkembang, kelurahan ini terus berkomitmen menghadirkan layanan publik yang prima bagi seluruh masyarakat.',

    -- visi
    'Terwujudnya Kelurahan Aneka Marga yang Maju, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Kearifan Lokal.',

    -- misi
    'Meningkatkan kualitas pelayanan publik kepada seluruh lapisan masyarakat.
Mengembangkan potensi ekonomi lokal berbasis pertanian, perkebunan, dan UMKM.
Meningkatkan kualitas infrastruktur dasar dan sarana prasarana kelurahan.
Memberdayakan masyarakat melalui pendidikan, pelatihan, dan pembinaan.
Memperkuat tata kelola pemerintahan yang transparan, akuntabel, dan partisipatif.',

    -- geografis
    'Kelurahan Aneka Marga terletak di Kecamatan Rarowatu Utara, Kabupaten Bombana, Provinsi Sulawesi Tenggara. Wilayah ini memiliki tipologi persawahan yang subur. Berbatasan dengan Desa Marga Jaya di utara, Desa Tembe di selatan, Desa Wumbubangka di barat, dan Desa Tunas Baru di timur.',

    -- luas
    '12,69 m²',

    -- penduduk
    '1.345 Jiwa',

    -- identitas
    '2003',
    'UU No. 29 Tahun 2003',
    '93788',
    'Persawahan',
    'Berkembang',

    -- batas wilayah
    'Desa Marga Jaya',
    'Desa Tembe',
    'Desa Wumbubangka',
    'Desa Tunas Baru',

    -- orbitasi
    '0 Km',
    '16,1 Km',
    '136 Km',

    -- penduduk detail
    '669 Jiwa',
    '676 Jiwa',

    -- UMR
    'Rp3.073.551,70',

    -- data lengkap JSON
    '{
        "pekerjaan": [
            {"nama": "Pertanian, Perkebunan, Kehutanan, Perburuan, dan Perikanan", "jumlah": 267},
            {"nama": "Pertambangan dan Penggalian", "jumlah": 62},
            {"nama": "Industri Pengolahan", "jumlah": 63},
            {"nama": "Pengadaan Listrik, Gas, Uap/Air Panas, dan Udara Dingin", "jumlah": 1},
            {"nama": "Pengadaan Air, Pengelolaan Sampah dan Daur Ulang", "jumlah": 0},
            {"nama": "Konstruksi", "jumlah": 24},
            {"nama": "Perdagangan Besar dan Eceran; Reparasi Kendaraan", "jumlah": 131},
            {"nama": "Transportasi dan Pergudangan", "jumlah": 3},
            {"nama": "Penyediaan Akomodasi dan Makan Minum", "jumlah": 47},
            {"nama": "Informasi dan Komunikasi", "jumlah": 1},
            {"nama": "Jasa Keuangan dan Asuransi", "jumlah": 3},
            {"nama": "Real Estate", "jumlah": 0},
            {"nama": "Jasa Perusahaan", "jumlah": 3},
            {"nama": "Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial", "jumlah": 13},
            {"nama": "Jasa Pendidikan", "jumlah": 32},
            {"nama": "Jasa Kesehatan dan Kegiatan Sosial", "jumlah": 12},
            {"nama": "Jasa Lainnya", "jumlah": 6}
        ],
        "pendidikan": [
            {"nama": "SD/Sederajat", "jumlah": 280},
            {"nama": "SMP/Sederajat", "jumlah": 204},
            {"nama": "SMA/Sederajat", "jumlah": 244},
            {"nama": "Akademi/D1-D3", "jumlah": 5},
            {"nama": "Sarjana", "jumlah": 85},
            {"nama": "Pascasarjana", "jumlah": 8}
        ],
        "partisipasi_sekolah": [
            {"nama": "Tidak/Belum Pernah Bersekolah", "jumlah": 121},
            {"nama": "Masih Bersekolah", "jumlah": 298},
            {"nama": "Tidak Bersekolah Lagi", "jumlah": 857}
        ],
        "perlindungan_sosial": [
            {"nama": "Bantuan Sosial Sembako / BPNT", "jumlah": 152, "satuan": "keluarga"},
            {"nama": "Program Keluarga Harapan (PKH)", "jumlah": 57, "satuan": "keluarga"},
            {"nama": "Program BLT Desa", "jumlah": 3, "satuan": "keluarga"},
            {"nama": "Program Subsidi Listrik", "jumlah": 92, "satuan": "keluarga"},
            {"nama": "Program Bantuan Subsidi Pupuk", "jumlah": 125, "satuan": "keluarga"},
            {"nama": "Program Subsidi LPG", "jumlah": 419, "satuan": "keluarga"}
        ],
        "sarana_kesehatan": [
            {"nama": "Kantor Kelurahan", "jumlah": "Ada"},
            {"nama": "Puskesmas", "jumlah": "Tidak Ada"},
            {"nama": "Poskesdes", "jumlah": "0 buah"},
            {"nama": "UKBM (Posyandu, Polindes)", "jumlah": "1 buah"}
        ],
        "sarana_pendidikan": [
            {"nama": "Perpustakaan Kelurahan", "jumlah": "0 buah"},
            {"nama": "Gedung Sekolah PAUD", "jumlah": "0 buah"},
            {"nama": "Gedung Sekolah TK", "jumlah": "1 buah"},
            {"nama": "Gedung Sekolah SD", "jumlah": "2 buah"},
            {"nama": "Gedung Sekolah SMP", "jumlah": "1 buah"},
            {"nama": "Gedung Sekolah SMA", "jumlah": "1 buah"},
            {"nama": "Gedung Sekolah SMK", "jumlah": "1 buah"},
            {"nama": "Gedung Sekolah MA", "jumlah": "1 buah"},
            {"nama": "Gedung Perguruan Tinggi", "jumlah": "0 buah"}
        ],
        "sarana_ibadah": [
            {"nama": "Masjid", "jumlah": "1 buah"},
            {"nama": "Mushola", "jumlah": "4 buah"},
            {"nama": "Gereja", "jumlah": "2 buah"},
            {"nama": "Pura", "jumlah": "0 buah"},
            {"nama": "Vihara", "jumlah": "0 buah"},
            {"nama": "Klenteng", "jumlah": "0 buah"}
        ],
        "sarana_umum": [
            {"nama": "Fasilitas Olahraga", "jumlah": "1 buah"},
            {"nama": "Sarana Kesenian/Budaya", "jumlah": "0 buah"},
            {"nama": "Balai Pertemuan", "jumlah": "1 buah"},
            {"nama": "Sumur Kelurahan", "jumlah": "0 buah"},
            {"nama": "Pasar Kelurahan", "jumlah": "0 buah"},
            {"nama": "Perpustakaan Kelurahan", "jumlah": "0 buah"}
        ]
    }'::jsonb
);

SELECT 'Monografi Kelurahan Aneka Marga 2026 berhasil dimasukkan.' AS status;
