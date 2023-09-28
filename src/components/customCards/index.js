import { Image } from 'react-bootstrap';

import './customCards.css';

import PropTypes from 'prop-types'
const CustomCards = ({
  heading5,
  quantityStyle,
  cardsText,
  cardHeading,
  imageSrc
}) => {
  return (
        <div className='card-box'>
            <div className="heading-box">
                <Image className='cart-image' src={imageSrc}></Image>
                <h5 className= {heading5}>{cardHeading}</h5>

            </div>
            <div className='row-2'>

            {cardsText.map((singleRow, index) => {
              return (
                <>
                   <p key={index} className='col-1'>
                    {Object.keys(singleRow)[0]}
                    <span className={quantityStyle}>{singleRow[Object.keys(singleRow)[0]] }</span>
                   </p>
                   </>
              )
            })}

            </div>
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
