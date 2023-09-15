import { Form } from 'react-bootstrap'

import CustomHeading from '../../../components/heading'
import CustomInput from '../../../components/inputField'
import CustomButton from '../../../components/button'
import FormBase from '../../../components/formBase'

import './forgotPassword.css'

const ForgotPassword = () => {
  return (

        <div className='main-container-forgot'>
        <div className='group'>
        <CustomHeading text="Forgot Password" className='blue-heading' ></CustomHeading>
        <div className='rectangle'>
            <Form>
            <CustomInput
            className='input-style'
            label='Enter Email Address'
            type='email'
            placeholder='please enter your email'
            emailText='Enter a valid email address' />
            <CustomButton className='btn-style' value='Forgot Password'
            variant='primary'
             />
            <div className='form-base'>
          <div className='form-base-2'>
            <FormBase text='No, I remember my password' route= 'Login' />
            </div>
            </div>
            </Form>
            </div>

        </div>
        </div>
  )
}
export default ForgotPassword
