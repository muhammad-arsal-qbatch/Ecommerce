import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'

import CustomButton from '../../../components/button'
import CustomInput from '../../../components/inputField' // why {Myimport not working}
import CustomHeading from '../../../components/heading'
import FormBase from '../../../components/formBase'
import { loginUser } from '../../../redux/slices/auth'

import './login.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const loading = useSelector((state) => state.authentication.isLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); 
  const navigation = useNavigate();
  const handleInput = () => {
    dispatch(loginUser({ username: email, password }));
    navigation('/');
  }
  return (
    <div className="main-container-login">
      <div className="group">
        <CustomHeading text="Login" className="blue-heading"></CustomHeading>
        <div className="rectangle">
          <Form>
            <CustomInput
              className="input-style"
              placeholder="Please enter your name"
              type="email"
              label="Enter Email adress"
              emailText="Enter a valid email address"
              value = {email}
              onChange={(e) => setEmail(e.target.value)}

            ></CustomInput>

            <CustomInput
              placeholder="Please Enter your password"
              type="password"
              label="Password"
              value= {password}
              onChange={(e) => setPassword(e.target.value)}
            ></CustomInput>
            <div className="check-box">
              <Form.Group>
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
            </div>

            <CustomButton onClick= {handleInput} className="btn-style" value= {(loading) ? 'LOADING' : 'LOGIN'} variant="primary" />

            <div className="form-base">
              <div className="form-base-2">
                <FormBase text="Forgot password" route="Reset" />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
