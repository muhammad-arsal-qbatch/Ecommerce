import { Form } from 'react-bootstrap';

import CustomHeading from '../../../components/heading';
import CustomInput from '../../../components/inputField';
import CustomButton from '../../../components/button';

import '../login/login.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResetPassword, clearError } from '../../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const loading = useSelector((state) => state.authentication.isLoading);
  const emailSentStatus = useSelector((state) => state.authentication.emailSentStatus);

  const handleInput = () => {
    if (newPassword !== confirmPassword) {
      alert('Password not match');
    } else {
      const query = new URLSearchParams(window.location.search);
      const token = query.get('token');
      const body = {
        token,
        newPassword
      }
      console.log('token is, ', token);
      dispatch(ResetPassword(body));
    }
  }
  if (emailSentStatus) {
    alert('password reset successful');
    dispatch(clearError());
    navigation('/login')
  }
  return (
    <div className="main-container-login">
<div className="group">
        <CustomHeading text="New Password" className="blue-heading"></CustomHeading>
        <div className="rectangle">
          <Form>
            <CustomInput
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input-style"
              placeholder="enter password"
              type="password"
              label="Enter new Password"
              emailText="Password must contain Capital, small letter, number and symbols"
            ></CustomInput>
            <CustomInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-style"
              placeholder="enter password"
              type="password"
              label="Confirm Password"
              emailText="Password must contain Capital, small letter, number and symbols"
            ></CustomInput>

            <CustomButton
            onClick={handleInput}
            type= 'button'
            className="btn-style"
            value= {loading ? 'Loading' : 'Reset Password'}
            variant="primary" />

          </Form>
        </div>
      </div>

        </div>
  )
}
export default NewPassword;
