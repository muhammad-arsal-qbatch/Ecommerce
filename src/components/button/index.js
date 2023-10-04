import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import './style.css'
const CustomButton = (props) => {
  const {
    variant = '',
    value = 'singup',
    size = 'lg',
    className = '',
    onClick = null,
    active = false,
    disabled = false
  } = props

  return (
    <Button onClick={onClick}
    className={className}
      variant= {variant}
      active={active}
      disabled={disabled}
      size= {size}>
    {value}
    </Button>
  )
}
CustomButton.propTypes = {
  value: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool
}
export default CustomButton
