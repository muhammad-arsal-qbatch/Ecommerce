import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CartItems from '../../../components/cartItems';
import CustomButton from '../../../components/button';
import DeliveryOffcanvas from '../../../components/deliveryOffcanvas';
import CustomInput from '../../../components/inputField';
import { addDeliveryPerson, addPaymentMethod } from '../../../redux/slices/user/checkout'

import './checkout.css'

const AddPersonRows = (props) => {
  const { deliveryAddressData, setDeliveryAddressData } = props || {};
  const { addPersonMappedRows } = props;
  console.log(addPersonMappedRows);

  console.log('ROWS');

  const handleUpdate = (e, col) => {
    console.log({ VAL: col.field });
    setDeliveryAddressData({ ...deliveryAddressData, [`${col.field}`]: e.target.value });
    console.log(deliveryAddressData);
  };

  return (
    addPersonMappedRows.map((row, index) => (
      <div key={index} className='row'>
        {row.map((col, index) => (
          <div key={index} className='col'>
          <CustomInput key={index} defaultValue={col.state} onChange={(e) => handleUpdate(e, col)} label={col.field} placeholder={col.field} ></CustomInput>
          </div>
        ))}
      </div>
    ))
  )
}

const Checkout = () => {
  const deliveryAddressInitialState = {
    fullName: '',
    mobileNo: '',
    country: '',
    province: '',
    city: '',
    address: ''
  }
  const paymentInitialState = {
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    country: ''
  }
  const [deliveryAddressData, setDeliveryAddressData] = useState(deliveryAddressInitialState);
  const [paymentData, setPaymentData] = useState(paymentInitialState);
  const data = useSelector((state) => state.shoppingBag.cart);
  const loader = useSelector((state) => state.adminProduct.loader);
  const [deliveryModal, showDeliveryModal] = useState(false);
  const [paymentModal, showPaymentModal] = useState(false);
  const isDeliveryAddress = useSelector((state) => state.checkout.isDeliveryPerson);
  const isPaymentMethod = useSelector((state) => state.checkout.isPaymentMethod);
  const originalDeliveryAddress = useSelector((state) => state.checkout.deliveryPerson);
  const originalPaymentMethod = useSelector((state) => state.checkout.paymentMethod);
  const dispatch = useDispatch();

  const addPersonMappedRows = [
    [{ field: 'fullName', state: deliveryAddressData.fullName }],
    [{ field: 'mobileNo', state: deliveryAddressInitialState.mobileNo }, { field: 'country', state: deliveryAddressInitialState.country }],
    [{ field: 'province', state: deliveryAddressInitialState.province }, { field: 'city', state: deliveryAddressInitialState.city }],
    [{ field: 'address', state: deliveryAddressInitialState.address }]
  ];
  const addPaymentMappedRows = [
    [{ field: 'cardNumber', state: paymentData.cardNumber }],
    [{ field: 'expiryDate', state: paymentData.expiryDate }],
    [{ field: 'cvc', state: paymentData.cvc }],
    [{ field: 'country', state: paymentData.country }]
  ];

  const displayDeliveryModal = () => {
    showDeliveryModal(true);
  }
  const hideDeliveryModal = () => {
    showDeliveryModal(false);
  }
  const displayPaymentModal = () => {
    showPaymentModal(true);
  }
  const hidePaymentModal = () => {
    showPaymentModal(false);
  }

  useEffect(
    () => {
      console.log(data);
    }
    , []
  )
  const saveThePerson = () => {
    dispatch(addDeliveryPerson(deliveryAddressData))
    hideDeliveryModal();
  }
  const saveThePaymentMethod = () => {
    dispatch(addPaymentMethod(paymentData))
    hidePaymentModal();
  }
  return (
     <div className='checkout-box container '>
    {paymentModal
      ? <DeliveryOffcanvas
    handleFunc={saveThePaymentMethod}
    rows={<AddPersonRows addPersonMappedRows={addPaymentMappedRows}
     deliveryAddressData={paymentData}
    setDeliveryAddressData={setPaymentData}
    />} show={paymentModal} handleShow={hidePaymentModal} />
      : <></>}
  {deliveryModal
    ? <DeliveryOffcanvas
    handleFunc={saveThePerson}
    rows={<AddPersonRows addPersonMappedRows={addPersonMappedRows}
     deliveryAddressData={deliveryAddressData}
    setDeliveryAddressData={setDeliveryAddressData}
    />} show={deliveryModal} handleShow={hideDeliveryModal} />
    : <></>}
  <div className='row'>
    <div className='mt-3 col-8'>
    <div className='heading-style'>
          <h4>Checkout</h4>
        </div>    <Container className='' >
            <Row className='' >
            <div className=' p-1 delivery-address-box mb-2 col-12'>
                  <div className=''>
                    {isDeliveryAddress
                      ? <div className='container'>
                        <div className='row'>
                          <div className='col-10'>
                            <p>Deliver to <b>{originalDeliveryAddress.fullName}</b></p>
                          </div>
                          <div className='col-2'>
                            <CustomButton size='sm' value='Change' className='btn btn-outline-primary' ></CustomButton>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-12'>
                            <p>mobileNo: {originalDeliveryAddress.mobileNo}</p>
                          </div>
                        </div>
                        <div className='row'>
                        <div className='col-12'>
                            <p>Address: {originalDeliveryAddress.address}</p>
                          </div>
                        </div>
                         </div>
                      : <CustomButton onClick={displayDeliveryModal} variant='primary' value='Add deivery address'></CustomButton>

                  }
                  </div>

                </div>
                </Row>
                <Row>
                { loader === false
                  ? <>
          {data.map((d, index) => (
            <CartItems key={index} data = {d}></CartItems>

          ))}
         </>
                  : <>products are loading</>
            }            </Row>

        </Container>
</div>
    <div className='mt-5 col-4'>
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

              </Row>
            </Container>
          </div>
          <h5>Select payment method</h5>
          <div className=' d-flex align-items-center payment-box container'>
                  {isPaymentMethod
                    ? <div className='container'>
                      <div className='row'>
                        <div className='col-10'>
                        <div className=' m-2 payment-card container'>
                          <div className='row m-2'>
                            <div className='col-3'><svg xmlns="http://www.w3.org/2000/svg" width="51" height="34" viewBox="0 0 51 34" fill="none">
  <path d="M46.75 0H4.25C1.90279 0 0 1.90279 0 4.25V29.75C0 32.0972 1.90279 34 4.25 34H46.75C49.0972 34 51 32.0972 51 29.75V4.25C51 1.90279 49.0972 0 46.75 0Z" fill="#252525"/>
  <path d="M19.125 27.625C24.993 27.625 29.75 22.868 29.75 17C29.75 11.132 24.993 6.375 19.125 6.375C13.257 6.375 8.5 11.132 8.5 17C8.5 22.868 13.257 27.625 19.125 27.625Z" fill="#EB001B"/>
  <path d="M31.875 27.625C37.743 27.625 42.5 22.868 42.5 17C42.5 11.132 37.743 6.375 31.875 6.375C26.007 6.375 21.25 11.132 21.25 17C21.25 22.868 26.007 27.625 31.875 27.625Z" fill="#F79E1B"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M25.5 8.49902C28.0807 10.4375 29.75 13.5237 29.75 16.9998C29.75 20.4759 28.0807 23.5621 25.5 25.5006C22.9193 23.5621 21.25 20.4759 21.25 16.9998C21.25 13.5237 22.9193 10.4375 25.5 8.49902Z" fill="#FF5F00"/>
</svg></div>
                            <div className='col-9'>Master Card</div>
                          </div>
                          <div className='row m-2'>
                            <div className='col'>{originalPaymentMethod.cardNumber}</div>
                          </div>
                          <div className='row m-2'>
                            <div className='col'>{originalPaymentMethod.expiryDate}</div>
                          </div>
                          <div className='row m-2'>
                            <div className='col'>{originalDeliveryAddress.fullName}</div>
                          </div>
                        </div>
                        </div>

                      <div className='col-2'></div>
                      </div>

                  </div>
                    : isDeliveryAddress
                      ? <CustomButton onClick={displayPaymentModal} value='+ Add New' className='btn btn-outline-primary'></CustomButton>
                      : <CustomButton disabled={true} value='+ Add New' className='btn btn-outline-secondary'></CustomButton>

                }

          </div>
          <div className=' mt-2 container'>
            <div className=' row'>
          {isPaymentMethod
            ? <CustomButton disabled={false} value='Pay Now' className='btn btn-primary' ></CustomButton>
            : <CustomButton disabled={true} value='Place order' className='btn btn-secondary' ></CustomButton>

          }
          </div>
          </div>
    </div>
  </div>
        </ div>
  )
}
export default Checkout;
