# ArtRetro LMS - Product Requirements Document (PRD)

## 1. Project Overview
ArtRetro LMS adalah sebuah *prototype* platform Learning Management System (LMS) Full-Stack yang dikhususkan untuk pelatihan kelas seni (Seni Musik, Seni Rupa, Seni Tari, Seni Drama, dll). Aplikasi ini mengusung antarmuka dengan tema **"Modern Retro"** (kombinasi warna-warna pastel/vibrant klasik, *bold borders*, tipografi retro yang *clean*, dengan fungsionalitas modern). Aplikasi ini dirancang untuk siap di-*deploy* melalui integrasi GitHub dan menggunakan arsitektur Supabase untuk *backend as a service*.

## 2. Target Audience, User Roles & Route Protection
Aplikasi ini memiliki 3 peran (*roles*) pengguna. **PENTING UNTUK AI:** Implementasikan perlindungan rute menggunakan **Next.js Middleware (`middleware.ts`)** secara ketat.

- **Role 1: Admin (`ADMIN`)**
  - **Hak Akses:** Mengelola seluruh pengguna (Instruktur & Siswa), memantau transaksi, dan mengelola kategori seni.
  - **Proteksi:** Wajib dilindungi middleware. Rute `/admin/*` hanya bisa diakses oleh role `ADMIN`. Redirect role lain ke `/`.
- **Role 2: Instruktur (`INSTRUCTOR`)**
  - **Hak Akses:** CRUD kelas/modul, mengunggah materi (video/dokumen/gambar).
  - **Proteksi:** Rute `/instructor/*` hanya bisa diakses oleh role `INSTRUCTOR`. Redirect role lain ke `/`.
- **Role 3: Siswa (`STUDENT`)**
  - **Hak Akses:** Menjelajahi katalog kelas, memasukkan kelas ke keranjang, *checkout*, dan mengakses materi (video/PDF) di *learning dashboard*.
  - **Proteksi:** Rute `/dashboard/*` dan `/learn/*` mewajibkan user untuk login (terautentikasi).

