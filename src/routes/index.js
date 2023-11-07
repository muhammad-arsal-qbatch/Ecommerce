import { Route, Routes } from 'react-router-dom';

import UserRoutes from './user';
import AuthRoutes from './auth';
import AdminRoutes from './admin';
import HomePageRoutes from './homepage';

const CustomRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePageRoutes />} />
    <Route path="/auth/*" element={<AuthRoutes />} />
    <Route path="/admin/*" element={<AdminRoutes />} />
    <Route path="/user/*" element={<UserRoutes />} />
    <Route path="*" element={<div className="empty-state-page">Page Not Found</div>}
    />
  </Routes>
);

export default CustomRoutes;
