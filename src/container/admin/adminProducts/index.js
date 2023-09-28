import Products from '../../../components/products';
import CustomTable from '../../../components/customTable';

import './adminProducts.css'

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
        />
         </div>
  )
}
export default AdminProducts;
