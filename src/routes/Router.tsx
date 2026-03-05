import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/components/layout/MainLayout';
import ChatPage from '@/pages/ChatPage';
import InterestStockPage from '@/pages/InterestStockPage';
import MainPage from '@/pages/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'interest', element: <InterestStockPage /> },
      { path: 'chat', element: <ChatPage /> },
    ],
  },
]);

export default router;
