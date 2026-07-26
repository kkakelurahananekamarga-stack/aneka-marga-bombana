-- Tambah kolom kategori ke tabel umkm
ALTER TABLE umkm ADD COLUMN IF NOT EXISTS kategori TEXT DEFAULT 'Jasa Lokal';

-- Update data yang sudah ada sesuai nama usaha
-- Sesuaikan UPDATE di bawah dengan nama UMKM yang ada di database kamu

-- Contoh update berdasarkan nama (sesuaikan dengan data riil):
UPDATE umkm SET kategori = 'Makanan & Minuman' WHERE nama ILIKE '%warung%' OR nama ILIKE '%makan%' OR nama ILIKE '%kuliner%' OR nama ILIKE '%catering%';
UPDATE umkm SET kategori = 'Kerajinan' WHERE nama ILIKE '%kerajinan%' OR nama ILIKE '%anyaman%' OR nama ILIKE '%bambu%' OR nama ILIKE '%jahit%';
UPDATE umkm SET kategori = 'Pertanian' WHERE nama ILIKE '%tani%' OR nama ILIKE '%kebun%' OR nama ILIKE '%sawah%' OR nama ILIKE '%pertanian%';
UPDATE umkm SET kategori = 'Jasa Lokal' WHERE kategori IS NULL OR kategori = 'Jasa Lokal';

SELECT id, nama, kategori FROM umkm ORDER BY nama;
