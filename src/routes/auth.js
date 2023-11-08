import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../container/auth/login';
import Signup from '../container/auth/signup';
import ForgotPassword from '../container/auth/forgot-password';
import NewPassword from '../container/auth/new-password';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const AuthRoutes = () => {
  const token = useSelector((state) => state.authentication.token);
  const navigation = useNavigate();
  useEffect(() => {
    if (token !== '') {
      navigation('/');
    }
  })
  return (
    <>
    {token === ''
      ? <Routes>

    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgotPassword" element={<ForgotPassword />} />
    <Route path="/np" element={<NewPassword />} />
    <Route path="*" element={<Login />} />
  </Routes>
      : null
    }
  </>
  )
};

export default AuthRoutes;
