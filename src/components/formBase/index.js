import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import { useNavigate } from 'react-router-dom'

const FormBase = (props) => {
  const navigation = useNavigate();
  const {
    text = '',
    route = ''
  } = props

  return (
        <div>
            <p className='base-p' >
            {text} <a className='a-style' onClick={() => { navigation('/' + route) }} >{route}</a>
            </p>
        </div>

  )
}
FormBase.propTypes = {
  text: PropTypes.string,
  route: PropTypes.string
}
export default FormBase
