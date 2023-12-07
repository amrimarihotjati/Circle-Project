# Cara Menjalankan Aplikasi React dalam Docker

**Penulis**: Mas Taufik

Panduan ini menjelaskan cara menjalankan aplikasi React dalam sebuah kontainer Docker. Ikuti langkah-langkah di bawah ini untuk menyiapkan dan menjalankan aplikasi Anda.

## Langkah 1: Buat Dockerfile dan .dockerignore

Buat sebuah `Dockerfile` untuk membangun aplikasi React Anda di dalam kontainer Docker. Selain itu, buat file `.dockerignore` untuk menentukan file dan folder yang harus dikecualikan dari konteks pembangunan Docker.

## Langkah 2: Modifikasi vite.config.ts

Perbarui file `vite.config.ts` Anda dengan konfigurasi berikut untuk memastikan aplikasi React Anda berjalan dengan benar dalam kontainer Docker:

```javascript
export default defineConfig(
  {
    plugins:
      [
        react(),
      ],
    server:
      {
        host: "0.0.0.0",
        port: 3000,
      },
  }
);
```

Konfigurasi ini diperlukan untuk mengatur host dan port dengan benar.

## Langkah 3 dan 4: Bangun Gambar Docker dan Jalankan Kontainer Docker

Bangun gambar Docker dengan perintah berikut:

```bash
docker build -t react-docker/threads:1.0.0 .
```

Perintah ini membuat gambar Docker dengan tag dan versi yang ditentukan. Untuk menjalankan kontainer Docker, jalankan perintah berikut:

```bash
docker run -d -p 3002:3000 react-docker/threads:1.0.0
```

Perintah ini memulai kontainer Docker, memetakan port 3002 pada host ke port 3000 di dalam kontainer. Gantilah "react-docker/threads:1.0.0" dengan nama gambar dan versi Anda.

## Akses Aplikasi

Setelah kontainer Docker berjalan, Anda dapat mengakses aplikasi React Anda di http://localhost:3002.
