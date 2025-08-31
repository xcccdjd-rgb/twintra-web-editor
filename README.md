# DSRT — Digital Smart Revise Technology

**DSRT** adalah aplikasi web kreatif all-in-one untuk editing foto, video, dan desain logo langsung di browser.

## Fitur Utama
- **Editor Foto:** Crop, rotate, zoom, filter, export.
- **Editor Video:** Trim, merge, export, berbasis ffmpeg.js.
- **Pembuat Logo:** Interaktif, berbasis fabric.js.
- **UI Modern:** Splashscreen, animasi Framer Motion, bottom navigation, desain glass & neon.
- **Autentikasi Sederhana:** Responsive & mobile friendly.

---

## Instalasi & Penggunaan

1. **Clone repo**
   ```bash
   git clone https://github.com/xcccdjd-rgb/twintra-web-editor.git
   cd twintra-web-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau jika menggunakan yarn
   yarn install
   ```

3. **Setup environment (Opsional)**
   - Buat file `.env` di root project jika perlu mengatur API key, endpoint, dsb.
   - Contoh isi `.env`:
     ```
     REACT_APP_API_URL=https://api.example.com
     REACT_APP_FFMPEG_PATH=/path/to/ffmpeg
     ```

4. **Jalankan aplikasi**
   ```bash
   npm start
   # atau
   yarn start
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

---

## Build untuk Produksi

```bash
npm run build
# atau
yarn build
```
Output build ada di folder `build/`.

---

## Struktur Folder

- `src/` — Sumber kode utama
  - `components/` — Komponen UI
  - `pages/` — Halaman utama
  - `utils/` — Helper dan utilitas
  - `assets/` — Gambar, ikon, dll
- `public/` — File statis
- `.env` — Konfigurasi Environment (opsional)

---

## Dependensi Utama

- [React.js](https://react.dev/) — Framework UI
- [ffmpeg.js](https://github.com/Kagami/ffmpeg.js) — Video processing
- [fabric.js](http://fabricjs.com/) — Canvas & logo creation
- [Framer Motion](https://www.framer.com/motion/) — Animasi React
- [React Router](https://reactrouter.com/) — Routing
- Lainnya: styled-components, axios, dsb.

---

## FAQ

**Q:** Apakah bisa digunakan tanpa internet?  
**A:** Bisa, selama dependensi sudah terinstal dan tidak ada fitur yang membutuhkan API eksternal.

**Q:** Bagaimana cara export hasil edit?  
**A:** Terdapat tombol export pada setiap editor untuk menyimpan file ke device Anda.

**Q:** Bagaimana login?  
**A:** Autentikasi sederhana menggunakan email dan password. Data demo disimpan secara lokal.

---

## Limitations

Lihat daftar keterbatasan aplikasi di [LIMITATIONS.md](./LIMITATIONS.md).

---

## Kontribusi

1. Fork repo ini.
2. Buat branch baru: `git checkout -b fitur-baru`.
3. Commit perubahan dan push branch Anda.
4. Buat Pull Request.

---

## Lisensi

MIT License. Lihat file [LICENSE](./LICENSE).

---

## Support & Kontak

- Email: xcccdjd.rgb@gmail.com
- Issues: [GitHub Issues](https://github.com/xcccdjd-rgb/twintra-web-editor/issues)

---

**DSRT** dibuat untuk membantu proses editing digital secara efisien & mudah langsung dari browser Anda.
