import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ColorsBox from '../colorsBox';
import CustomInput from '../inputField';
import CustomButton from '../button';
import CustomTooltip from '../../components/tooltip';
import { addToCart } from '../../redux/slices/user/shoppingBag';

import './userDetailedCards.css'
import { useState } from 'react';

const UserDetailedCards = ({
  singleCard
}) => {
  console.log({ singleCard });
  // const colors = ['#155724', '#AAA', '#1B1E21', '#231579', '#740F0F'];
  // const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCarts = (singleCard) => {
    console.log('add to cart is called', singleCard);
    const updatedCard = { ...singleCard };
    updatedCard.quantity = selectedQuantity;
    dispatch(addToCart(updatedCard));
    navigate('/c')

    // cart.push(singleCard);
  }
  const [selectedQuantity, setSelectedQuantity] = useState(singleCard.quantity);
  // useEffect(
  //   () => {
  //     console.log('single card is, ', singleCard);
  //     setSelectedQuantity(singleCard.quantity)
  //   }, []
  // )

  return (
        <>
        <div className="user-detailed-card-body">
            <div className='card-head'>
                <Image src= {singleCard.thumbnail} className='card-image'></Image>
                <div className='head-right'>
                <div className='card-description'>
                  <CustomTooltip text={singleCard.productName}>
                  </CustomTooltip>
                  </div>
                <ColorsBox colors={singleCard.color} text='Color'></ColorsBox>
                <ColorsBox colors={singleCard.size} text='Sizes'></ColorsBox>
                <div className='price-box'>
                <span className='price-heading'> Price</span>
                <h4 className='price-text'>

                    ${singleCard.price}
                </h4>
                </div>
                </div>
            </div>
            <div className='card-images-row'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M8.96158 12.0005L14.6154 17.6543L15.4308 16.8389L10.5769 12.0005L15.4154 7.16202L14.6 6.34665L8.96158 12.0005Z" fill="black"/>
</svg>
                {singleCard.images.map((s, index) => (
                    <div key={index} className='image-box-user-detailed-cards'>
                    <Image key={index} className='small-images' src={s}></Image>
                    </div>

                )) }
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M15.0384 12.0005L9.38465 17.6543L8.56927 16.8389L13.4231 12.0005L8.58465 7.16202L9.40002 6.34665L15.0384 12.0005Z" fill="black"/>
</svg>

            </div>
            <div className='bottom'>
                <span className='line'></span>
                <div className='quantity-box'>
                    <span className='price-heading'>Quantity</span>
                    <div className='container'>
                      <div className='row d-flex align-items-center'>
                {/* <div onClick= { () => setSelectedQuantity(selectedQuantity + 1)} className='col-1 btn  btn-secondary '>+</div> */}
                <div onClick= { selectedQuantity < singleCard.quantity ? () => { setSelectedQuantity(selectedQuantity + 1) } : () => { }} className='col-1 btn  btn-secondary '>+</div>
                <div className='col-7'>
                <CustomInput
                readOnly = {true}
                    value={selectedQuantity}
                    placeholder='02'></CustomInput>
                </div>
                {/* <div onClick= {() => setSelectedQuantity(selectedQuantity - 1)} className=' col-1 btn btn-secondary'>-</div> */}
                <div onClick= { selectedQuantity > 1 ? () => { setSelectedQuantity(selectedQuantity - 1) } : () => { }} className=' col-1 btn btn-secondary'>-</div>
                </div>
                </div>
                </div>
                {singleCard.quantity < 1
                  ? <CustomButton disabled= {true} onClick= { () => { addToCarts(singleCard) } } value='Add to Cart' variant='primary' size='lg'></CustomButton>
                  : <CustomButton onClick= { () => { addToCarts(singleCard) } } value='Add to Cart' variant='primary' size='lg'></CustomButton>

                }
            </div>
        </div>
        </>

  )
}

UserDetailedCards.propTypes = {
  singleCard: PropTypes.object

}

export default UserDetailedCards;
