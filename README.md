# WinCMMS

WinCMMS adalah blueprint awal aplikasi **CMMS (Computerized Maintenance Management System)** berbasis **Next.js + MySQL + Prisma**.

Repository ini disiapkan sebagai fondasi **MVP1** yang berisi dokumentasi produk, desain relasi data, dan schema database awal.

## Isi Repository

- `prd.md` — Product Requirements Document
- `erd.md` — Entity Relationship Design
- `prisma/schema.prisma` — schema Prisma awal untuk MVP1
- `src/app/page.tsx` — landing page awal project

## Tech Stack

- Next.js 15
- TypeScript
- MySQL
- Prisma ORM
- React 19

## Cara Install

### 1. Clone repository

```bash
git clone https://github.com/erwinkias/wincmms.git
cd wincmms
```

### 2. Install dependency

```bash
npm install
```

### 3. Buat database MySQL

Contoh:

```sql
CREATE DATABASE wincmms;
```

### 4. Siapkan environment file

```bash
cp .env.example .env
```

Lalu isi `DATABASE_URL` sesuai koneksi MySQL lokal/server Bos.

Contoh:

```env
DATABASE_URL="mysql://root:password@localhost:3306/wincmms"
```

### 5. Generate Prisma Client

```bash
npm run prisma:generate
```

### 6. Push schema ke database

```bash
npm run prisma:push
```

### 7. Jalankan aplikasi

```bash
npm run dev
```

Buka di browser:

```bash
http://localhost:3000
```

## Script yang Tersedia

```bash
npm run dev
npm run build
npm run start
npm run prisma:generate
npm run prisma:push
npm run prisma:migrate
npm run prisma:studio
```

## Scope MVP1 Saat Ini

MVP1 saat ini fokus pada:
- perumusan kebutuhan produk
- pemetaan relasi entitas
- penyiapan schema database awal
- scaffold awal Next.js

Belum mencakup:
- auth implementation
- CRUD UI lengkap
- API route lengkap
- dashboard operasional final
- reporting final

## Catatan

Kalau review Bos sudah oke, next step yang paling masuk akal:
1. implement auth + role
2. buat master data module
3. buat maintenance request + work order flow
4. lanjut ke dashboard dan PM module
