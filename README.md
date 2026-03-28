# WinCMMS

WinCMMS adalah aplikasi **CMMS (Computerized Maintenance Management System)** berbasis **Next.js + Prisma + MySQL** dengan dashboard admin modern, dark theme, dan fondasi auth berbasis database.

## Fitur Saat Ini

- Auth login menggunakan **email atau username**
- Register dengan field:
  - email
  - username
  - phone number
  - password
- Logout
- Forgot password page (placeholder MVP)
- Dashboard admin dengan:
  - sidebar
  - navbar
  - footer
  - dark theme toggle
- CRUD master data berbasis database untuk:
  - users
  - sites
  - assets
  - spare parts
- Seeder akun default untuk setiap role
- UI menggunakan pendekatan **shadcn/ui style components**

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Prisma ORM
- MySQL
- Tailwind CSS v4
- next-themes
- bcryptjs
- shadcn-style UI components

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

```sql
CREATE DATABASE wincmms;
```

### 4. Siapkan environment

```bash
cp .env.example .env
```

Isi `DATABASE_URL`:

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

### 7. Jalankan seeder

```bash
npm run prisma:seed
```

### 8. Jalankan aplikasi

```bash
npm run dev
```

Akses:
- `http://localhost:3000`
- login: `http://localhost:3000/login`
- register: `http://localhost:3000/register`

## Default Seeder Accounts

Password default semua akun seed:

```bash
password123
```

Akun default:
- Admin → `admin@wincmms.local` / `admin`
- Supervisor → `supervisor@wincmms.local` / `supervisor`
- Technician → `technician@wincmms.local` / `technician`
- Requester → `requester@wincmms.local` / `requester`

## Script

```bash
npm run dev
npm run build
npm run start
npm run prisma:generate
npm run prisma:push
npm run prisma:migrate
npm run prisma:seed
npm run prisma:studio
```

## Catatan

- Forgot password masih placeholder untuk MVP
- CRUD saat ini fokus pada create + read data master
- Next step yang masuk akal: edit/delete master data, request/work order module, dan auth session yang lebih lengkap