## 3. Core Features (MVP) & Logic
- **Autentikasi:** Menggunakan **Supabase Auth** (Email/Password). Tabel *users* publik harus tersinkronisasi (melalui *trigger* atau *insert* manual setelah pendaftaran) untuk menyimpan data `role`.
- **Manajemen Keranjang (Cart State):** Mengingat ini adalah *prototype* dan untuk menghemat beban *database*, **wajib gunakan Zustand (dikombinasikan dengan `persist` / Local Storage)** untuk menyimpan data keranjang di sisi *client*. **TIDAK PERLU** membuat tabel keranjang di Supabase. Data dari keranjang baru dikirim ke *database* pada saat proses Checkout (berubah menjadi data `transactions`).
- **Manajemen File (Upload Media):** Wajib menggunakan **Supabase Storage**. Buat dua *bucket*: `course-thumbnails` (publik, untuk gambar *cover* kelas) dan `course-materials` (privat, untuk video/dokumen pembelajaran). 
- **Checkout & Pembayaran (Prototype):** Checkout dilakukan dengan mengirimkan data dari *Cart* (Zustand) ke API *Route Handler* Next.js, yang akan membuat entri di tabel `transactions` dan `enrollments` di Supabase. Setelah berhasil, kosongkan *state* Zustand.
- **Desain Modern Retro:** Wajib kustomisasi `tailwind.config.ts`. Gunakan *brutalism* ringan (bayangan hitam tebal / *hard shadows*), border tebal, warna latar belakang *warm/off-white* (#FDFBF7), dan aksen warna retro (seperti *mustard yellow*, *teal*, *terracotta*).

## 4. Tech Stack & Libraries
- **Frontend & Backend Framework:** Next.js 14+ (App Router), React, TypeScript. API menggunakan Server Actions atau Route Handlers.
- **Styling & UI:** Tailwind CSS, Shadcn UI (untuk komponen dasar), `next-themes` (opsional untuk *dark mode*, pastikan *dark mode* tetap bernuansa retro-gelap), Lucide React (Ikon).
- **Database & ORM:** PostgreSQL (via Supabase), **wajib gunakan Drizzle ORM** untuk mendefinisikan skema dan melakukan *query*.
- **Authentication:** Supabase Auth (Server-Side Client implementation).
- **State Management:** Zustand (Client-side Cart & UI states).
- **Storage:** Supabase Storage.

## 5. Database Schema (Drizzle ORM Format)
AI Agent wajib mendesain skema Drizzle ORM sesuai struktur berikut:

- **Tabel `users`**:
  - `id` (UUID, PK, berelasi dengan `auth.users` Supabase)
  - `name` (String, Not Null)
  - `email` (String, Unique, Not Null)
  - `role` (Enum: 'ADMIN', 'INSTRUCTOR', 'STUDENT', Default: 'STUDENT')
  - `created_at` (Timestamp, Default Now)
- **Tabel `categories`** (Kategori Seni):
  - `id` (UUID, PK)
  - `name` (String, Unique) // cth: Musik, Tari, Rupa
- **Tabel `courses`** (Modul/Kelas):
  - `id` (UUID, PK)
  - `instructor_id` (UUID, FK ke `users.id`)
  - `category_id` (UUID, FK ke `categories.id`)
  - `title` (String, Not Null)
  - `description` (Text)
  - `price` (Integer, Not Null) // Rp 0 untuk gratis
  - `thumbnail_url` (String) // Dari Supabase Storage
  - `created_at` (Timestamp, Default Now)
- **Tabel `lessons`** (Materi Pembelajaran):
  - `id` (UUID, PK)
  - `course_id` (UUID, FK ke `courses.id`)
  - `title` (String, Not Null)
  - `content_url` (String) // Link Video/PDF dari Supabase Storage
  - `order` (Integer) // Urutan materi
- **Tabel `transactions`**:
  - `id` (UUID, PK)
  - `student_id` (UUID, FK ke `users.id`)
  - `total_amount` (Integer)
  - `status` (Enum: 'PENDING', 'SUCCESS')
  - `created_at` (Timestamp)
- **Tabel `enrollments`** (Akses Kelas setelah sukses):
  - `id` (UUID, PK)
  - `student_id` (UUID, FK ke `users.id`)
  - `course_id` (UUID, FK ke `courses.id`)
  - `transaction_id` (UUID, FK ke `transactions.id`)

## 6. User Interface & Routing (Struktur Halaman)
- **Public Routes:**
  - `/` : Landing Page (Hero section desain retro, daftar kategori seni, featured courses).
  - `/courses` : Katalog semua kelas dengan filter kategori.
  - `/courses/[id]` : Detail kelas (deskripsi, harga, silabus materi, tombol "Add to Cart").
  - `/cart` : Halaman keranjang (dibaca dari Zustand) dan tombol Checkout.
  - `/login`, `/register` : Autentikasi.
- **Protected Routes (Siswa - `STUDENT`):**
  - `/dashboard` : Daftar kelas yang sudah dibeli (Enrollments).
  - `/learn/[courseId]/[lessonId]` : Video player / PDF viewer untuk materi.
- **Protected Routes (Instruktur - `INSTRUCTOR`):**
  - `/instructor` : Dasbor instruktur.
  - `/instructor/courses` : CRUD kelas, *upload thumbnail*, dan tambah materi video.
- **Protected Routes (Admin - `ADMIN`):**
  - `/admin` : Ringkasan jumlah *user* dan transaksi.
  - `/admin/users` : Manajemen peran *user*.

## 7. Step-by-Step Implementation Plan (Untuk Prompting AI)
**Instruksi kepada AI Agent:** Kerjakan proyek ini secara bertahap menggunakan urutan berikut. Jangan melompat ke langkah berikutnya sebelum langkah saat ini selesai dan diverifikasi:

- **Langkah 1 (Setup & UI Dasar Tema Retro):** Inisialisasi Next.js (App Router), Tailwind CSS, dan Shadcn UI. Kustomisasi file `tailwind.config.ts` untuk mengimplementasikan palet warna "Modern Retro" (warm backgrounds, bold typography, brutalism ringan dengan hard borders/shadows). Buat Layout utama dan komponen Navigasi.
- **Langkah 2 (Mockup Halaman & State Client - Zustand):** Buat UI statis untuk Landing Page, Katalog Kelas, dan Detail Kelas. Implementasikan Zustand dengan *persisted state* (Local Storage) untuk fitur Keranjang (`/cart`). Pastikan item bisa ditambah/dihapus dari keranjang secara reaktif di sisi *client* tanpa *database*.
- **Langkah 3 (Database & Drizzle ORM Setup):** Konfigurasi koneksi ke Supabase PostgreSQL. Setup Drizzle ORM, buat file skema sesuai definisi pada poin 5 di PRD ini. Jalankan migrasi *database*. Konfigurasi Supabase Storage untuk *bucket* publik dan privat.
- **Langkah 4 (Autentikasi & Route Protection):** Integrasikan Supabase Auth. Buat *trigger* atau logika untuk menyimpan data pendaftaran ke tabel `users` publik. Implementasikan Next.js Middleware (`middleware.ts`) untuk memproteksi rute `/admin`, `/instructor`, dan `/dashboard` berdasarkan *role user*.
- **Langkah 5 (Integrasi Backend & Fitur Inti):** Sambungkan UI dengan data *database* (CRUD kelas untuk instruktur, upload media ke Storage). Buat *Server Actions* untuk menangani *checkout* dari halaman keranjang (memindahkan data Zustand ke tabel `transactions` dan `enrollments`), lalu selesaikan UI Learning Dashboard (pemutar materi) untuk siswa.
```eof

Dokumen PRD ini sekarang sudah siap! Anda bisa memberikan keseluruhan isi dokumen `.md` ini sebagai perintah (prompt) pertama Anda kepada AI Coding Agent pilihan Anda (misalnya dengan instruksi: *"Halo AI, tolong bangun aplikasi ini berdasarkan PRD berikut. Mulailah dari Langkah 1"*).

Apakah ada detail spesifik lain yang ingin Anda sesuaikan, atau Anda sudah siap untuk mulai *coding* dengan AI?