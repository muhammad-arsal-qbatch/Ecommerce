import React from 'react'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'

import './style.css'

const CustomInput = (props) => {
  const {
    label = '',
    type = 'text',
    placeholder = 'enter name',
    emailText = '',
    onChange
  } = props
  return (
    <Form.Group className='mb-4' >
        <Form.Label htmlFor="inputPassword5">{label}</Form.Label>
      <Form.Control
        type={type}
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        placeholder= {placeholder}
        onChange={onChange}
      />
      <Form.Text>{emailText}</Form.Text>
      </Form.Group>
  )
}
CustomInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  emailText: PropTypes.string,
  onChange: PropTypes.func
  // className: PropTypes.string
}

export default CustomInput
