'use server';

import { UserRole, AssetStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/password';
import { assetSchema, siteSchema, sparePartSchema, userSchema } from '@/lib/validations';

export async function createUserAction(formData: FormData) {
  const parsed = userSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    username: formData.get('username'),
    phone: formData.get('phone'),
    role: formData.get('role'),
  });
  if (!parsed.success) return;

  await db.user.create({
    data: {
      ...parsed.data,
      passwordHash: await hashPassword('password123'),
      role: parsed.data.role as UserRole,
    },
  });
  revalidatePath('/admin/master/users');
}

export async function createSiteAction(formData: FormData) {
  const parsed = siteSchema.safeParse({
    code: formData.get('code'),
    name: formData.get('name'),
    address: formData.get('address'),
  });
  if (!parsed.success) return;

  await db.site.create({ data: parsed.data });
  revalidatePath('/admin/master/sites');
}

export async function createAssetAction(formData: FormData) {
  const parsed = assetSchema.safeParse({
    assetCode: formData.get('assetCode'),
    name: formData.get('name'),
    categoryId: formData.get('categoryId'),
    siteId: formData.get('siteId'),
    status: formData.get('status'),
  });
  if (!parsed.success) return;

  await db.asset.create({
    data: {
      ...parsed.data,
      status: parsed.data.status as AssetStatus,
    },
  });
  revalidatePath('/admin/master/assets');
}

export async function createSparePartAction(formData: FormData) {
  const parsed = sparePartSchema.safeParse({
    partCode: formData.get('partCode'),
    name: formData.get('name'),
    unit: formData.get('unit'),
    stockQty: formData.get('stockQty'),
    minStockQty: formData.get('minStockQty'),
  });
  if (!parsed.success) return;

  await db.sparePart.create({
    data: {
      partCode: parsed.data.partCode,
      name: parsed.data.name,
      unit: parsed.data.unit,
      stockQty: parsed.data.stockQty,
      minStockQty: parsed.data.minStockQty,
    },
  });
  revalidatePath('/admin/master/spare-parts');
}
