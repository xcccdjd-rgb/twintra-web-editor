# Limitations

Berikut ini adalah keterbatasan (limitations) dari aplikasi **DSRT — Digital Smart Revise Technology**:

## 1. Dukungan Format
- Hanya mendukung format gambar umum seperti JPG, PNG, dan SVG.
- Editor video terbatas pada format MP4 dan WebM.
- Tidak mendukung format RAW foto dan beberapa codec video profesional.

## 2. Proses Editing
- Pemrosesan video menggunakan ffmpeg.js dilakukan sepenuhnya di browser, sehingga performa sangat tergantung pada spesifikasi perangkat pengguna.
- File video dengan ukuran besar (>100MB) dapat menyebabkan lag, crash, atau kegagalan proses.
- Editing secara real-time mungkin tidak sehalus aplikasi desktop profesional.

## 3. Fitur Logo Designer
- Pembuat logo berbasis fabric.js cocok untuk kebutuhan dasar/intermediate, belum mendukung fitur desain tingkat lanjut seperti grid snapping, path manipulation kompleks, dan export vector layer terpisah.

## 4. Autentikasi & Penyimpanan
- Autentikasi masih sederhana, tidak memiliki integrasi OAuth/social login.
- Data user dan hasil editing hanya disimpan secara lokal (LocalStorage/IndexedDB), belum ada cloud sync.
- Jika cache browser dibersihkan, data bisa hilang.

## 5. Kompatibilitas Browser
- Optimal pada Chrome dan Edge versi terbaru.
- Beberapa fitur animasi Framer Motion dan editor video mungkin tidak berjalan baik di Safari atau Firefox versi lama.
- Tidak sepenuhnya mendukung perangkat mobile dengan RAM < 2GB.

## 6. Security & Privacy
- Tidak ada enkripsi file hasil editing secara default.
- Tidak ada audit keamanan mendalam, gunakan dengan data non-sensitif.

## 7. Ekspor & Impor
- Ekspor file gambar/video terbatas pada resolusi yang didukung browser (biasanya hingga 4096x4096 px).
- Tidak mendukung batch editing/mass export.

## 8. Fitur Lain
- Belum tersedia fitur kolaborasi real-time/multi user.
- Tidak tersedia plugin/ekstensi pihak ketiga.
- Fitur undo/redo masih terbatas pada beberapa aksi.

---

Jika Anda membutuhkan fitur di luar lingkup di atas, silakan buat issue atau kontak pengembang.
