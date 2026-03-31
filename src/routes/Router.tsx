import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/components/layout/MainLayout';
import AllStocksPage from '@/pages/AllStocksPage';
import ChatPage from '@/pages/ChatPage';
import InterestStockPage from '@/pages/InterestStockPage';
import MainPage from '@/pages/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'all-stocks', element: <AllStocksPage /> },
      { path: 'interest', element: <InterestStockPage /> },
    ],
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/chat/:symbol',
    element: <ChatPage />,
  },
]);

export default router;
