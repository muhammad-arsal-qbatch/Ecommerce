import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';

import CustomButton from '../../../components/button';
import CustomInput from '../../../components/inputField';
import CustomHeading from '../../../components/heading';
import FormBase from '../../../components/formBase';
import { clearCache, loginUser } from '../../../redux/slices/auth';

import './login.css';

const Login = () => {
  useEffect(() => {
    dispatch(clearCache());
  }, []);
  const loading = useSelector((state) => state.authentication.isLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const handleInput = () => {
    dispatch(loginUser({ email, password }));
    navigation('/');
  };
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></CustomInput>

            <CustomInput
              placeholder="Please Enter your password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></CustomInput>
            <div className="check-box">
              <Form.Group>
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
            </div>

            <CustomButton
              onClick={handleInput}
              className="btn-style"
              value={loading ? 'LOADING' : 'LOGIN'}
              variant="primary"
            />

            <div className="form-base">
              <div className="form-base-2">
                <FormBase text="Forgot password" route="reset" />
                <FormBase text="I dont have an account" route="signup" />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
