import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col, Image } from 'react-bootstrap';

import {
  AddDeliveryAddress,
  AddPaymentMethod,
  GetDeliveryAddress,
  PlaceOrder
} from '../../../redux/slices/user/checkout';

import CartItems from '../../../components/cartItems';
import PaymentCard from '../../../components/payment-card';
import CustomButton from '../../../components/button';
import DeliveryOffcanvas from '../../../components/delivery-offcanvas';
import UpdatePaymentOffcanvas from '../../../components/update-payment-offcavas';
import CustomInput from '../../../components/input-field';
import LeftArrow from '../../../assets/images/Arrow-left.svg';
import ChangeAddressOffcanvas from '../../../components/change-address-offcanvas';
import PaymentEdit from '../../../assets/images/payment-edit.svg';

import './checkout.css';

const AddPersonRows = (props) => {
  const { deliveryAddressData, setDeliveryAddressData } = props || {};
  const { addPersonMappedRows } = props;

  const handleUpdate = (e, col) => {
    setDeliveryAddressData({
      ...deliveryAddressData,
      [`${col.field}`]: e.target.value
    });
  };

  return addPersonMappedRows.map((row, index) => (
    <div key={index} className="row">
      {row.map((col, index) => (
        <div key={index} className="col">
          <CustomInput
            key={index}
            defaultValue={col.state}
            onChange={(e) => handleUpdate(e, col)}
            label={col.field}
            placeholder={col.field}
          ></CustomInput>
        </div>
      ))}
    </div>
  ));
};

