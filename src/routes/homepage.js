import { Routes, Route, useNavigate } from 'react-router-dom';

import CustomNavbar from '../components/navbar';
import UserHomepage from '../container/user/homepage';
import { useSelector } from 'react-redux';

const HomePageRoutes = () => {
  const token = useSelector((state) => state.authentication.token);
  const isAdmin = useSelector((state) => state.authentication.isAdmin);
  const navigation = useNavigate();

  if (!isAdmin && token) {
    navigation('/user')
  } else if (isAdmin && token) {
    navigation('/admin')
  }
  return (
    <Routes>
    <Route
    path="/"
    element={<UserHomepage cn={<CustomNavbar />} />}
  />
    </Routes>

  )
}

export default HomePageRoutes;
