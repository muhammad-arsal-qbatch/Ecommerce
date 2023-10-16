import { Image } from 'react-bootstrap';

import './customCards.css';

import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
const CustomCards = ({
  heading5,
  quantityStyle,
  cardsText,
  cardHeading,
  imageSrc
}) => {
  const statsError = useSelector((state) => state.orders.statsError);
  return (
        <div className='card-box'>
            <div className="heading-box">
                <Image className='cart-image' src={imageSrc}></Image>
                <h5 className= {heading5}>{cardHeading}</h5>
                </div>
                {statsError !== ''
                  ? <>{statsError}</>
                  : <div className='container'>

                  <div className='row-2'>
                  <div className='col'>Total Orders: {cardsText.totalOrders || 0}</div>
             <div className='col'>Total Orders: {cardsText.totalOrders || 0}</div>
            </div>
            <div className='row'>
            <div className='col'>Total Units: {cardsText.totalQuantity || 0}</div>
             <div className='col'>Total Sales:$ {cardsText.totalAmount || 0}</div>
            </div>
            </div>
              }
        </div>

  )
}
CustomCards.propTypes = {
  heading5: PropTypes.string,
  quantityStyle: PropTypes.string,
  cardHeading: PropTypes.string,
  cardsText: PropTypes.object,
  imageSrc: PropTypes.object

}
export default CustomCards;
