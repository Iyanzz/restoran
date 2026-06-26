# [Nama Restoran] — Website Restoran Premium Dark & Gold

Website statis untuk restoran dengan tema premium, elegan, dan modern menggunakan palet warna dark dengan aksen emas. Desain terinspirasi dari pengalaman fine dining dengan fokus pada tipografi serif, kontras nyaman, animasi halus, dan responsivitas penuh.

---

## Tujuan Proyek

Membuat landing page restoran yang:
- Menyampaikan kesan premium tanpa berlebihan.
- Menampilkan menu unggulan, menu lengkap per kategori, galeri, reservasi, lokasi, dan kontak.
- Memudahkan pengunjung untuk reservasi langsung via WhatsApp.
- Tampil optimal di desktop, tablet, dan ponsel.

---

## Fitur yang Sudah Diimplementasikan

### 1. Header
- Logo di kiri, navigasi di tengah/kanan.
- Header transparan di atas hero, berubah solid `#0F0F0F` dengan blur saat di-scroll.
- Tombol "Reservasi" kecil di header (tersembunyi di mobile, tampil di menu mobile).
- Navigasi mobile hamburger slide dari kanan.

### 2. Hero
- Full-width background foto fine dining dengan overlay gradient gelap.
- Headline, label premium, tagline, dan dua CTA (Reservasi Sekarang & Lihat Menu).

### 3. Menu Unggulan (6 Kartu)
- Grid 3 kolom desktop, 1 kolom mobile.
- Kartu berisi foto, nama, harga, deskripsi, dan badge "🔥 Best Seller" gold.
- Hover effect: kartu terangkat dengan shadow dan border gold lembut.

### 4. Menu Lengkap
- Tab kategori: Makanan Utama, Seafood, Steak, Minuman, Dessert.
- Tab aktif dengan highlight emas dan underline/glow.
- Format kartu konsisten (horizontal layout di desktop, vertikal di mobile).

### 5. Galeri
- Grid masonry 4 kolom desktop, 3 kolom tablet, 2 kolom mobile, 1 kolom extra small.
- Isi: makanan, interior, area makan, chef, suasana malam.
- Lightbox dengan zoom halus, navigasi prev/next, keyboard support (Escape, Arrow keys).

### 6. Reservasi
- Form ringkas: Nama, Jumlah Orang, Tanggal, Jam, Catatan (opsional).
- Submit membuka WhatsApp dengan pesan terisi otomatis.
- Tombol WhatsApp floating di pojok kanan bawah (selalu terlihat).

### 7. Lokasi
- Embed Google Maps.
- Alamat lengkap dan jam operasional per hari.

### 8. Kontak
- Kartu kontak: WhatsApp, Instagram, Facebook, TikTok, Email.
- Semua link dapat diklik dan terbuka di tab baru.

### 9. Footer
- Logo, copyright, link cepat, jam buka, dan kontak.

---

## Efek & Interaksi Premium
- Header transparan → solid saat scroll (dengan blur/shadow).
- Animasi scroll-reveal halus tiap section (fade + translateY).
- Tombol dengan efek glow emas saat hover/disentuh.
- Kartu menu terangkat dengan shadow saat hover.
- Galeri dengan zoom halus dan caption muncul saat hover.
- Floating WhatsApp button dengan animasi pulse.
- Sepenuhnya responsif.
- Mendukung `prefers-reduced-motion` untuk mengurangi/mematikan animasi.

---

## Struktur File

```
├── index.html          # Halaman utama
├── css/
│   └── style.css       # Styling lengkap (dark & gold)
├── js/
│   └── main.js         # Interaktivitas website
└── README.md           # Dokumentasi proyek
```

---

## URI / Entry Point

| Path | Deskripsi |
|------|-----------|
| `/index.html` | Halaman utama website |
| `#menu-unggulan` | Section menu unggulan |
| `#menu-lengkap` | Section menu lengkap dengan tab |
| `#galeri` | Section galeri foto |
| `#reservasi` | Section form reservasi |
| `#lokasi` | Section peta dan jam operasional |
| `#kontak` | Section kontak media sosial |

---

## Placeholder yang Perlu Diganti

Sebelum dipublikasikan, ganti placeholder berikut dengan data restoran yang sebenarnya:

| Placeholder | Lokasi | Contoh |
|-------------|--------|--------|
| `[Nama Restoran]` | `index.html`, `js/main.js`, `README.md` | "Emas Rasa" |
| `+62 812-3456-7890` | `index.html`, `js/main.js` | Nomor WhatsApp aktif |
| `6281234567890` | `js/main.js` | WhatsApp format 62 tanpa +/0/spasi |
| `@namarestoran` | `index.html` | Handle Instagram/TikTok |
| `Nama Restoran` | `index.html` | Nama halaman Facebook |
| `hello@namarestoran.com` | `index.html` | Email resmi |
| Alamat di Lokasi | `index.html` | Alamat lengkap restoran |
| Google Maps embed | `index.html` | Embed URL peta lokasi restoran |
| Harga menu | `index.html` | Harga aktual restoran |
| Foto makanan & interior | `index.html` | Ganti URL gambar Unsplash dengan foto asli |

---

## Teknologi yang Digunakan

- **HTML5** — semantic markup.
- **CSS3** — custom properties, flexbox, grid, animations, transitions.
- **Vanilla JavaScript** — tanpa framework, ringan dan cepat.
- **Google Fonts** — Playfair Display (serif) & Inter (sans-serif).
- **Font Awesome** — ikon gratis via CDN.
- **Unsplash** — gambar placeholder gratis.

---

## Cara Menggunakan

1. Buka `index.html` di browser untuk melihat pratinjau.
2. Ganti semua placeholder `[Nama Restoran]` dan data kontak dengan informasi restoran.
3. Ganti URL gambar Unsplash dengan foto asli restoran (disarankan rasio 4:3 untuk menu, dan variasi landscape/square untuk galeri).
4. Ubah nomor WhatsApp di `js/main.js` pada variabel `phoneNumber`.
5. Jalankan **Publish** untuk membuat website live.

---

## Catatan Penting

- Website ini sepenuhnya statis (frontend-only). Tidak ada backend atau database.
- Reservasi mengarahkan ke WhatsApp; tidak menyimpan data di server.
- Semua gambar berasal dari Unsplash placeholder dan dapat diganti.
- Pastikan kontras teks tetap nyaman dengan mengganti background foto hero/galeri jika diperlukan (overlay gradient sudah disediakan).

---

## Rekomendasi Pengembangan Selanjutnya

- Menambahkan halaman detail menu individual.
- Integrasi dengan Table API untuk menyimpan daftar reservasi (opsional, memerlukan backend via API).
- Menambahkan testimoni pelanggan.
- Menambahkan dark mode toggle (jika diinginkan meskipun tema sudah dark).
- Mengganti gambar placeholder dengan foto profesional restoran.
- Menambahkan schema markup JSON-LD untuk SEO (Restaurant, LocalBusiness).
- Menambahkan favicon dan Open Graph meta tags.

---

## Publikasi

Untuk membuat website ini dapat diakses online, silakan gunakan tombol **Publish** di editor. Tidak diperlukan konfigurasi server tambahan.
