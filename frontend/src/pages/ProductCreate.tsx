import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/productService';
import {
  FormContainer,
  FormWrapper,
  FormTitle,
  Form,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  SaveButton,
  CancelButton,
} from '../styles/FormStyles'; // Импорт стилей
import { validateProductInput, ValidationError } from '../utills/validation'; // Импорт функции валидации

const ProductCreate: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Преобразуем цену в число
    const parsedPrice = parseFloat(price);

    // Выполняем валидацию входных данных
    const { valid, errors: validationErrors } = validateProductInput({
      name,
      description,
      price: parsedPrice,
    });

    // Если валидация не пройдена, устанавливаем ошибки и прерываем отправку формы
    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createProduct({ name, description, price: parsedPrice });
      navigate('/');
    } catch (error) {
      console.error('Ошибка создания продукта', error);
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        <FormTitle>Создать продукт</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Label>Название</Label>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          {errors.find((err) => err.field === 'name') && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              {errors.find((err) => err.field === 'name')?.message}
            </span>
          )}

          <Label>Описание</Label>
          <TextArea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          {errors.find((err) => err.field === 'description') && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              {errors.find((err) => err.field === 'description')?.message}
            </span>
          )}

          <Label>Цена</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {errors.find((err) => err.field === 'price') && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              {errors.find((err) => err.field === 'price')?.message}
            </span>
          )}

          <ButtonGroup>
            <SaveButton type="submit">Создать</SaveButton>
            <CancelButton type="button" onClick={() => navigate('/')}>
              Отмена
            </CancelButton>
          </ButtonGroup>
        </Form>
      </FormWrapper>
    </FormContainer>
  );
};

export default ProductCreate;
