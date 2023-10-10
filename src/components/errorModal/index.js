import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearError } from '../../redux/slices/adminProduct';

const ErrorModal = ({
  error
}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(true);
  const clearTheError = () => {
    setModal(false);
    dispatch(clearError())
  }

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    > <Modal
     show={modal}
     onHide={() => clearTheError()}

    >
        <Modal.Header closeButton = {modal}>

        </Modal.Header>
        <Modal.Body>
          <p>{error}</p>
        </Modal.Body>

      </Modal>
      </div>
  )
}
ErrorModal.propTypes = {
  error: PropTypes.string
}
export default ErrorModal;
