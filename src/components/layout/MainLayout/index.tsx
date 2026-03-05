import { Outlet } from 'react-router-dom';

import Header from '@/components/layout/MainHeader';
import TabBar from '@/components/layout/TabBar';

function MainLayout() {
  return (
    <>
      <Header />
      <main className="bg-bg min-h-screen w-full">
        <section className="layout-content w-full px-5">
          <TabBar />
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default MainLayout;
