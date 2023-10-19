import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearCache, signupUser } from '../../../redux/slices/auth';

import Form from 'react-bootstrap/Form';

import CustomButton from '../../../components/button';
import CustomInput from '../../../components/input-field';
import CustomHeading from '../../../components/heading';
import FormBase from '../../../components/form-base';

import '../login/login.css';
import './signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidMobile, setIsValidMobile] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(clearCache());
  }, [dispatch]);

  const loading = useSelector((state) => state.authentication.isLoading);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateMobileNumber = (mobileNo) => {
    const regex = /^\d+$/;
    return regex.test(mobileNo);
  };

  const handleInput = () => {
    const isEmailValid = validateEmail(email);
    const isMobileValid = validateMobileNumber(mobileNo);

    setIsValidEmail(isEmailValid);
    setIsValidMobile(isMobileValid);

    if (isEmailValid && isMobileValid) {
      dispatch(
        signupUser({
          name,
          email,
          password,
          mobileNo
        })
      );
      navigation('/');
    } else {
      console.error('Invalid input. Please check the email and mobile number.');
    }
  };

  return (
    <div className="main-container-signup">
      <div className="group-rectangle">
        <CustomHeading text="SignUp" className="blue-heading"></CustomHeading>
        <div className="rectangle-signup">
          <Form>
            <CustomInput
              className="input-style"
              placeholder="Full Name"
              type="text"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></CustomInput>

            <CustomInput
              placeholder="Email Address"
              type="email"
              label="Email Address"
              emailText=""
              value={email}
              onChange={(e) => {
                const enteredEmail = e.target.value;
                setEmail(enteredEmail);
                setIsValidEmail(validateEmail(enteredEmail));
              }}
            ></CustomInput>
            {!isValidEmail
              ? (
              <div className="error-message">Please enter a valid email address</div>
                )
              : null}

            <CustomInput
              placeholder="Password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></CustomInput>

            <CustomInput
              placeholder="Mobile Number"
              type="text"
              label="Mobile"
              value={mobileNo}
              onChange={(e) => {
                const enteredMobileNo = e.target.value;
                setMobileNo(enteredMobileNo);
                setIsValidMobile(validateMobileNumber(enteredMobileNo));
              }}
            ></CustomInput>
            {!isValidMobile
              ? (
              <div className="error-message">Mobile number must be in Digits</div>
                )
              : null}

            <CustomButton
              onClick={handleInput}
              className="btn-style"
              value={loading ? 'LOADING' : 'Signup'}
              variant="primary"
            />

            <div className="form-base">
              <div className="form-base-2">
                <FormBase text="Already have an account!" route="login" />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
