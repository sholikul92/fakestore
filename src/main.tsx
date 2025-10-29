import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RouterProvider from './Router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <StrictMode>
        <RouterProvider />
      </StrictMode>
    </BrowserRouter>
  </QueryClientProvider>
);
