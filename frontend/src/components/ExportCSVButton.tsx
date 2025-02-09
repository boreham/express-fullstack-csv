import React from 'react';
import styled from 'styled-components';

// Простой стилизованный компонент кнопки
const Button = styled.button`
  padding: 8px 16px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 0px;

  &:hover {
    background-color: #1976d2;
  }
`;

const ExportCSVButton: React.FC = () => {
  const handleExportCSV = () => {
    // Используем window.open для перехода по ссылке экспорта
    // Если у вас настроена переменная окружения для API (например, VITE_API_URL), используйте её
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    window.open(`${apiUrl}/products/export`, '_blank');
  };

  return <Button onClick={handleExportCSV}>Экспорт в CSV</Button>;
};

export default ExportCSVButton;
