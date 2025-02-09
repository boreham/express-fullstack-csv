import * as productRepository from '../repositories/productRepository';

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
}

// Получить все продукты
export const getProducts = async () => {
  return await productRepository.findAll();
};

// Получить продукт по ID
export const getProduct = async (id: number) => {
  return await productRepository.findById(id);
};

// Создать новый продукт
export const addProduct = async (data: ProductInput) => {
  return await productRepository.create(data);
};

// Обновить продукт
export const modifyProduct = async (id: number, data: ProductInput) => {
  return await productRepository.update(id, data);
};

// Удалить продукт
export const removeProduct = async (id: number) => {
  return await productRepository.deleteProduct(id);
};
