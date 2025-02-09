import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductPage from '../pages/ProductPage';
import ProductEdit from '../pages/ProductEdit';
import ProductCreate from '../pages/ProductCreate';

const ProductRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/create" element={<ProductCreate />} />
      <Route path="/products/edit/:id" element={<ProductEdit />} />
    </Routes>
  );
};

export default ProductRoutes;
