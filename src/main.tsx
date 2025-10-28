import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RouterProvider from './Router';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <RouterProvider />
    </StrictMode>
  </BrowserRouter>
);
