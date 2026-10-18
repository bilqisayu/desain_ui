# Sistem Informasi Mahasiswa

Website statis ini dapat dipublikasikan melalui GitHub Pages. Deployment otomatis berjalan setiap kali ada perubahan yang di-push ke branch `main` atau `master`.

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
