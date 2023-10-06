import { useState, useEffect } from 'react'

import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'

import CustomButton from '../../../components/button'
import CustomInput from '../../../components/inputField' // why {Myimport not working}
import CustomHeading from '../../../components/heading'
import FormBase from '../../../components/formBase'
import { clearCache, signupUser } from '../../../redux/slices/auth'
import { useNavigate } from 'react-router-dom'

import '../login/login.css';

const Signup = () => {
  useEffect(() => {
    dispatch(clearCache())
  }, [])
  const loading = useSelector((state) => state.authentication.isLoading);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const handleInput = () => {
    dispatch(signupUser({ name, email, password, mobileNo }));
    navigation('/');
  }
  return (
    <div className="main-container-login">
      <div className="group">
        <CustomHeading text="SignUp" className="blue-heading"></CustomHeading>
        <div className="rectangle">
          <Form>
            <CustomInput
              className="input-style"
              placeholder="full name"
              type="text"
              label="Full name"
              value = {name}
              onChange={(e) => setName(e.target.value)}

            >

            </CustomInput>

            <CustomInput
              placeholder="email address"
              type="email"
              label="Email Address"
              emailText="Enter valid email address"
              value= {email}
              onChange={(e) => setEmail(e.target.value)}
            ></CustomInput>
            <CustomInput
              placeholder="Please Enter your password"
              type="password"
              label="Password"
              value= {password}
              onChange={(e) => setPassword(e.target.value)}
            ></CustomInput>
            <CustomInput
              placeholder="mobile number"
              type="text"
              label="Mobile"
              value= {mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            ></CustomInput>

            <div className="check-box">
              <Form.Group>
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
            </div>

            <CustomButton onClick= {handleInput} className="btn-style" value= {(loading) ? 'LOADING' : 'Signup'} variant="primary" />

            <div className="form-base">
              <div className="form-base-2">
                <FormBase text="Already have an account!" route="login" />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Signup
