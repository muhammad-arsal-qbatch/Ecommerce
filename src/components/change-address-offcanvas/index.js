import { Offcanvas } from 'react-bootstrap';
import PropTypes from 'prop-types';

// import './deliveryOffcanvas.css';
import CustomButton from '../button';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateDeliveryPerson } from '../../redux/slices/user/checkout';
// import { useDispatch } from 'react-redux';
const ChangeAddressOffcanvas = ({
  onClick,
  address,
  heading,
  show, handleShow,
  handleFunc
}) => {
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const deliveryAddress = currentUser.deliveryAddress;
  console.log('\n\nall delivery persons are,  ', deliveryAddress);
  const selectedPerson = currentUser.selectedPerson;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(GetAllDeliveryAddress())
  //   console.log({ allDeliveryAddress });
  // }, [])
  // const dispatch= useDispatch();
  return (
    <Offcanvas show={show} onHide={handleShow} placement='end' >
      <Offcanvas.Header closeButton>Add new Address</Offcanvas.Header>
      <Offcanvas.Body>
          <div className='container'>
            <div className='row'>
              <CustomButton className=' mb-2 btn btn-primary' value= 'Add New' onClick={onClick} />
            </div>
            {deliveryAddress.map((singleAddress, index) => {
              return (
                <div key={ index } className=' p-1 delivery-address-box mb-2 col-12'>
                <div key={index} className='container'>
                        <div className='row'>
                          <div className='col-10'>
                            <p>Deliver to <b>{singleAddress.name}</b></p>
                          </div>
                          <div className='col-2'>
                            {selectedPerson === index
                              ? <CustomButton size='sm' disabled= {true} value='selected' className='btn btn-outline-primary' ></CustomButton>
                              : <CustomButton onClick ={ () => dispatch(UpdateDeliveryPerson(index))} size='sm' value='select this' className='btn btn-outline-primary' ></CustomButton>

                            }
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-12'>
                            <p>mobileNo: {singleAddress.mobileNo}</p>
                          </div>
                        </div>
                        <div className='row mb-3'>
                        <div className='col-12'>
                            <p>Address: {singleAddress.address}</p>
                          </div>
                        </div>
                         </div>
                         </div>

              )
            })}
          </div>
      </Offcanvas.Body>
    </Offcanvas>

  )
}
ChangeAddressOffcanvas.propTypes = {
  rows: PropTypes.any,
  heading: PropTypes.string,
  show: PropTypes.bool,
  onClick: PropTypes.func,
  handleShow: PropTypes.func,
  handleFunc: PropTypes.func,
  address: PropTypes.array
}
export default ChangeAddressOffcanvas;