const Checkout = () => {
  const deliveryAddressInitialState = {
    fullName: '',
    mobileNo: '',
    country: '',
    province: '',
    city: '',
    address: ''
  };
  const paymentInitialState = {
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    country: ''
  };
  const [deliveryAddressData, setDeliveryAddressData] = useState(
    deliveryAddressInitialState
  );

  const [paymentData, setPaymentData] = useState(paymentInitialState);
  const originalData = useSelector((state) => state.shoppingBag.cart);
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const data = originalData.filter((item, index) => item.selected === true);

  const loader = useSelector((state) => state.adminProduct.loader);
  const [deliveryOffcanvas, showDeliveryOffcanvas] = useState(false);

  const [paymentOffcanvas, showPaymentOffcanvas] = useState(false);
  const [updatePaymentOffcanvas, setUpdatePaymentOffcanvas] = useState(false);
  const [changeAddressOffcanvas, setChangeAddressOffcanvas] = useState(false);

  const deliveryPersons = currentUser.deliveryAddress;
  const allPaymentMethods = currentUser.paymentMethods;
  const selectedPerson = currentUser.selectedPerson;
  const selectedPaymentMethod = currentUser.selectedPaymentMethod;

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const addPersonMappedRows = [
    [{ field: 'fullName', state: deliveryAddressData.fullName }],
    [
      { field: 'mobileNo', state: deliveryAddressInitialState.mobileNo },
      { field: 'country', state: deliveryAddressInitialState.country }
    ],
    [
      { field: 'province', state: deliveryAddressInitialState.province },
      { field: 'city', state: deliveryAddressInitialState.city }
    ],
    [{ field: 'address', state: deliveryAddressInitialState.address }]
  ];
  const addPaymentMappedRows = [
    [{ field: 'cardNumber', state: paymentData.cardNumber }],
    [{ field: 'expiryDate', state: paymentData.expiryDate }],
    [{ field: 'cvc', state: paymentData.cvc }],
    [{ field: 'country', state: paymentData.country }]
  ];
  const placeMyOrder = () => {
    dispatch(PlaceOrder(data));

    alert('your order has been placed');

    navigation('/');
  };

  const displayTheDeliveryOffcanvas = () => {
    showDeliveryOffcanvas(true);
  };

  const hideTheDeliveryOffcanvas = () => {
    showDeliveryOffcanvas(false);
  };

  const displayThePaymentOffcanvas = () => {
    showPaymentOffcanvas(true);
  };

  const hideThePaymentOffcanvas = () => {
    showPaymentOffcanvas(false);
  };

  const displayUpdatePaymentOffcanvas = () => {
    setUpdatePaymentOffcanvas(true);
  };

  const hideUpdatePaymentOffcanvas = () => {
    setUpdatePaymentOffcanvas(false);
  };

  useEffect(() => {
    dispatch(GetDeliveryAddress());
  }, []);

  const saveThePerson = () => {
    const { address, city, country, mobileNo, fullName, province } =
      deliveryAddressData;

    if (
      address === '' ||
      city === '' ||
      country === '' ||
      mobileNo === '' ||
      fullName === '' ||
      province === ''
    ) {
      alert('Please provide all details');
    } else {
      dispatch(AddDeliveryAddress(deliveryAddressData));
    }

    hideTheDeliveryOffcanvas();
  };

  const saveThePaymentMethod = () => {
    const { cardNumber, country, cvc, expiryDate } = paymentData;

    if (
      cardNumber === '' ||
      country === '' ||
      cvc === '' ||
      expiryDate === ''
    ) {
      alert('please provide all details');
    } else {
      dispatch(AddPaymentMethod(paymentData));
    }
    hideThePaymentOffcanvas();
  };

  const newSelectedItems = data.filter((item) => item.selected);
  const total = newSelectedItems.reduce(
    (accumulator, singleItem) =>
      accumulator + singleItem.quantity * singleItem.price,
    0
  );

  return (
    <div className="checkout-box container ">
      {paymentOffcanvas
        ? (
        <DeliveryOffcanvas
          handleFunc={saveThePaymentMethod}
          heading="Add Payment Method"
          rows={
            <AddPersonRows
              addPersonMappedRows={addPaymentMappedRows}
              deliveryAddressData={paymentData}
              setDeliveryAddressData={setPaymentData}
            />
          }
          show={paymentOffcanvas}
          handleShow={() => hideThePaymentOffcanvas}
        />
          )
        : (
        <></>
          )}
      {updatePaymentOffcanvas
        ? (
        <UpdatePaymentOffcanvas
          handleFunc={saveThePaymentMethod}
          handleShow={hideUpdatePaymentOffcanvas}
          rows={
            <AddPersonRows
              addPersonMappedRows={addPaymentMappedRows}
              deliveryAddressData={paymentData}
              setDeliveryAddressData={setPaymentData}
            />
          }
          show={updatePaymentOffcanvas}
        />
          )
        : (
        <></>
          )}
      {deliveryOffcanvas
        ? (
        <DeliveryOffcanvas
          heading="Add Delivery Address"
          handleFunc={saveThePerson}
          rows={
            <AddPersonRows
              addPersonMappedRows={addPersonMappedRows}
              deliveryAddressData={deliveryAddressData}
              setDeliveryAddressData={setDeliveryAddressData}
            />
          }
          show={deliveryOffcanvas}
          handleShow={hideTheDeliveryOffcanvas}
        />
          )
        : (
        <></>
          )}
      {changeAddressOffcanvas
        ? (
        <ChangeAddressOffcanvas
          onClick={displayTheDeliveryOffcanvas}
          show={changeAddressOffcanvas}
          handleShow={() => {
            setChangeAddressOffcanvas(false);
          }}
        />
          )
        : (
        <></>
          )}
      <div className="row">
        <div className="mt-3 col-8">
          <div className="heading-style">
            <h4>
              <Image
                style={{ cursor: 'pointer !important' }}
                onClick={() => {
                  navigation('/c');
                }}
                src={LeftArrow}
              ></Image>
              Checkout
            </h4>
          </div>
          <Container className="">
            <Row className="">
              <div className=" p-1 delivery-address-box mb-2 col-12">
                <div className="">
                  {deliveryPersons.length !== 0
                    ? (
                    <div className="container">
                      <div className="row">
                        <div className="col-10">
                          <p>
                            Deliver to{' '}
                            <b>{deliveryPersons[selectedPerson].name}</b>
                          </p>
                        </div>
                        <div className="col-2">
                          <CustomButton
                            onClick={() => setChangeAddressOffcanvas(true)}
                            size="sm"
                            value="Change"
                            className="btn btn-outline-primary"
                          ></CustomButton>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <p>
                            mobileNo: {deliveryPersons[selectedPerson].mobileNo}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <p>
                            Address: {deliveryPersons[selectedPerson].address}
                          </p>
                        </div>
                      </div>
                    </div>
                      )
                    : (
                    <CustomButton
                      onClick={displayTheDeliveryOffcanvas}
                      variant="primary"
                      value="Add deivery address"
                    ></CustomButton>
                      )}
                </div>
              </div>
            </Row>
            <Row>
              {loader === false
                ? (
                <>
                  {data.map((d, index) => (
                    <CartItems
                      showBin={false}
                      showCheckBox={false}
                      key={index}
                      data={d}
                    ></CartItems>
                  ))}
                </>
                  )
                : (
                <>products are loading</>
                  )}{' '}
            </Row>
          </Container>
        </div>
        <div className="mt-5 col-4">
          <h5>Order Summary</h5>
          <div className="mt-3 order-summary">
            <Container className="mt-3">
              <Row className="mb-3">
                <Col sm="9">Sub Total: {newSelectedItems.length} items</Col>
                <Col>
                  <b>${total}</b>
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
                  <b>${total}</b>
                </Col>
              </Row>
              <Row className="mb-3"></Row>
            </Container>
          </div>
          <h5>Select payment method</h5>
          <div className=" d-flex align-items-center payment-box container">
            {allPaymentMethods.length !== 0
              ? (
              <div className="container">
                <div className="row">
                  <PaymentCard
                    cardDetails={allPaymentMethods[selectedPaymentMethod]}
                  />

                  <div className="col-2">
                    <Image
                      onClick={() => {
                        displayUpdatePaymentOffcanvas();
                      }}
                      src={PaymentEdit}
                    />
                  </div>
                </div>
              </div>
                )
              : deliveryPersons.length !== 0
                ? (
              <CustomButton
                onClick={displayThePaymentOffcanvas}
                value="+ Add New"
                className="btn btn-outline-primary"
              ></CustomButton>
                  )
                : (
              <CustomButton
                disabled={true}
                value="+ Add New"
                className="btn btn-outline-secondary"
              ></CustomButton>
                  )}
          </div>
          <div className=" mt-2 container">
            <div className=" row">
              {allPaymentMethods.length !== 0
                ? (
                <CustomButton
                  onClick={placeMyOrder}
                  disabled={false}
                  value="Pay Now"
                  className="btn btn-primary"
                ></CustomButton>
                  )
                : (
                <CustomButton
                  disabled={true}
                  value="Place order"
                  className="btn btn-secondary"
                ></CustomButton>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
