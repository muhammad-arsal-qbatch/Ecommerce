import { useSelector } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useEffect } from 'react';

import CartItems from '../../../components/cartItems';
import Bin from '../../../assets/images/delete-btn.svg';
import Checkbox from '../../../assets/images/Checkbox.svg';
import CustomButton from '../../../components/button';

import './cart.css'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigation = useNavigate();
  const goToCheckout = () => {
    navigation('/checkout');
  }
  const data = useSelector((state) => state.shoppingBag.cart);
  const loader = useSelector((state) => state.adminProduct.loader);
  useEffect(
    () => {
      console.log(data);
    }
    , []
  )

  return (
    <div className='cart-box-user'>
      <div className='left-cart-box'>
        <div className='heading-style'>
          <h4>Shopping Bag</h4>
        </div>
      <Container className='mb-2 ms-4' >
            <Row className=' items-select-text' >
                <Col sm="11">
                  <div className='items-select-check-box'>
                    <Image src={Checkbox}></Image>
                    <span>Select {data.length} items</span>

                  </div>

                </Col>
                <Col>
                <Image src={Bin}></Image>
                </Col>
            </Row>

        </Container>
        { loader === false
          ? <>
          {data.map((d, index) => (
            <CartItems key={index} data = {d}></CartItems>

          ))}
         </>
          : <>products are loading</>
            }

        </div>
        <div className='right-cart-box'>
          <h5>
            Order Summary
          </h5>
          <div className='order-summary'>
            <Container className='mt-3'>
              <Row className='mb-3'>
                <Col sm='9'>Sub Total: {data.length} items</Col>
                <Col><b>$00.00</b></Col>
              </Row>
              <Row className='mb-3'>
              <Col sm='9'>Tax:</Col>
              <Col><b>$00.00</b></Col>

              </Row>
              <Row className='mb-3'>
              <Col sm='9'>Total:</Col>
              <Col><b>$00.00</b></Col>

              </Row>
              <Row className='mb-3'>
              <Col>
              <CustomButton onClick={goToCheckout} variant='primary' value='Proceed to checkout' size='lg'></CustomButton>
              </Col>

              </Row>
            </Container>
          </div>
        </div>
        </ div>

  )
}

export default Cart;
