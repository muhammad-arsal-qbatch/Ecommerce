import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../container/admin/dashboard';
import AdminProducts from '../container/admin/products';
import AdminOrder from '../container/admin/orders';
import Layout from '../layout';

const AdminRoutes = () => {
  return (
    <Layout>
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/ad-p" element={<AdminProducts />} />
      <Route path="/ad-o" element={<AdminOrder />} />
      <Route path="*" element={<AdminDashboard />} />
    </Routes>
  </Layout>
  )
};

export default AdminRoutes;
