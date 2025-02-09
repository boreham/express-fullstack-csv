import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from './pages/ProductPage';
import ProductCreate from './pages/ProductCreate';
import ProductEdit from './pages/ProductEdit';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/products/create" element={<ProductCreate />} />
                <Route path="/products/edit/:id" element={<ProductEdit />} />
            </Routes>
        </Router>
    );
}

export default App;