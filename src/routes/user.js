import Layout from '../layout';
import { Route, Routes } from 'react-router-dom';
import UserHomepage from '../container/user/homepage';
import Cart from '../container/user/cart';
import Checkout from '../container/user/checkout';
import Orders from '../container/user/orders';

const UserRoutes = () => {
  return (
    <Layout showSidebar={false}>
    <Routes>
      <Route path="/" element={<UserHomepage />} />
      <Route path="/shoppingBag" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/o" element={<Orders />} />
      <Route path="*" element={<UserHomepage />} />
    </Routes>
  </Layout>
  )
};

export default UserRoutes;
