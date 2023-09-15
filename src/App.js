import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './layout'
import Login from './container/auth/login'
import ForgotPassword from './container/auth/forgotPassword';
import NewPassword from './container/auth/newPassword';
import AdminDashboard from './container/admin/adminDashboard';
import AdminProducts from './container/admin/adminProducts';
import UserHomepage from './container/user/userHomepage'
import CustomModal from './components/customModal';

import './App.css'
import { useEffect } from 'react';
import { login } from './redux/slices/auth';
import CustomCards from './components/customCards';
import AdminOrder from './container/admin/adminOrder';

function App () {
  const token = useSelector((state) => state.authentication.token);
  const isAdmin = useSelector((state) => state.authentication.isAdmin);
  const dispatch = useDispatch();

  useEffect( // when this component is loaded this use effect will be called, if i have saved token in local storage then it will get this token and give it to login so that i will directly rerender to home page
    () => {
      console.log('ssdfsdffs');
      dispatch(login({ field: 'token', value: localStorage.getItem('token') }));
      // dispatch(logoutAdmin());
    }, []
  )

  if (token) {
    return (
      <>
      {isAdmin
        ? <Layout>
       <Routes>
         {/*
         <Route path='/nv' element = {<CustomNavbar/>} ></Route>
         <Route path='/sb' element = {<SideBar/>} ></Route> */}
         <Route index element = {<AdminDashboard/>} ></Route>
         <Route path='/ad-p' element = {<AdminProducts/>} ></Route>
         <Route path='/ad-o' element = {<AdminOrder/>} ></Route>
         <Route path='/m' element = {<CustomModal/>} ></Route>
         <Route path='/c' element = {<CustomCards/>} ></Route>
         {/* <Route path='/tb-i' element = {<CustomTable/>} ></Route> */}
         </Routes>
       </Layout>
        : <Layout showSidebar = {false}>
        <Routes>

        <Route path='/' element= {<UserHomepage/>}> </Route>
        </Routes>

      </Layout>
      }

    </>

    )
  } else {
    return (
    <>
    <Routes>
       <Route index element = {<Login/>} ></Route>
      <Route path='/fg' element = {<ForgotPassword/>} ></Route>
      <Route path='/np' element = {<NewPassword/>} ></Route>
      </Routes>
      </>
    )
  }
}

export default App
