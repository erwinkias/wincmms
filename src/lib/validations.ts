import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(3, 'Email atau username wajib diisi'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export const registerSchema = z.object({
  email: z.email('Email tidak valid'),
  username: z.string().min(3, 'Username minimal 3 karakter'),
  phone: z.string().min(8, 'Nomor telepon minimal 8 digit'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export const siteSchema = z.object({
  code: z.string().min(2),
  name: z.string().min(2),
  address: z.string().optional(),
});

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  username: z.string().min(3),
  phone: z.string().optional(),
  role: z.enum(['ADMIN', 'SUPERVISOR', 'TECHNICIAN', 'REQUESTER']),
});

export const assetSchema = z.object({
  assetCode: z.string().min(2),
  name: z.string().min(2),
  categoryId: z.string().min(1),
  siteId: z.string().min(1),
  status: z.enum(['ACTIVE', 'DOWN', 'MAINTENANCE', 'RETIRED']),
});

export const sparePartSchema = z.object({
  partCode: z.string().min(2),
  name: z.string().min(2),
  unit: z.string().min(1),
  stockQty: z.coerce.number().min(0),
  minStockQty: z.coerce.number().min(0),
});
