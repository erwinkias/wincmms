import bcrypt from 'bcryptjs';
import { PrismaClient, UserRole, AssetStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@wincmms.local' },
    update: {},
    create: {
      email: 'admin@wincmms.local',
      username: 'admin',
      name: 'Admin WinCMMS',
      phone: '081200000001',
      passwordHash,
      role: UserRole.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: 'supervisor@wincmms.local' },
    update: {},
    create: {
      email: 'supervisor@wincmms.local',
      username: 'supervisor',
      name: 'Supervisor WinCMMS',
      phone: '081200000002',
      passwordHash,
      role: UserRole.SUPERVISOR,
    },
  });

  await prisma.user.upsert({
    where: { email: 'technician@wincmms.local' },
    update: {},
    create: {
      email: 'technician@wincmms.local',
      username: 'technician',
      name: 'Technician WinCMMS',
      phone: '081200000003',
      passwordHash,
      role: UserRole.TECHNICIAN,
    },
  });

  await prisma.user.upsert({
    where: { email: 'requester@wincmms.local' },
    update: {},
    create: {
      email: 'requester@wincmms.local',
      username: 'requester',
      name: 'Requester WinCMMS',
      phone: '081200000004',
      passwordHash,
      role: UserRole.REQUESTER,
    },
  });

  const site = await prisma.site.upsert({
    where: { code: 'JKT-PLANT' },
    update: {},
    create: {
      code: 'JKT-PLANT',
      name: 'Jakarta Plant',
      address: 'Cakung, Jakarta',
    },
  });

  const category = await prisma.assetCategory.upsert({
    where: { name: 'Utility' },
    update: {},
    create: { name: 'Utility', description: 'Utility equipment' },
  });

  await prisma.asset.upsert({
    where: { assetCode: 'AST-001' },
    update: {},
    create: {
      assetCode: 'AST-001',
      name: 'Air Compressor #1',
      categoryId: category.id,
      siteId: site.id,
      manufacturer: 'Atlas Copco',
      model: 'GA30',
      status: AssetStatus.ACTIVE,
    },
  });

  await prisma.sparePart.upsert({
    where: { partCode: 'PRT-001' },
    update: {},
    create: {
      partCode: 'PRT-001',
      name: 'Bearing 6205',
      unit: 'pcs',
      stockQty: 24,
      minStockQty: 10,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
