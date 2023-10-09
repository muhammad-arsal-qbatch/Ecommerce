import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal';

import CustomButton from '../button';

import './customModal.css';

import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, hideModal } from '../../redux/slices/adminProduct';

const CustomModal = (props) => {
  const {
    heading4,
    heading6,
    image

  } = props
  const dispatch = useDispatch();
  // const modal = useSelector((state) => state.adminProducts.modal);
  const product = useSelector((state) => state.adminProduct.product);
  return (
    <>
    <Modal centered= {true} show= {true} >
      <Modal.Body>
        <div className='msg-container'>
        <h4 className= 'msg-h4'>
        {heading4}
        </h4>
        <Image src={image}></Image>
            <h6 className='msg-h6'>{heading6}</h6>
        </div>
      </Modal.Body>
      <Modal.Footer>
      <div className='msg-btns'>
            <CustomButton onClick={() => dispatch(hideModal())} value='No' variant='primary' size='lg'/>
            <CustomButton onClick={() => dispatch(deleteProduct({ product }))} value='yes' variant='primary' size='sm'/>
            </div>
      </Modal.Footer>
    </Modal>
        {/* <div className='msg-container'>
            <h4 className='msg-h4'>
                {heading4}

            </h4>
            <Image src={image}></Image>
            <h6 className='msg-h6'>{heading6}</h6>
            <div className='msg-btns'>
            <CustomButton value='No' variant='primary' size='lg'/>
            <CustomButton value='yes' variant='primary' size='sm'/>
            </div>
        </div> */}
        </>
  )
}
CustomModal.propTypes = {
  heading4: PropTypes.string,
  heading6: PropTypes.string,
  image: PropTypes.Image,
  showModal: PropTypes.bool,
  hideModal: PropTypes.func,
  yesMethod: PropTypes.func,
  productId: PropTypes.any
}

export default CustomModal;
