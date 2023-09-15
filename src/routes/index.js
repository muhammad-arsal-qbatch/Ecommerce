import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from '../container/auth/login'
import ForgotPassword from '../container/auth/forgotPassword';
import NewPassword from '../container/auth/newPassword';
import CustomNavbar from '../components/navbar';
import SideBar from '../components/sideBar';
import AdminHomePage from '../container/admin/adminHomePage';
import AdminProducts from '../container/admin/adminProducts';
import CustomTable from '../components/customTable';

const CustomRoutes = (props) => {
  const {
    token = false
  } = props
  if (token === 'true') {
    return (
        <Routes>
      <Route path='/' element = {<Login/>} ></Route>
      <Route path='/fg' element = {<ForgotPassword/>} ></Route>
      <Route path='/np' element = {<NewPassword/>} ></Route>
      <Route path='/nv' element = {<CustomNavbar/>} ></Route>
      <Route path='/sb' element = {<SideBar/>} ></Route>
      <Route path='/ad-d' element = {<AdminHomePage/>} ></Route>
      <Route path='/ad-p' element = {<AdminProducts/>} ></Route>
      <Route path='/tb-i' element = {<CustomTable/>} ></Route>
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path='/' element={<Login/>} ></Route>
      </Routes>
    )
  }
}
CustomRoutes.propTypes = {
  token: PropTypes.bool
}
export default CustomRoutes;
