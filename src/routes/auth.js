import { Route, Routes } from 'react-router-dom';
import Login from '../container/auth/login';
import Signup from '../container/auth/signup';
import ForgotPassword from '../container/auth/forgot-password';
import NewPassword from '../container/auth/new-password';

const AuthRoutes = () => {
  return (
    <Routes>

    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgotPassword" element={<ForgotPassword />} />
    <Route path="/np" element={<NewPassword />} />
    <Route path="*" element={<Login />} />
  </Routes>
  )
};

export default AuthRoutes;
