import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';

import CustomButton from '../../../components/button';
import CustomInput from '../../../components/input-field';
import CustomHeading from '../../../components/heading';
import FormBase from '../../../components/form-base';
import { ClearCache, LoginUser } from '../../../redux/slices/auth';

import './login.css';

const Login = () => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const loading = useSelector((state) => state.authentication.isLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(ClearCache());
  }, [dispatch]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInput = () => {
    if (isValidEmail) {
      dispatch(LoginUser({ email, password }));
      navigation('/');
    } else {
      console.error('Invalid email address');
    }
  };

  return (
    <div className="main-container-login">
      <div className="group">
        <CustomHeading text="Login" className="blue-heading"></CustomHeading>
        <div className="rectangle">
          <Form>
            <CustomInput
              className={`input-style ${!isValidEmail ? 'error' : ''}`}
              placeholder="Please enter your email"
              type="email"
              label="Enter Email address"
              emailText=""
              value={email}
              onChange={(e) => {
                const enteredEmail = e.target.value;
                setEmail(enteredEmail);
                setIsValidEmail(validateEmail(enteredEmail));
              }}
            />

            {isValidEmail
              ? null
              : (
              <div className="error-message">Please enter a valid email address</div>
                )}

            <CustomInput
              placeholder="Please enter your password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <CustomButton
              onClick={handleInput}
              className="btn-style"
              value={loading ? 'LOADING' : 'LOGIN'}
              variant="primary"
            />

            <div className="form-base">
              <div className="form-base-2">
                <FormBase text="Forgot password" route="forgotPassword" />
                <FormBase text="I don't have an account" route="signup" />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
