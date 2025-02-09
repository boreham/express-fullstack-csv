import { PrismaClient } from '@prisma/client';
import { ProductInput } from '../services/productService';

const prisma = new PrismaClient();

// Получить все продукты
export const findAll = async () => {
  return prisma.product.findMany();
};

// Найти продукт по ID
export const findById = async (id: number) => {
  return prisma.product.findUnique({
    where: { id }
  });
};

// Создать новый продукт
export const create = async (data: ProductInput) => {
  return prisma.product.create({
    data
  });
};

// Обновить продукт
export const update = async (id: number, data: ProductInput) => {
  return prisma.product.update({
    where: { id },
    data
  });
};

// Удалить продукт
export const deleteProduct = async (id: number) => {
  return prisma.product.delete({
    where: { id }
  });
};
