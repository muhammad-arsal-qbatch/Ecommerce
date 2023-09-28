// import { useEffect } from 'react';
// import axios from 'axios';

import Products from '../../../components/products';
import CustomTable from '../../../components/customTable';

import './adminProducts.css'
// import { useDispatch, useSelector } from 'react-redux';
// import { getData } from '../../../redux/slices/adminProduct';

const AdminProducts = () => {
  const headings = [{
    id: 'title',
    label: 'Title',
    image: 'thumbnail',
    render: (img) => (<img src= {img} className='item-image' ></img>)
  }, {
    id: 'category',
    label: 'Category'
  }, {
    id: 'brand',
    label: 'Brand'
  }, {
    id: 'price',
    label: 'Prize'
  }, {
    id: 'stock',
    label: 'Stock'
  }, {
    id: 'actions',
    label: 'Actions'
  }];

  return (
        <div className='main-box-admin'>
        <Products/>

        <CustomTable
          headings={headings}
          // data={data}
          // loader={loader}
          // error={error}
          // handleNext={handleNext}
          // handlePrevious={handlePrevious}
          // handleOffset={handleOffset}
          // offset={offset}
          // // setData={() => {}}
        />
         </div>
  )
}
export default AdminProducts;
