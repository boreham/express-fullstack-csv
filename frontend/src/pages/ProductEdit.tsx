import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../services/productService';
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
} from '../styles/FormStyles';
import { validateProductInput, ValidationError } from '../utills/validation';

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(Number(id));
        setName(product.name);
        setDescription(product.description || '');
        setPrice(String(product.price));
      } catch (error) {
        console.error('Ошибка загрузки продукта', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Преобразуем значение цены в число
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
      await updateProduct(Number(id), { name, description, price: parsedPrice });
      navigate('/');
    } catch (error) {
      console.error('Ошибка обновления продукта', error);
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        <FormTitle>Редактировать продукт</FormTitle>
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
            <SaveButton type="submit">Сохранить</SaveButton>
            <CancelButton type="button" onClick={() => navigate('/')}>
              Отмена
            </CancelButton>
          </ButtonGroup>
        </Form>
      </FormWrapper>
    </FormContainer>
  );
};

export default ProductEdit;
