# Sistem Informasi Mahasiswa

Website statis ini dapat dipublikasikan melalui GitHub Pages. Deployment otomatis berjalan setiap kali ada perubahan yang di-push ke branch `main` atau `master`.

## Login demo

Halaman login ditampilkan sebelum Beranda. Isi NIM dan kata sandi apa pun untuk membuka contoh portal; sesi demo berlaku selama tab browser aktif, dan tombol keluar menghapus sesi tersebut. Karena website ini tidak memiliki backend autentikasi, formulir login tidak memverifikasi identitas atau kata sandi dan tidak boleh digunakan sebagai sistem login produksi.

## Publikasi pertama

1. Buat repository baru di GitHub, lalu salin URL repository tersebut.
2. Dari folder proyek ini, jalankan perintah berikut di PowerShell. Ganti URL contoh dengan URL repository Anda:

   ```powershell
   git init
   git add .
   git commit -m "Siapkan website Sistem Informasi Mahasiswa"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPOSITORY.git
   git push -u origin main
   ```

3. Di repository GitHub, buka **Settings → Pages** dan pilih **GitHub Actions** pada bagian **Build and deployment**.
4. Buka tab **Actions** dan tunggu workflow **Deploy static site to GitHub Pages** selesai.
5. Alamat website akan ditampilkan pada halaman workflow dan **Settings → Pages**.

Untuk perubahan berikutnya, commit dan push ke branch `main`; GitHub Actions akan menerbitkan versi terbaru secara otomatis.

## Ditemukan di Google

Website ini menyediakan metadata mesin pencari, halaman informasi publik `tentang.html`, aturan perayapan di `robots.txt`, dan sitemap di `sitemap.xml`. Setelah deployment berhasil:

1. Daftarkan properti `https://bilqisayu.github.io/desain_ui/` di [Google Search Console](https://search.google.com/search-console/), lalu verifikasi kepemilikan sesuai petunjuk Google.
2. Kirim sitemap `https://bilqisayu.github.io/desain_ui/sitemap.xml` melalui menu **Sitemaps**.
3. Gunakan **Inspeksi URL → Minta pengindeksan** untuk halaman utama dan halaman tentang.

Pengindeksan dilakukan oleh Google dan dapat memerlukan waktu; keberadaan sitemap tidak menjamin halaman akan muncul di hasil pencarian. Halaman yang dapat dibuka publik juga dapat dilihat siapa pun, sehingga jangan menaruh data pribadi atau rahasia di dalamnya.
