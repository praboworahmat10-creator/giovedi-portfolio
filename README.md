# Portfolio — Giovedi Rahmat Prabowo

Website portofolio pribadi, dibangun dengan React, Vite, Tailwind CSS, dan Motion.

## Menjalankan

```bash
npm install
npm run dev       # mode development
npm run build     # build produksi ke folder dist/
npm run preview   # melihat hasil build
```

## Struktur

- `src/data/` — isi konten (profil, pengalaman, proyek, keahlian, sertifikat)
- `src/sections/` — bagian halaman (Hero, About, Experience, Projects, Certificates, Contact)
- `src/components/` — komponen pendukung (kartu ID, navbar, background, dll.)
- `public/` — CV, foto profil, favicon

## Form kontak

Salin `.env.example` menjadi `.env` lalu isi `VITE_FORMSPREE_ENDPOINT`. Tanpa endpoint, form akan membuka aplikasi email.
