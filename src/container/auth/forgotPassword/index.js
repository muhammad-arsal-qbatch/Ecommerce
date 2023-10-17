import { Form } from 'react-bootstrap';
import CustomHeading from '../../../components/heading';
import CustomInput from '../../../components/inputField';
import CustomButton from '../../../components/button';
import FormBase from '../../../components/formBase';
import { UserForgotPassword, clearError } from '../../../redux/slices/auth';
import './forgotPassword.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorModal from '../../../components/errorModal';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const error = useSelector((state) => state.authentication.error);
  const loading = useSelector((state) => state.authentication.isLoading);
  const forgotPasswordStatus = useSelector((state) => state.authentication.passwordResetStatus);

  useEffect(() => {
    console.log('useEffect in ForgotPassword component');
  }, []);

  const handleBtn = (e) => {
    e.preventDefault()
    console.log('handle btn is clicked');
    console.log({ email });
    dispatch(UserForgotPassword({ email }));
  };
  if (forgotPasswordStatus === true) {
    alert('an email has been sent to you for verification');
    dispatch(clearError());

    navigation('/login');
  }

  return (
    <div className='main-container-forgot'>
    {error ? <ErrorModal clearError={clearError} error={error} /> : <></>}
      <div className='group'>
        <CustomHeading text='Forgot Password' className='blue-heading' />
        <div className='rectangle'>
          <Form>
            <CustomInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='input-style'
              label='Enter Email Address'
              type='email'
              placeholder='please enter your email'
              emailText='Enter a valid email address'
            />
            <CustomButton
              onClick={handleBtn}
              className='btn-style'
              value= {loading ? 'Loading' : 'Forgot Password'}
              variant='primary'
            />
            <div className='form-base'>
              <div className='form-base-2'>
                <FormBase text='No, I remember my password' route='Login' />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
