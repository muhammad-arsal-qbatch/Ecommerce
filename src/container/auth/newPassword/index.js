import { Form } from 'react-bootstrap';

import CustomHeading from '../../../components/heading';
import CustomInput from '../../../components/inputField';
import CustomButton from '../../../components/button';

import '../login/login.css'

const NewPassword = () => {
  return (
    <div className="main-container-login">
<div className="group">
        <CustomHeading text="New Password" className="blue-heading"></CustomHeading>
        <div className="rectangle">
          <Form>
            <CustomInput
              className="input-style"
              placeholder="enter password"
              type="password"
              label="Enter new Password"
              emailText="Password must contain Capital, small letter, number and symbols"
            ></CustomInput>

            <CustomInput
              placeholder="confirm password"
              type="password"
              label="Confirm Password"
            ></CustomInput>

            <CustomButton className="btn-style" value="Reset Password" variant="primary" />

          </Form>
        </div>
      </div>

        </div>
  )
}
export default NewPassword;
