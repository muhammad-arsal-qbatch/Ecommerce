import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
function CustomHeading (props) {
  const {
    text = '',
    className

  } = props
  return <h2 className={ className } >{text}</h2>
}
CustomHeading.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
}
export default CustomHeading
