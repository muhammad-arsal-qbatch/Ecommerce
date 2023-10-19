import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { Form } from 'react-bootstrap';

import { ResetPassword, ClearError } from '../../../redux/slices/auth';

import CustomHeading from '../../../components/heading';
import CustomInput from '../../../components/input-field';
import CustomButton from '../../../components/button';

import './newPassword.css';

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const loading = useSelector((state) => state.authentication.isLoading);
  const emailSentStatus = useSelector(
    (state) => state.authentication.emailSentStatus
  );

  const handleInput = () => {
    if (newPassword !== confirmPassword) {
      alert('Password not match');
    } else {
      const query = new URLSearchParams(window.location.search);
      const token = query.get('token');
      const body = {
        token,
        newPassword
      };
      dispatch(ResetPassword(body));
    }
  };

  if (emailSentStatus) {
    alert('password reset successful');
    dispatch(ClearError());
    navigation('/login');
  }

  return (
    <div className="main-container-np">
      <div className="group-np">
        <CustomHeading
          text="New Password"
          className="blue-heading"
        ></CustomHeading>
        <div className="rectangle-np">
          <Form>
            <CustomInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-style"
              placeholder="Enter New Password"
              type="password"
              label="Enter New Password"
              emailText=""
            ></CustomInput>
            <CustomInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-style"
              placeholder="Confirm Password"
              type="password"
              label="Confirm Password"
              emailText=""
            ></CustomInput>

            <CustomButton
              onClick={handleInput}
              type="button"
              className="btn-style"
              value={loading ? 'Loading' : 'Reset Password'}
              variant="primary"
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
