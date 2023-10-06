import Products from '../../../components/products';
import CustomTable from '../../../components/customTable';
import { getData } from '../../../redux/slices/adminProduct';

import './adminProducts.css'
import { useSelector } from 'react-redux';

const AdminProducts = () => {
  const data = useSelector((state) => state.adminProduct.data);

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

        <CustomTable data={data} getData={getData}
          headings={headings}
        />
         </div>
  )
}
export default AdminProducts;
