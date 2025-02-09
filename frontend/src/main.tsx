import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import ProductRoutes from './routes/productRoutes';
import GlobalStyle from './styles/GlobalStyle';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <GlobalStyle />
      <App />
      {/* <ProductRoutes /> */}
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
