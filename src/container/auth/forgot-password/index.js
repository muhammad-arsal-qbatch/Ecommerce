import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { UserForgotPassword, clearError } from '../../../redux/slices/auth';

import { Form } from 'react-bootstrap';

import CustomHeading from '../../../components/heading';
import CustomInput from '../../../components/inputField';
import CustomButton from '../../../components/button';
import FormBase from '../../../components/formBase';
import ErrorModal from '../../../components/errorModal';

import './forgotPassword.css';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const error = useSelector((state) => state.authentication.error);
  const loading = useSelector((state) => state.authentication.isLoading);
  const forgotPasswordStatus = useSelector(
    (state) => state.authentication.passwordResetStatus
  );

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleBtn = (e) => {
    e.preventDefault();

    if (isValidEmail) {
      dispatch(UserForgotPassword({ email }));
    } else {
      console.error('Invalid email address');
    }
  };

  if (forgotPasswordStatus === true) {
    alert('An email has been sent to you for verification');
    dispatch(clearError());
    navigation('/login');
  }

  return (
    <div className="main-container-forgot">
      {error ? <ErrorModal clearError={clearError} error={error} /> : <></>}
      <div className="group-fg">
        <CustomHeading text="Forgot Password" className="blue-heading" />
        <div className="rectangle-fg">
          <Form>
            <CustomInput
              value={email}
              onChange={(e) => {
                const enteredEmail = e.target.value;
                setEmail(enteredEmail);
                setIsValidEmail(validateEmail(enteredEmail));
              }}
              className={`input-style ${!isValidEmail ? 'error' : ''}`}
              label="Enter Email Address"
              type="email"
              placeholder="Please enter your email"
              emailText=""
            />
            {isValidEmail
              ? null
              : (
              <div className="error-message">Please enter a valid email address</div>
                )}

            <CustomButton
              onClick={handleBtn}
              className="btn-style"
              value={loading ? 'Loading' : 'Forgot Password'}
              variant="primary"
            />
            <div className="form-base">
              <div className="form-base-2">
                <FormBase text="No, I remember my password" route="Login" />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
