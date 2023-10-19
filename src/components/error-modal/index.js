import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const ErrorModal = ({ error, clearError }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(true);

  const clearTheError = () => {
    setModal(false);
    dispatch(clearError());
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      {' '}
      <Modal show={modal} onHide={() => clearTheError()}>
        <Modal.Header closeButton={modal}></Modal.Header>
        <Modal.Body>
          {typeof error === 'object'
            ? (
            <p>Internal server error</p>
              )
            : (
            <p>{error}</p>
              )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

ErrorModal.propTypes = {
  error: PropTypes.string,
  clearError: PropTypes.func
};

export default ErrorModal;
