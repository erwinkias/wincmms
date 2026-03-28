# PRD — WinCMMS MVP1

## 1. Ringkasan Produk
WinCMMS adalah aplikasi CMMS (Computerized Maintenance Management System) berbasis web untuk membantu tim maintenance mengelola aset, work order, preventive maintenance, dan sparepart secara terpusat.

MVP1 difokuskan pada pondasi data dan dokumentasi produk agar siap masuk ke tahap implementasi aplikasi.

## 2. Tujuan Produk
- Mendigitalisasi proses maintenance dasar
- Membuat data aset lebih rapi dan terstruktur
- Menyediakan alur maintenance request sampai work order
- Menyediakan preventive maintenance schedule
- Mencatat penggunaan sparepart
- Menjadi basis pengembangan dashboard dan operasional maintenance

## 3. Target Pengguna
- Admin
- Maintenance Supervisor
- Technician
- Requester / Operator

## 4. Scope MVP1
### Included
- Dokumentasi PRD
- Dokumentasi ERD
- Prisma schema awal
- Setup project Next.js + Prisma + MySQL
- Data model untuk:
  - users
  - sites
  - locations
  - asset categories
  - assets
  - maintenance requests
  - work orders
  - work order labor
  - spare parts
  - work order parts
  - PM schedules
  - checklist templates
  - checklist template items
  - work order checklists
  - notifications
  - audit logs

### Excluded
- UI dashboard lengkap
- Authentication implementation
- API routes lengkap
- Mobile app
- ERP / IoT integration
- Purchasing module
- Predictive maintenance

## 5. Modul Inti
### 5.1 User & Role
- Menyimpan data user
- Role: ADMIN, SUPERVISOR, TECHNICIAN, REQUESTER
- Status aktif/nonaktif

### 5.2 Site & Location
- Site sebagai lokasi utama
- Location sebagai hirarki area/detail lokasi
- Mendukung parent-child location

### 5.3 Asset Management
- Registrasi aset
- Kategori aset
- Penempatan aset ke site/location
- Status aset
- Histori maintenance

### 5.4 Maintenance Request
- Pelaporan masalah dari requester/operator
- Prioritas request
- Referensi ke asset atau location
- Sumber pembuatan work order

### 5.5 Work Order
- Work order manual atau dari request
- Assignment teknisi
- Status pekerjaan
- Labor tracking
- Part usage
- Root cause dan resolution

### 5.6 Preventive Maintenance
- PM schedule per asset
- Frekuensi harian/mingguan/bulanan/every X days
- Keterkaitan dengan checklist template

### 5.7 Spare Parts
- Master data sparepart
- Stok dan minimum stok
- Pencatatan pemakaian pada work order

### 5.8 Notification & Audit
- Notifikasi in-app dasar
- Audit log perubahan data penting

## 6. Business Rules
- Asset wajib berada dalam site
- Asset retired tidak boleh punya PM aktif baru
- Request yang sudah dikonversi tidak boleh dikonversi ulang
- Work order closed tidak boleh diedit sembarangan
- Sparepart tidak boleh minus kecuali override admin
- Technician hanya boleh update WO yang ditugaskan kepadanya, kecuali supervisor/admin

## 7. Success Criteria MVP1
- Repository WinCMMS siap dipakai sebagai base project
- PRD dan ERD terdokumentasi jelas
- Prisma schema awal selesai dan konsisten
- README instalasi jelas untuk local setup

## 8. Roadmap Setelah MVP1
- Implementasi auth
- Implementasi CRUD master data
- Implementasi work order workflow
- Implementasi dashboard
- Reporting dan export
- Upload lampiran
- QR asset tagging
