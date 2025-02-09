### Список зависимостей
```
express 
typescript 
prisma 
```

### СУБД
```
postgresql
```

### Структура проекта:
```
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
|   |   └── productController.ts        
│   ├── repositories/
│   │   └── productRepository.ts
│   ├── routes/
│   │   └── productRoutes.ts
|   ├── services/
│   │   └── productService.ts
│   └── app.ts
├── .env
├── package.json
└── tsconfig.json
```