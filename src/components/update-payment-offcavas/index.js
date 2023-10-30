import PropTypes from 'prop-types';
import { Offcanvas } from 'react-bootstrap';

import { NewPaymentMethod } from '../../redux/slices/checkout';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../button';
import PaymentCard from '../payment-card';
import { useEffect } from 'react';

const UpdatePaymentOffcanvas = ({ show, handleShow, rows, handleFunc }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(GetAllPaymentMethods())
    console.log('all payment methods are');
  }, [])
  const allPaymentMethods = useSelector((state) => state.checkout.allPaymentMethods) || [];
  const selectedPaymentMethod = useSelector((state) => state.checkout.selectedPaymentMethod) || 0;
  console.log('selected payment method iss  ', selectedPaymentMethod);
  return (
    <Offcanvas
      className="custom-offcanvas"
      show={show}
      onHide={handleShow}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <h3>Add new payment method</h3>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex flex-wrap">
          {allPaymentMethods.map((singleCard, index) => (
            <div key={index}>
              {' '}
              <PaymentCard cardDetails={singleCard} />
              {selectedPaymentMethod === index
                ? (
                <CustomButton
                  size="sm"
                  disabled={true}
                  value="selected"
                  className="btn btn-outline-primary"
                ></CustomButton>
                  )
                : (
                <CustomButton
                  onClick={() => { dispatch(NewPaymentMethod(index)) }}
                  size="sm"
                  value="select this"
                  className="btn btn-outline-primary"
                ></CustomButton>
                  )}
            </div>
          ))}
        </div>
        <div className="container">
          {rows}
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-end">
                <CustomButton
                  onClick={handleFunc}
                  value="Save"
                  variant="primary"
                ></CustomButton>
              </div>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

UpdatePaymentOffcanvas.propTypes = {
  show: PropTypes.bool,
  rows: PropTypes.any,
  handleShow: PropTypes.func,
  handleFunc: PropTypes.func
};

export default UpdatePaymentOffcanvas;
