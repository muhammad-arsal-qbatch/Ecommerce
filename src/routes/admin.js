import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminDashboard from '../container/admin/dashboard';
import AdminProducts from '../container/admin/products';
import AdminOrder from '../container/admin/orders';
import Layout from '../layout';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const AdminRoutes = () => {
  const navigation = useNavigate();
  const isAdmin = useSelector((state) => state.authentication.isAdmin);
  const token = useSelector((state) => state.authentication.token);
  useEffect(() => {
    if (token === '') {
      navigation('/');
    } else if (!isAdmin) {
      console.log('token is  ', isAdmin);
      navigation('/');
    }
  });
  return (
    <>
    {isAdmin && token !== ''
      ? <Layout>
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/ad-p" element={<AdminProducts />} />
      <Route path="/ad-o" element={<AdminOrder />} />
      <Route path="*" element={<AdminDashboard />} />
    </Routes>
  </Layout>
      : null
    }
    </>
  )
};

export default AdminRoutes;
