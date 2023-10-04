import { useSelector } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useEffect } from 'react';

import CartItems from '../../../components/cartItems';
import Bin from '../../../assets/images/delete-btn.svg';
import Checkbox from '../../../assets/images/Checkbox.svg';
import CustomButton from '../../../components/button';

import { useNavigate } from 'react-router-dom';

import './cart.css'

const Cart = () => {
  const navigation = useNavigate();
  const goToCheckout = () => {
    navigation('/checkout');
  }
  const goToHomepage = () => {
    navigation('/');
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
    <div className=' container cart-box-user'>
      {
        data.length !== 0
          ? <div className='row'>
      <div className=' mt-3 col-8 left-cart-box'>
        <div className='heading-style'>
          <h4>Shopping Bag</h4>
        </div>
      <Container className='mb-2' >
            <Row className=' items-select-text' >
                <div className='col-8'>
                  <div className='items-select-check-box'>
                    <Image src={Checkbox}></Image>
                    <span>Select {data.length} items</span>

                  </div>

                </div>
                <div className='d-flex justify-content-end pe-5 col-4'>
                <Image src={Bin}></Image>
                </div>
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
        <div className=' mt-5 col-4 right-cart-box'>
          <h5>
            Order Summary
          </h5>
          <div className='mt-3 order-summary'>
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
              <CustomButton onClick={goToCheckout} variant='primary' value='Proceed to checkout' size='lg'></CustomButton>
              </Row>
            </Container>
          </div>
        </div>
        </div>
          : <div style={{ height: '50%' }} className=' d-flex flex-column justify-content-center align-items-center'>
            <h5>Your shopping basket is empty</h5>
            <CustomButton onClick={goToHomepage} className='btn btn-primary' value='Add Product' ></CustomButton>

            </div>

      }
        </ div>

  )
}

export default Cart;
