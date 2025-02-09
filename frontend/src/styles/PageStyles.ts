import styled from 'styled-components';

// Контейнер для центрирования содержимого
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

// Стили для поля поиска
const SearchInput = styled.input`
  padding: 8px 12px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

// Стили для таблицы
const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    overflow-x: auto;
  }
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  background-color: #f2f2f2;
  cursor: pointer;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

// Контейнер для нижней части (счетчик и пагинация)
const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 20px;
`;

// Счетчик продуктов
const ProductCounter = styled.div`
  font-size: 16px;
  color: #333;
`;

// Стили для пагинации
const PaginationContainer = styled.div`
  display: flex;
`;

const PaginationButton = styled.button`
  background-color: #fff;
  border: 1px solid #ddd;
  margin: 0 5px;
  padding: 8px 12px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
`;

const EditButton = styled(ActionButton)`
  background-color: #f3f03b;
  color: dark;

  &:hover {
    background-color: #f3f03b;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #d32f2f;
  }
`;

// Контейнер для действия (поиск и лимит)
const ActionContainer = styled.div`
  width: 80%;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    font-size: 14px;
    overflow-x: auto;
  }
`;

// Выпадающий список для выбора лимита
const LimitSelect = styled.select`
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 150px;
`;

// Кнопка для создания нового продукта
const NewProductButton = styled.button`
  padding: 10px 20px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  margin-right: 20px;
  transition: 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

export {
    Container,
    Table,
    Tr,
    Th,
    Td,
    BottomContainer,
    PaginationButton,
    PaginationContainer,
    ProductCounter,
    ActionButton,
    EditButton,
    DeleteButton,
    ActionContainer,
    SearchInput,
    LimitSelect,
    NewProductButton,
  };