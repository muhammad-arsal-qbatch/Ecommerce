import Layout from '../layout';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserHomepage from '../container/user/homepage';
import Cart from '../container/user/cart';
import Checkout from '../container/user/checkout';
import Orders from '../container/user/orders';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const UserRoutes = () => {
  const navigation = useNavigate();
  const isAdmin = useSelector((state) => state.authentication.isAdmin);
  const token = useSelector((state) => state.authentication.token);

  useEffect(() => {
    if (token === '') {
      navigation('/');
    } else if (isAdmin) {
      console.log('token is ', isAdmin);
      navigation('/admin');
    }
  });

  return (
    <>{!isAdmin && token !== ''
      ? (
      <Layout showSidebar={false}>
        <Routes>
          <Route path="/" element={<UserHomepage />} />
          <Route path="/shoppingBag" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<UserHomepage />} />
        </Routes>
      </Layout>
        )
      : null}</>
  );
};

export default UserRoutes;
