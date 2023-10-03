import { Offcanvas } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './deliveryOffcanvas.css';
import CustomButton from '../button';
// import { useDispatch } from 'react-redux';
const DeliveryOffcanvas = ({
  onClick,
  rows,
  heading,
  show, handleShow,
  handleFunc
}) => {
  // const dispatch= useDispatch();
  return (
    <Offcanvas show={show} onHide={handleShow} placement='end' >
      <Offcanvas.Header closeButton>Add new Address</Offcanvas.Header>
      <Offcanvas.Body>
        <div className='container'>
          {rows}
          <div className='row'>
            <div className='col-12'>
              <div className='d-flex justify-content-end'>
                <CustomButton onClick={handleFunc} value="Save" variant='primary' ></CustomButton>
              </div>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>

  )
}
DeliveryOffcanvas.propTypes = {
  rows: PropTypes.any,
  heading: PropTypes.string,
  show: PropTypes.bool,
  onClick: PropTypes.func,
  handleShow: PropTypes.func,
  handleFunc: PropTypes.func
}
export default DeliveryOffcanvas;
