import CustomInput from '../inputField';
import PropTypes from 'prop-types';

import './incDecBtns.css';

const IncDecBtns = ({ quantity }) => {
  return (
    <div className='quantity-btns'>
                <div className='quantity-btn'>+</div>
                <CustomInput placeholder={quantity}></CustomInput>
                <div className='quantity-btn'>-</div>
                </div>
  )
}
IncDecBtns.propTypes = {
  quantity: PropTypes.string
}
export default IncDecBtns;
