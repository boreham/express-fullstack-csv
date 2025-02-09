### Тестирование проекта

### 🔄 Тестирование
```sh
npm start
```

### 1️⃣ Получить все продукты
```sh
curl -X GET http://localhost:3000/api/products
```

### 2️⃣ Получить продукт по ID
```sh
curl -X GET http://localhost:3000/api/products/1
```

### 3️⃣ Создать продукт
```sh
curl -X POST http://localhost:3000/api/products \
     -H "Content-Type: application/json" \
     -d '{
          "name": "iPhone 15",
          "description": "Новый iPhone с топовыми характеристиками",
          "price": 999.99
         }'
```

### 4️⃣ Обновить продукт по ID
```sh
curl -X PUT http://localhost:3000/api/products/1 \
     -H "Content-Type: application/json" \
     -d '{
          "name": "iPhone 15 Pro",
          "description": "Обновленный iPhone 15 с титановой рамкой",
          "price": 1099.99
         }'
```

### 5️⃣ Удалить продукт по ID
```sh
curl -X DELETE http://localhost:3000/api/products/1
```

### 🔄 Экспорт продуктов
```sh
curl -X GET http://localhost:3000/api/products/export -o products.csv
```