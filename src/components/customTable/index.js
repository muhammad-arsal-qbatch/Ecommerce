import { Image, Modal, Pagination, Table } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Arrow from '../../assets/images/Arrow.svg'
import DeleteBtn from '../../assets/images/delete-btn.svg';
import EditBtn from '../../assets/images/edit-btn.svg';
import Warning from '../../assets/images/warning.svg';
import CustomModal from '../customModal';
import CustomOffcanvas from '../../components/offcanvas';
import { displayModal, getData, handleNext, handleOffset, handlePrevious, showOffcanvas } from '../../redux/slices/adminProduct';

import './customTable.css';

const CustomTable = (props) => {
  const {
    headings,
    pagination = true
  } = props;
  const offset = useSelector((state) => state.adminProduct.offset);
  const data = useSelector((state) => state.adminProduct.data);
  const status = useSelector((state) => state.adminProduct.status);
  const error = useSelector((state) => state.adminProduct.error);
  const loader = useSelector((state) => state.adminProduct.loader);
  const offcanvas = useSelector((state) => state.adminProduct.offcanvas);
  const modal = useSelector((state) => state.adminProduct.modal);
  const dispatch = useDispatch();

  const handleNexts = () => {
    console.log('inisde handle next');
    // const newValue = offset + 1;
    // setOffset((offset) => offset + 1);
    dispatch(handleNext());
  }
  const handlePreviouss = () => {
    console.log('inisde handle previous');
    // setOffset((offset) => offset - 1);
    dispatch(handlePrevious());
  }
  const handleOffsets = (val) => {
    // setOffset(val);
    console.log(val);
    dispatch(handleOffset(val));
  }

  useEffect(() => {
    console.log(offset);
    // getData();
    dispatch(getData());
  }, [offset])

  const editTheProduct = (product) => {
    console.log('inside edit the produtc', product);
  }

  return (
    <>
    <Modal>

    </Modal>
        <Table borderless dark>
      <thead className='thead-dark'>
        <tr className='table-secondary'>
          {headings.map((heading, index) => {
            return <th key={ index }>{heading.label}
            {index === 0 || index === 3 || index === 4
              ? (<Image src={Arrow}></Image>)
              : null }
            </th>
          })}
        </tr>
      </thead>
      <tbody>
        {status === true
          ? (

              data.map((doc, index) => (
          <tr key={index}>
            {headings.map((col, index) => (
              <td key={index}>
                {
                 col.id === 'actions'
                   ? <div className='actions-btn'>

                   <Image onClick= {() => dispatch(showOffcanvas(doc))} className='action-images' src={EditBtn}></Image>
                   <Image onClick={ () => dispatch(displayModal(doc))} className='action-images' src={DeleteBtn}></Image>
           </div>
                   : col.id === 'title'
                     ? <div className='box-text'>
                   <span className='image-box'>
                   {col.render(doc[col.image])}
                   </span>
                   <span className='item-text'id='title-text' >{doc[col.id]}</span>
                   </div>
                     : doc[col.id]

                }
              </td>

            ))}
        </tr>
              ))

            )
          : (
              loader === true
                ? (

          <div><Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner></div>
                  )
                : (
              <div>{error}</div>
                  )
            )
        }

    </tbody>
    </Table>
    {pagination
      ? <div className='pagination'>
    <Pagination>
      <Pagination.Item disabled={offset <= 0} onClick={() => { handlePreviouss() }} >{'Previous'}</Pagination.Item>
      <Pagination.Item onClick= {() => { handleOffsets(offset + 1) }} >{offset + 1}</Pagination.Item>
      <Pagination.Item onClick= {() => { handleOffsets(offset + 2) }} >{offset + 2}</Pagination.Item>
      <Pagination.Item onClick= {() => { handleOffsets(offset + 3) }} >{offset + 3}</Pagination.Item>
      <Pagination.Item disabled = {offset >= 9 } onClick={() => handleNexts()}>{'Next'}</Pagination.Item>
    </Pagination>
    </div>
      : <></>}
    {modal
      ? <CustomModal image={Warning} heading6='are you sure u want to delete' heading4='Remove product' ></CustomModal>
      : <></>
    }
    {offcanvas
      ? <CustomOffcanvas onClick={editTheProduct} title="Edit Product" ></CustomOffcanvas>
      : <></>
}
    </>
  )
}
CustomTable.propTypes = {
  data: PropTypes.array,
  cols: PropTypes.string,
  pagination: PropTypes.bool,
  headings: PropTypes.array,
  loader: PropTypes.bool,
  error: PropTypes.string,
  handleNext: PropTypes.func,
  handlePrevious: PropTypes.func,
  handleOffset: PropTypes.func,
  offset: PropTypes.any,
  setData: PropTypes.func
}
export default CustomTable;
