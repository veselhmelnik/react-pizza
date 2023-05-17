import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import MainPage from '../pages/mainPage/MainPage';
import CartPage from '../pages/cartPage/CartPage';

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
