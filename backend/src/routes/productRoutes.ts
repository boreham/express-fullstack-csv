import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  exportProducts // Новый контроллер для экспорта
} from '../controllers/productController';

const router: Router = Router();

// Получение списка продуктов
router.get('/', getAllProducts);
// Получение одного продукта по ID
router.get('/:id', getProductById);
// Создание нового продукта
router.post('/', createProduct);
// Обновление продукта по ID
router.put('/:id', updateProduct);
// Удаление продукта по ID
router.delete('/:id', deleteProduct);
// Новый маршрут для экспорта продуктов в CSV
router.get('/export', exportProducts);

export default router;
