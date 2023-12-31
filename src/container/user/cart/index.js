import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col, Image } from 'react-bootstrap';

import CartItems from '../../../components/cart-items';
import LeftArrow from '../../../assets/images/Arrow-left.svg';
import CustomButton from '../../../components/button';

import './cart.css';

const Cart = () => {
  const navigation = useNavigate();
  const goToHomepage = () => {
    navigation('/');
  };

  const data = useSelector((state) => state.shoppingBag.cart);
  const [selectedItems, setSelectedItems] = useState(data);
  const [totalQuantity, setTotalQuantity] = useState(0);
  console.log('now data is    ', data);

  useEffect(() => {
    const newSelectedItems = data.filter(item => item.selected);
    const total = newSelectedItems.reduce((accumulator, singleItem) => accumulator + (singleItem.quantity * singleItem.price), 0);
    setTotalQuantity(total)
    setSelectedItems(newSelectedItems)
  }, [data]);

  const goToCheckout = () => {
    const shouldGoToCheckout = data.every((item) => item.selected === false);

    if (shouldGoToCheckout) {
      alert('please add something to cart first');
    } else {
      navigation('/user/checkout');
    }
  };

  return (
    <div className=" container cart-box-user">
      {data.length !== 0
        ? (
        <div className="row">
          <div className=" mt-3 col-8 left-cart-box">
            <div className="heading-style">
              <h4>
                <Image
                  style={{ cursor: 'pointer !important' }}
                  onClick={() => {
                    navigation('/');
                  }}
                  src={LeftArrow}
                ></Image>
                Shopping Bag
              </h4>
            </div>
                {data.map((d, index) => (
                  <CartItems
                    showCheckBox={true}
                    key={index}
                    data={d}
                  ></CartItems>
                ))}
          </div>
          <div className=" mt-5 col-4 right-cart-box">
            <h5>Order Summary</h5>
            <div className="mt-3 order-summary">
              <Container className="mt-3">
                <Row className="mb-3">
                  <Col sm="9">Sub Total: {selectedItems.length} items</Col>
                  <Col>
                    <b>${totalQuantity}</b>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm="9">Tax:</Col>
                  <Col>
                    <b>$00.00</b>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm="9">Total:</Col>
                  <Col>
                    <b>${totalQuantity}</b>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <div className="container ">
                    <div className="row ps-5 pe-5">
                      <CustomButton
                        onClick={goToCheckout}
                        variant="primary"
                        value="Proceed to checkout"
                        size="lg"
                      ></CustomButton>
                    </div>
                  </div>
                </Row>
              </Container>
            </div>
          </div>
        </div>
          )
        : (
        <div
          style={{ height: '50%' }}
          className=" d-flex flex-column justify-content-center align-items-center"
        >
          <h5>Your shopping basket is empty</h5>
          <CustomButton
            onClick={goToHomepage}
            className="btn btn-primary"
            value="Add Product"
          ></CustomButton>
        </div>
          )}
    </div>
  );
};

export default Cart;
