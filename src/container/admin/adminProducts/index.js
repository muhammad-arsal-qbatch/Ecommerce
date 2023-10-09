import Products from '../../../components/products';
import CustomTable from '../../../components/customTable';
import { getData } from '../../../redux/slices/adminProduct';

import './adminProducts.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const AdminProducts = () => {
  const data = useSelector((state) => state.adminProduct.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, [])

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
        <Products/>

        <CustomTable data={data} getData={getData}
          headings={headings}
        />
         </div>
  )
}
export default AdminProducts;
