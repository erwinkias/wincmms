# ERD — WinCMMS MVP1

## 1. Entitas Utama

### users
Menyimpan user sistem.
- id
- name
- email
- passwordHash
- role
- phone
- isActive
- createdAt
- updatedAt

### sites
Lokasi utama operasional.
- id
- name
- code
- address
- createdAt
- updatedAt

### locations
Hirarki area/lokasi detail.
- id
- siteId
- parentId
- name
- type
- description
- createdAt
- updatedAt

### assetCategories
Kategori aset.
- id
- name
- description

### assets
Data aset/mesin.
- id
- assetCode
- name
- categoryId
- siteId
- locationId
- manufacturer
- model
- serialNumber
- purchaseDate
- installDate
- warrantyExpiry
- criticality
- status
- specificationJson
- notes
- createdAt
- updatedAt

### maintenanceRequests
Permintaan maintenance.
- id
- requestNo
- requesterId
- assetId
- siteId
- locationId
- title
- description
- priority
- status
- photoUrl
- createdAt
- updatedAt

### workOrders
Data pekerjaan maintenance.
- id
- woNo
- type
- sourceRequestId
- assetId
- siteId
- locationId
- title
- description
- priority
- status
- assignedToId
- supervisorId
- dueDate
- startedAt
- completedAt
- downtimeMinutes
- rootCause
- resolution
- completionNote
- createdById
- createdAt
- updatedAt

### workOrderLabors
Jam kerja teknisi.
- id
- workOrderId
- technicianId
- startTime
- endTime
- hours
- note

### spareParts
Master sparepart.
- id
- partCode
- name
- category
- unit
- stockQty
- minStockQty
- storageLocation
- averageCost
- createdAt
- updatedAt

### workOrderParts
Pemakaian part pada WO.
- id
- workOrderId
- sparePartId
- quantity
- unitCost
- totalCost

### checklistTemplates
Template checklist.
- id
- name
- assetCategoryId
- description
- createdAt
- updatedAt

### checklistTemplateItems
Item pada checklist template.
- id
- templateId
- itemText
- itemType
- isRequired
- sortOrder

### pmSchedules
Jadwal preventive maintenance.
- id
- assetId
- name
- description
- frequencyType
- frequencyValue
- nextDueDate
- checklistTemplateId
- isActive
- createdAt
- updatedAt

### workOrderChecklists
Hasil checklist pada WO.
- id
- workOrderId
- templateItemId
- result
- note
- checkedById
- checkedAt

### notifications
Notifikasi user.
- id
- userId
- title
- body
- type
- isRead
- createdAt

### auditLogs
Audit perubahan.
- id
- userId
- action
- entityType
- entityId
- oldValuesJson
- newValuesJson
- createdAt

## 2. Relasi
- Site 1..N Location
- Site 1..N Asset
- Site 1..N MaintenanceRequest
- Site 1..N WorkOrder
- Location 1..N Asset
- Location 1..N MaintenanceRequest
- Location 1..N WorkOrder
- Location 1..N Location (self-reference)
- AssetCategory 1..N Asset
- AssetCategory 1..N ChecklistTemplate
- Asset 1..N MaintenanceRequest
- Asset 1..N WorkOrder
- Asset 1..N PMSchedule
- User 1..N MaintenanceRequest
- User 1..N Assigned WorkOrder
- User 1..N Supervised WorkOrder
- User 1..N Created WorkOrder
- WorkOrder 1..N WorkOrderLabor
- WorkOrder 1..N WorkOrderChecklist
- WorkOrder N..N SparePart via WorkOrderPart
- MaintenanceRequest 1..N WorkOrder
- ChecklistTemplate 1..N ChecklistTemplateItem
- ChecklistTemplate 1..N PMSchedule
- ChecklistTemplateItem 1..N WorkOrderChecklist
- User 1..N Notification
- User 1..N AuditLog

## 3. Catatan Desain
- Location dibuat hirarkis untuk site > building > area > room > line
- Work order dapat dibuat manual atau dari maintenance request
- PM schedule terhubung ke asset dan optional checklist template
- Inventory movement detail belum dimasukkan di MVP1, baru level pemakaian WO
