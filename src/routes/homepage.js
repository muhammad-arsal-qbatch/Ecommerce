import { Routes, Route, useNavigate } from 'react-router-dom';

import CustomNavbar from '../components/navbar';
import UserHomepage from '../container/user/homepage';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const HomePageRoutes = () => {
  const token = useSelector((state) => state.authentication.token);
  const isAdmin = useSelector((state) => state.authentication.isAdmin);
  const navigation = useNavigate();
  useEffect(() => {
    if (!isAdmin && token) {
      navigation('/user')
    } else if (isAdmin && token) {
      navigation('/admin')
    }
  })

  return (
      <>
      {token === ''
        ? <Routes>
    <Route
    path="/"
    element={<UserHomepage cn={<CustomNavbar />} />}
  />
    </Routes>
        : null
}
    </>

  )
}

export default HomePageRoutes;
