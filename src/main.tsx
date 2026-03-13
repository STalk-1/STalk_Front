import './polyfills';
import '@/styles/globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { FavoriteStocksProvider } from '@/contexts/FavoriteStocksContext';
import router from '@/routes/Router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoriteStocksProvider>
      <RouterProvider router={router} />
    </FavoriteStocksProvider>
  </StrictMode>
);
