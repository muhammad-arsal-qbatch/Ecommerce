import React from 'react';
import {
  Image,
  Modal,
  Table
} from 'react-bootstrap';

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import Arrow from '../../assets/images/Arrow.svg';
import Warning from '../../assets/images/warning.svg';
import CustomModal from '../custom-modal';
import CustomOffcanvas from '../offcanvas';
import { DisplayModal } from '../../redux/slices/products';

import './customTable.css';

const CustomTable = (props) => {
  const {
    data = [],
    headings
  } = props;

  const status = useSelector((state) => state.adminProduct.status);
  const offcanvas = useSelector((state) => state.adminProduct.offcanvas);
  const modal = useSelector((state) => state.adminProduct.modal);
  const dispatch = useDispatch();

  return (
    <>
      <Modal show={modal} onHide={() => dispatch(DisplayModal(null))}>
      </Modal>
      <Table borderless dark>
        <thead className='thead-dark'>
          <tr className='table-secondary'>
            {headings.map((heading, index) => (
              <th key={index}>{heading.label}
                {index === 0
                  ? (<Image src={Arrow} alt="Arrow" />)
                  : null }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 && status === true
            ? (
                data.map((doc, index) => (
              <tr key={index}>
                {headings.map((col, index) => (
                  <td key={index}>
                    {col.render(doc, col.id)}
                  </td>
                ))}
              </tr>
                ))
              )
            : (
            <tr>
              <td colSpan={headings.length}>No Data found</td>
            </tr>
              )}
        </tbody>
      </Table>
      {modal ? <CustomModal image={Warning} heading6='are you sure you want to delete' heading4='Remove product' /> : null}
      {offcanvas ? <CustomOffcanvas title="Edit Product" /> : null}
    </>
  );
}

CustomTable.propTypes = {
  data: PropTypes.array,
  headings: PropTypes.array
}

export default CustomTable;
