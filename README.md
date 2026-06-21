# Saraswati Dining — Website Restoran Fine Dining

Website profil & reservasi meja untuk restoran fine dining dengan tema **Aesthetic & Rapi** (clean, structured, premium).

---

## 🎯 Tujuan Proyek

Membangun kepercayaan pengunjung melalui presentasi visual yang bersih dan profesional sebelum mereka datang atau melakukan reservasi.

---

## ✅ Fitur yang Sudah Diimplementasi

### Halaman & Seksi
| Seksi | Deskripsi |
|---|---|
| **Hero** | Full-width background image dengan animasi zoom, headline, tagline, 2 CTA button, dan floating info bar |
| **Tentang** | Grid 2-kolom dengan 2 foto overlap, badge tahun berdiri, teks cerita + highlight stats |
| **Menu** | Tab system 4 kategori (Appetizer / Main Course / Dessert / Beverage), grid kartu menu dengan foto & harga |
| **Galeri** | Grid asimetris (wide + tall item), hover overlay, lightbox fullscreen dengan navigasi panah & swipe |
| **Private Dining** | Full-width promo section dengan overlay teks untuk layanan eksklusif |
| **Reservasi** | Form lengkap (nama, HP, tanggal, jam, tamu, jenis acara, catatan) → redirect WhatsApp dengan pesan otomatis |
| **Kontak** | Google Maps embed + kartu info kontak (alamat, jam, WA, Instagram) |
| **Footer** | 4-kolom grid dengan logo, navigasi, layanan, dan kontak + sosial media |

### Fitur Teknis
- ✅ **Sticky navigation** — transparan di hero, solid + blur saat scroll
- ✅ **Mobile hamburger menu** — overlay fullscreen dengan animasi
- ✅ **Menu tabs** — animasi fade-in saat ganti kategori
- ✅ **Lightbox galeri** — keyboard (← → Esc), swipe touch, caption
- ✅ **Form validation** — real-time error per field dengan visual feedback
- ✅ **WhatsApp redirect** — pesan terformat otomatis dari data form
- ✅ **Scroll reveal animations** — elemen muncul saat masuk viewport
- ✅ **Active nav highlight** — link aktif berubah sesuai seksi yang terlihat
- ✅ **Back-to-top button** — muncul setelah scroll 500px
- ✅ **Fully responsive** — desktop, tablet (900px), mobile (600px)
- ✅ **Lazy loading gambar** — performa lebih baik

---

## 📁 Struktur File

```
/
├── index.html          ← Satu halaman utama (single-page)
├── css/
│   └── style.css       ← Semua styling (CSS custom properties, responsive)
├── js/
│   └── main.js         ← Semua logika JS
└── README.md
```

---

## 🎨 Tema Visual

| Elemen | Detail |
|---|---|
| **Warna utama** | Off-white `#FAFAF8`, Surface `#FFFFFF`, Cream `#F5F3EE` |
| **Warna aksen** | Forest Green `#2D5016` |
| **Warna gold** | `#B49A5E` (logo mark, hero highlight) |
| **Font heading** | Cormorant Garamond (serif elegan) |
| **Font body** | Inter (sans-serif bersih) |

---

## 🔧 Kustomisasi Data Client

Untuk mengganti data restoran, cari dan ganti nilai berikut di `index.html`:

| Placeholder | Lokasi | Keterangan |
|---|---|---|
| `Saraswati Dining` | Judul, footer, pesan WA | Nama restoran |
| `6281234567890` | `js/main.js` baris 13, link WA | Nomor WA format internasional |
| `@saraswatidining` | Seksi kontak & footer | Username Instagram |
| `Jl. Kemang Raya No. 45…` | Hero info bar, kontak, footer | Alamat lengkap |
| Google Maps `src` | Seksi kontak | Ganti dengan embed Maps restoran asli |
| Semua menu & harga | Seksi menu | Sesuaikan item dan harga |

---

## 📱 Template Pesan WhatsApp Otomatis

```
Halo Saraswati Dining, saya ingin reservasi:

Nama: [nama]
No. HP: [no_hp]
Tanggal: [tanggal, format panjang Bahasa Indonesia]
Jam: [jam]
Jumlah orang: [jumlah]
Jenis: [Reguler/Private Dining/dll]
Catatan: [catatan atau "-"]

Mohon konfirmasi ketersediaan meja. Terima kasih.
```

---

## 🚀 Fitur Belum Diimplementasi (Opsional)

- [ ] Keranjang menu + kalkulasi total (jika restoran juga menerima take-away/delivery)
- [ ] Halaman menu PDF yang bisa diunduh
- [ ] Integrasi sistem reservasi online (misal: OpenTable, Resy)
- [ ] Pop-up promo / announcement bar
- [ ] Blog / artikel kuliner
- [ ] Multilingual (EN/ID)

---

## 📌 Cara Deploy

Buka tab **Publish** untuk mempublikasikan website ini secara online dengan satu klik.

---

*Template dibuat berdasarkan brief: Restoran Fine Dining — Tema Aesthetic & Rapi*
