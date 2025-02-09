import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct, Product } from '../services/productService';
import {
  Container,
  ActionContainer,
  NewProductButton,
  SearchInput,
  LimitSelect,
  Table,
  Tr,
  Th,
  Td,
  EditButton,
  DeleteButton,
  BottomContainer,
  ProductCounter,
  PaginationContainer,
  PaginationButton
} from '../styles/PageStyles';
import ExportCSVButton from '../components/ExportCSVButton';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<keyof Product>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  // const productsPerPage = 5; // Количество продуктов на страницу
  const [productsPerPage, setProductsPerPage] = useState(5);
  // Получение списка продуктов с сервера
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Ошибка получения продуктов', error);
    }
  };

  // Удаление продукта и обновление списка
  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Ошибка удаления продукта', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Обработка сортировки: при повторном клике на тот же столбец переключается порядок сортировки
  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Возвращает стрелку для индикации направления сортировки
  const getSortIndicator = (field: keyof Product) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  // Сначала сортируем продукты
  const sortedProducts = [...products].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    } else {
      return sortOrder === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    }
  });

  // Фильтрация по поисковому запросу (по name и description)
  const filteredProducts = sortedProducts.filter(product => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(lowerQuery) ||
      (product.description && product.description.toLowerCase().includes(lowerQuery))
    );
  });

  // Обработчик изменения лимита отображаемых продуктов
  const handleProductsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1);  // Сброс текущей страницы на 1, когда меняем лимит
  };

  // Пагинация: вычисление индексов и получение текущей страницы
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <Container>
      <h1>Список продуктов</h1>

      <ActionContainer>
        <Link to="/products/create">
          <NewProductButton>Создать продукт</NewProductButton>
        </Link>
      </ActionContainer>

      {/* Кнопка экспорта в CSV */}
      <ActionContainer>
        <ExportCSVButton />
      </ActionContainer>

      {/* Поле поиска и список для выбора лимита */}
      <ActionContainer>
        <SearchInput
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Сброс к первой странице при изменении поиска
          }}
        />
        <LimitSelect value={productsPerPage} onChange={handleProductsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={50}>50</option>
        </LimitSelect>
      </ActionContainer>

      {/* Таблица */}
      <Table>
        <thead>
          <Tr>
            <Th onClick={() => handleSort('id')}>ID{getSortIndicator('id')}</Th>
            <Th onClick={() => handleSort('name')}>Название{getSortIndicator('name')}</Th>
            <Th onClick={() => handleSort('description')}>Описание{getSortIndicator('description')}</Th>
            <Th onClick={() => handleSort('price')}>Цена{getSortIndicator('price')}</Th>
            <Th>Действия</Th>
          </Tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.name}</Td>
              <Td>{product.description}</Td>
              <Td>${product.price}</Td>
              <Td>
                <Link to={`/products/edit/${product.id}`}>
                  <EditButton>Редактировать</EditButton>
                </Link>
                <DeleteButton onClick={() => handleDelete(product.id)}>Удалить</DeleteButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      {/* Счетчик и пагинация */}
      <BottomContainer>
        <ProductCounter>Всего продуктов: {filteredProducts.length}</ProductCounter>
        <PaginationContainer>
          <PaginationButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Предыдущая
          </PaginationButton>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationButton
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </PaginationButton>
          ))}
          <PaginationButton
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Следующая
          </PaginationButton>
        </PaginationContainer>
      </BottomContainer>
    </Container>
  );
};

export default ProductPage;
