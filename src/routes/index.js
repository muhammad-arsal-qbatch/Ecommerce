import PropTypes from 'prop-types';

import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from '../container/auth/login';
import ForgotPassword from '../container/auth/forgot-password';
import NewPassword from '../container/auth/newPassword';
import Signup from '../container/auth/signup';

import AdminProducts from '../container/admin/adminProducts';
import AdminOrder from '../container/admin/adminOrder';
import AdminDashboard from '../container/admin/adminDashboard';

import UserHomepage from '../container/user/userHomepage';
import Orders from '../container/user/orders';
import Cart from '../container/user/cart';
import Checkout from '../container/user/checkout';

import Layout from '../layout';

import CustomNavbar from '../components/navbar';

const CustomRoutes = () => {
  const token = useSelector((state) => state.authentication.token);
  const isAdmin = useSelector((state) => state.authentication.isAdmin);
  if (token) {
    return (
      <>
        {isAdmin
          ? (
          <Layout>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/ad-p" element={<AdminProducts />} />
              <Route path="/ad-o" element={<AdminOrder />} />
              <Route path="*" element={<AdminDashboard />} />
            </Routes>
          </Layout>
            )
          : (
          <Layout showSidebar={false}>
            <Routes>
              <Route path="/" element={<UserHomepage />} />
              <Route path="/c" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/o" element={<Orders />} />
              <Route path="*" element={<UserHomepage />} />
            </Routes>
          </Layout>
            )}
      </>
    );
  } else {
    return (
      <>
        <Routes>
          <Route
            path="/"
            element={<UserHomepage cn={<CustomNavbar />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/np" element={<NewPassword />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </>
    );
  }
};

CustomRoutes.propTypes = {
  token: PropTypes.bool
};

export default CustomRoutes;
