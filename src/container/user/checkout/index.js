/* eslint-disable no-unused-vars */
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CartItems from '../../../components/cartItems';
import CustomButton from '../../../components/button';
import './checkout.css'
import DeliveryOffcanvas from '../../../components/deliveryOffcanvas';
import CustomInput from '../../../components/inputField';
import { addDeliveryPerson } from '../../../redux/slices/user/checkout'

const AddPersonRows = (props) => {
  const { deliveryAddressData, setDeliveryAddressData } = props || {};

  const {
    fullName,
    mobileNo,
    country,
    province,
    city,
    address
  } = deliveryAddressData || {};

  const addPersonMappedRows = [
    // const deliveryPerson = useSelector((state)=>state.checkout)
    [{ field: 'fullName', state: fullName }],
    [{ field: 'mobileNo', state: mobileNo }, { field: 'country', state: country }],
    [{ field: 'province', state: province }, { field: 'city', state: city }],
    [{ field: 'address', state: address }]
  ];
  // const addPaymentMethodRows = [
  //   [{ field: 'cardNumber', state }]
  // ]

  console.log('ROWS');

  const handleUpdate = (e, col) => {
    console.log({ VAL: e.target.value });
    if (col.field === 'fullName') {
      setDeliveryAddressData({ ...deliveryAddressData, fullName: e.target.value });
    } else if (col.field === 'mobileNo') {
      setDeliveryAddressData({ ...deliveryAddressData, mobileNo: e.target.value });
    } else if (col.field === 'country') {
      setDeliveryAddressData({ ...deliveryAddressData, country: e.target.value });
    } else if (col.field === 'province') {
      setDeliveryAddressData({ ...deliveryAddressData, province: e.target.value });
    } else if (col.field === 'city') {
      setDeliveryAddressData({ ...deliveryAddressData, city: e.target.value });
    } else if (col.field === 'address') {
      setDeliveryAddressData({ ...deliveryAddressData, address: e.target.value });
    }
    console.log(deliveryAddressData);
  };

  return (
    addPersonMappedRows.map((row, index) => (
      <div key={index} className='row'>
        {row.map((col, index) => (
          <div key={index} className='col'>
          <CustomInput key={index} value={col.state} onChange={(e) => handleUpdate(e, col)} label={col.field} placeholder={col.field} ></CustomInput>
          </div>
        ))}
      </div>
    ))
  )
}

const deliveryAddressInitialState = {
  fullName: '',
  mobileNo: '',
  country: '',
  province: '',
  city: '',
  address: ''
}
const addPaymentMethodInitialState = {
  cardNumber: '',
  expiryDate: '',
  cvc: '',
  country: ''
}

const Checkout = () => {
  const data = useSelector((state) => state.shoppingBag.cart);
  const loader = useSelector((state) => state.adminProduct.loader);
  const [deliveryModal, showDeliveryModal] = useState(false);
  const [deliveryAddressData, setDeliveryAddressData] = useState(deliveryAddressInitialState);
  const isDeliveryAddress = useSelector((state) => state.checkout.isDeliveryPerson);

  const isPaymentMethod = useSelector((state) => state.checkout.isPaymentMethod);
  const originalDeliveryAddress = useSelector((state) => state.checkout.deliveryPerson);
  const dispatch = useDispatch();

  const displayDeliveryModal = () => {
    showDeliveryModal(true);
  }
  const hideDeliveryModal = () => {
    showDeliveryModal(false);
  }

  useEffect(
    () => {
      console.log(data);
    }
    , []
  )
  const saveThePerson = () => {
    dispatch(addDeliveryPerson(deliveryAddressData))
  }
  return (
  <div className='checkout-box container '>
  {deliveryModal
    ? <DeliveryOffcanvas
    handleFunc={saveThePerson}
    rows={<AddPersonRows deliveryAddressData={deliveryAddressData}
    setDeliveryAddressData={setDeliveryAddressData}
    />} show={deliveryModal} handleShow={hideDeliveryModal} />
    : <></>}
  <div className='row'>
    <div className='col-8'>
     <h4>Checkout</h4>
    <Container className='' >
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
    <div className='col-4'>
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

              </Row>
            </Container>
          </div>
          <h5>Select payment method</h5>
          <div className='container payment-box'>
            <div style={{ width: '100%', height: '100%' }} className='d-flex'>
                <div className='col-5 d-flex align-items-center'>
                  {isDeliveryAddress
                    ? <CustomButton value='+ Add New' className='btn btn-outline-primary'></CustomButton>
                    : <CustomButton active='true' value='+ Add New' className='btn btn-outline-primary'></CustomButton>

                  }
                </div>

            </div>
            <div className='row'>
              <div className='col-12'>
                {isPaymentMethod
                  ? <CustomButton size='lg' value='Place Order' className='btn btn-primary'></CustomButton>
                  : <CustomButton active='false' size='lg' value='Place Order' className='btn btn-primary'></CustomButton>

                }
              </div>
            </div>
          </div>

    </div>
  </div>
        </ div>)
}
export default Checkout;
