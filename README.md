# CV Builder

Sebuah alat berbasis Web (*Single Page Application*) yang dirancang khusus untuk mempermudah Anda dalam membuat, mengedit, dan mengekspor *Curriculum Vitae* (CV) secara instan tanpa perlu menginstall *software* tambahan.

## ✨ Fitur Utama

- **Real-Time Preview**: Apa yang Anda ketik di kolom *Editor* sebelah kiri akan langsung ditampilkan secara instan pada *Preview Paper* di sebelah kanan.
- **Sintaks Sederhana (Markdown-like)**: Tidak perlu lagi menggunakan tag HTML (`<strong>`, `<br>`). Cukup gunakan simbol bintang ganda `**seperti ini**` atau bintang tunggal `*seperti ini*` untuk menjadikan teks bercetak tebal (Bold). Tekan `Enter` / baris baru untuk memisahkan paragraf.
- **Dynamic Sections**: Anda dapat dengan mudah *menambah* atau *menghapus* list pada bagian Pendidikan (*Education*), Pengalaman Kerja (*Work Experience*), Keahlian (*Skills*), maupun Sertifikasi (*Certifications*).
- **Export to ATS-Friendly PDF**: Tombol otomatis memanggil fitur Print browser, yang sudah dioptimasi menggunakan margin CSS khusus agar hasil cetaknya rapi dan sesuai persis dengan standar ukuran A4. Anda hanya perlu menghilangkan opsi *Headers & Footers* di pengaturan *Print* browser agar tampil bersih.
- **Export to Word**: Dengan satu klik, Anda dapat mengunduh seluruh CV Anda dalam format `.doc` (Word Document) jika Anda perlu mengirimkan format dokumen yang dapat diedit oleh perekrut.
- **No Dependencies**: Dibuat `100% Vanilla`. Hanya mengandalkan 1 buah file HTML murni yang berisi CSS dan JavaScript (*No Frameworks/No Servers*). 

## 🚀 Cara Menggunakan

1. Temukan dan klik ganda (`double-click`) file `index.html`.
2. Halaman akan otomatis terbuka di Web Browser default Anda (seperti Google Chrome atau Microsoft Edge).
3. Isi atau ubah data Pribadi, Summary, Pendidikan, dan Pengalaman Kerja Anda pada panel Editor di sebelah kiri.
4. Gunakan gaya penulisan sederhana (misal, `**Product Manager**`).
5. Perhatikan panel sebelah kanan untuk memastikan tampilannya sudah memuaskan.
6. Klik **Export to PDF** untuk menyimpannya sebagai PDF (Pilih *Save as PDF*, ukuran A4).
7. Atau klik **Export to Word** untuk mendapatkan file Microsoft Word.

## 🛠️ Modifikasi Tingkat Lanjut

Jika Anda ingin mengubah skema warna, jenis font, atau *layout* bawaan, Anda cukup membuka file `index.html` tersebut melalui Text Editor (misalnya Notepad atau VSCode), lalu ubah kode di dalam blok `<style>` di bagian atas dokumen. Ini sangat mudah disesuaikan.
