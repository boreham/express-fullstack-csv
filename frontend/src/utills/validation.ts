export interface ProductInput {
    name: string;
    description?: string;
    price: number;
  }
  
  export interface ValidationError {
    field: string;
    message: string;
  }
  
  export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
  }
  
  /**
   * Функция для валидации входных данных продукта на клиенте.
   * 
   * @param data - Объект, содержащий данные продукта. Может быть частичным (Partial<ProductInput>), 
   *               чтобы позволить валидацию и при редактировании, когда не все поля обязательны.
   * @returns Объект с булевым флагом valid (true, если ошибок нет) и массивом ошибок.
   */
  export const validateProductInput = (data: Partial<ProductInput>): ValidationResult => {
    const errors: ValidationError[] = [];
  
    // Валидация поля "name": должно быть непустой строкой.
    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
      errors.push({
        field: 'name',
        message: 'Название продукта обязательно и не должно быть пустым.',
      });
    }
  
    // Если поле "description" задано, оно должно быть строкой.
    if (data.description !== undefined && typeof data.description !== 'string') {
      errors.push({
        field: 'description',
        message: 'Описание продукта должно быть строкой.',
      });
    }
  
    // Валидация поля "price": должно быть числом больше 0.
    if (data.price === undefined || typeof data.price !== 'number' || isNaN(data.price) || data.price <= 0) {
      errors.push({
        field: 'price',
        message: 'Цена продукта должна быть числом больше 0.',
      });
    }
  
    return {
      valid: errors.length === 0,
      errors,
    };
  };
  