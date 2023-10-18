import { Image, Modal, Table } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import Arrow from '../../assets/images/Arrow.svg'
import DeleteBtn from '../../assets/images/delete-btn.svg';
import EditBtn from '../../assets/images/edit-btn.svg';
import Warning from '../../assets/images/warning.svg';
import CustomModal from '../customModal';
import CustomOffcanvas from '../../components/offcanvas';
import { displayModal, showOffcanvas } from '../../redux/slices/adminProduct';

import './customTable.css';

const CustomTable = (props) => {
  const {
    data = [],
    headings
  } = props;
  const offset = useSelector((state) => state.adminProduct.offset);
  const status = useSelector((state) => state.adminProduct.status);
  const error = useSelector((state) => state.adminProduct.tableDataError);
  const loader = useSelector((state) => state.adminProduct.loader);
  const offcanvas = useSelector((state) => state.adminProduct.offcanvas);
  const modal = useSelector((state) => state.adminProduct.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(offset);
  }, [])

  const editTheProduct = (product) => {
    console.log('inside edit the produtc', product);
  }

  return (
    <>
    <Modal>

    </Modal>
        <Table borderless dark = 'true'>
      <thead className='thead-dark'>
        <tr className='table-secondary'>
          {headings.map((heading, index) => {
            return <th key={ index }>{heading.label}
            {index === 0
              ? (<Image src={Arrow}></Image>)
              : null }
            </th>
          })}
        </tr>
      </thead>
      <tbody>
        {data.length !== 0
          ? status === true

            ? (

                data?.map((doc, index) => (
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
                   {col.render(doc)}
                   </span>
                   <span className='item-text'id='title-text' >{doc.productName}</span>
                   </div>
                     : col.id === 'color'
                       ? (
                          <>{doc[col.id]}</>
                         )
                       : col.id === 'status'
                         ? (
                             col.render(doc[col.id])
                           )
                         : col.id === 'action'
                           ? (
                               col.render(doc)
                             )
                           : col.id === 'date' ? (<> {moment(doc[col.id]).format('ll')}</>) : <>{doc[col.id]}</>

                    //  : doc[col.id

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

          : <>no Data found</>
      }

    </tbody>
    </Table>
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
  setData: PropTypes.func,
  getData: PropTypes.func
}
export default CustomTable;
