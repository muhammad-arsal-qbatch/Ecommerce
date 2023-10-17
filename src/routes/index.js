import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Login from '../container/auth/login';
import ForgotPassword from '../container/auth/forgotPassword';
import NewPassword from '../container/auth/newPassword';
import AdminProducts from '../container/admin/adminProducts';
import Layout from '../layout';
import AdminDashboard from '../container/admin/adminDashboard';
import AdminOrder from '../container/admin/adminOrder';
import UserHomepage from '../container/user/userHomepage';
import Cart from '../container/user/cart';
import Checkout from '../container/user/checkout';
import CustomNavbar from '../components/navbar';
import Orders from '../container/user/orders';
import Signup from '../container/auth/signup';

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
              <Route path="/" element={<AdminDashboard />}></Route>
              <Route path="/ad-p" element={<AdminProducts />}></Route>
              <Route path="/ad-o" element={<AdminOrder />}></Route>
              <Route path="*" element={<AdminDashboard/>}/>

            </Routes>
          </Layout>
            )
          : (
          <Layout showSidebar={false}>
            <Routes>
              <Route path="/" element={<UserHomepage />}>
                {' '}
              </Route>
              <Route path="/c" element={<Cart />}>
                {' '}
              </Route>
              <Route path="/checkout" element={<Checkout />}>
                {' '}
              </Route>
              <Route path="/o" element={<Orders />} />
              <Route path="*" element={<UserHomepage/>}/>

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
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/np" element={<NewPassword />}></Route>
          <Route path="*" element={<Login/>}/>

        </Routes>
      </>
    );
  }
};
CustomRoutes.propTypes = {
  token: PropTypes.bool
};
export default CustomRoutes;
