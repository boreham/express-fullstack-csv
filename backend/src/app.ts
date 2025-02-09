import express, { Application } from 'express';
import productRoutes from './routes/productRoutes';
import cors from 'cors';

const app: Application = express();

// Включаем CORS для всех запросов
app.use(cors());

// Мидлвар для обработки JSON-запросов
app.use(express.json());

// Подключаем маршруты для работы с продуктами
app.use('/api/products', productRoutes);

// app.use(cors({
//   origin: 'http://localhost:5173'
// }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
