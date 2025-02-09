export interface ProductInput {
  name: string;
  description?: string;
  price: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Функция для валидации входных данных продукта.
 * @param data - Объект с входными данными
 * @returns { valid: boolean, errors: ValidationError[] }
 */
export const validateProductInput = (data: any): { valid: boolean; errors: ValidationError[] } => {
  const errors: ValidationError[] = [];

  // Проверяем поле "name"
  if (typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push({
      field: 'name',
      message: 'Название продукта обязательно и должно быть непустой строкой',
    });
  }

  // Если поле "description" присутствует, оно должно быть строкой
  if (data.description !== undefined && typeof data.description !== 'string') {
    errors.push({
      field: 'description',
      message: 'Описание продукта должно быть строкой',
    });
  }

  // Проверяем поле "price"
  if (typeof data.price !== 'number' || isNaN(data.price) || data.price <= 0) {
    errors.push({
      field: 'price',
      message: 'Цена продукта должна быть числом больше 0',
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
