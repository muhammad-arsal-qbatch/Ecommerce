import Products from '../../../components/products';
import CustomTable from '../../../components/customTable';
import { getData } from '../../../redux/slices/adminProduct';
import { Pagination } from 'react-bootstrap';
import './adminProducts.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ErrorModal from '../../../components/errorModal';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);

  // const handleNexts = () => {
  //   dispatch(handleNext());
  // }
  // const handlePreviouss = () => {
  //   console.log('inisde handle previous');
  //   dispatch(handlePrevious());
  // }
  // const handleOffsets = (val) => {
  //   dispatch(handleOffset(val));
  // }

  const data = useSelector((state) => state.adminProduct.data);
  const error = useSelector((state) => state.adminProduct.error);
  useEffect(() => {
    dispatch(getData(offset));
  }, [offset]
  )

  const headings = [{
    id: 'productName',
    label: 'Title',
    image: 'thumbnail',
    render: (img) => (<img src= {img} className='item-image' ></img>)
  }, {
    id: 'size',
    label: 'Size'
  }, {
    id: 'color',
    label: 'Color'
  }, {
    id: 'price',
    label: 'Price'
  }, {
    id: 'quantity',
    label: 'Stock'
  }, {
    id: 'actions',
    label: 'Actions'
  }];

  return (
        <div className='main-box-admin'>
          {error
            ? <ErrorModal error={error} />
            : <>
            <Products/>

          <CustomTable
              data={data}
              pagination={false}
              headings={headings}
          />
<div className='pagination'>
    <Pagination>
      <Pagination.Item disabled={offset <= 0} onClick={() => { setOffset(offset - 1) }} >{'Previous'}</Pagination.Item>
      <Pagination.Item onClick= {() => { setOffset(offset + 1) }} >{offset + 1}</Pagination.Item>
      <Pagination.Item onClick= {() => { setOffset(offset + 2) }} >{offset + 2}</Pagination.Item>
      <Pagination.Item onClick= {() => { setOffset(offset + 3) }} >{offset + 3}</Pagination.Item>
      <Pagination.Item disabled = {offset >= 9 } onClick={() => setOffset(offset + 1)}>{'Next'}</Pagination.Item>
    </Pagination>
    </div>
            </>
          }

         </div>
  )
}
export default AdminProducts;
