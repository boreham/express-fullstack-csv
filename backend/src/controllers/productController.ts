import { Request, Response } from 'express';
import {
  getProducts,
  getProduct,
  addProduct,
  modifyProduct,
  removeProduct
} from '../services/productService';
import { validateProductInput } from '../utills/validation';

// Получение всех продуктов (можно оставить без изменений, но тоже можно указать Promise<void>)
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении продуктов' });
  }
};

// Получение продукта по ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  try {
    const product = await getProduct(id);
    if (!product) {
      res.status(404).json({ error: 'Продукт не найден' });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении продукта' });
  }
};

// Создание нового продукта (аналогично можно аннотировать тип)
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, description, price } = req.body;

  // Валидация входных данных
  const { valid, errors } = validateProductInput({ name, description, price });

  if (!valid) {
    res.status(400).json({ errors });
    return;
  }

  try {
    const newProduct = await addProduct({ name, description, price });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Ошибка при создании продукта:', error);
    res.status(500).json({ error: 'Ошибка при создании продукта' });
  }
};

// Обновление продукта
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  // Проверяем, является ли ID числом
  const productId = Number(id);
  if (isNaN(productId) || productId <= 0) {
    res.status(400).json({ error: 'Неверный ID продукта' });
    return;
  }

  // Валидируем входные данные
  const { valid, errors } = validateProductInput({ name, description, price });

  if (!valid) {
    res.status(400).json({ errors });
    return;
  }

  try {
    const updatedProduct = await modifyProduct(productId, { name, description, price });

    if (!updatedProduct) {
      res.status(404).json({ error: 'Продукт не найден' });
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Ошибка при обновлении продукта:', error);
    res.status(500).json({ error: 'Ошибка сервера при обновлении продукта' });
  }
};

// Удаление продукта
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  try {
    const deletedProduct = await removeProduct(id);
    if (!deletedProduct) {
      res.status(404).json({ error: 'Продукт не найден' });
      return;
    }
    res.json({ message: 'Продукт успешно удалён' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении продукта' });
  }
};

export const exportProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // Получаем список продуктов
    const products = await getProducts();

    // Формируем заголовок CSV (можно изменить в зависимости от нужных полей)
    const header = 'id,name,description,price,createdAt,updatedAt';

    // Формируем строки CSV (учтите, что для простоты пример не обрабатывает специальные символы, например, запятые внутри полей)
    const rows = products.map(product => {
      return `${product.id},"${product.name}","${product.description || ''}",${product.price},"${product.createdAt}","${product.updatedAt}"`;
    });

    const csvContent = [header, ...rows].join('\n');

    // Устанавливаем заголовки ответа для скачивания файла CSV
    res.header('Content-Type', 'text/csv');
    res.attachment('products.csv');  // Указывает наименование файла для скачивания
    res.send(csvContent);  // Отправляем CSV напрямую в ответ
  } catch (error) {
    console.error('Ошибка при экспорте продуктов в CSV:', error);
    res.status(500).json({ error: 'Ошибка при экспорте продуктов в CSV' });
  }
};