import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
const FormBase = (props) => {
  const {
    text = '',
    route = ''
  } = props

  return (
        <div>
            <p className='base-p' >
            {text} <a className='a-style' href='#'>{route}</a>
            </p>
        </div>

  )
}
FormBase.propTypes = {
  text: PropTypes.string,
  route: PropTypes.string
}
export default FormBase
