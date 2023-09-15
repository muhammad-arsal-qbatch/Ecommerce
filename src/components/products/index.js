import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../button';

import './products.css'
import { showAddProductCanvas } from '../../redux/slices/adminProduct';
import CustomOffcanvas from '../offcanvas';
const Products = () => {
  const dispatch = useDispatch();
  const addProductCanvas = useSelector((state) => state.adminProduct.addProductCanvas);
  return (
      <div className='rectangle-admin-p'>

        <h4 className='heading-style'>Products</h4>
        <div className='btn-position'>
          <div className='single-btn'>
        <CustomButton size = 'default' variant = 'primary' value = 'Import Bulk Products' ></CustomButton>
        </div>
        <div className='single-btn'>
        <CustomButton
        size = 'default'
        onClick={() => {
          dispatch(showAddProductCanvas({}))
        }}
        variant = 'primary'
        value = 'Add New' ></CustomButton></div>
        </div>
        {addProductCanvas
          ? <CustomOffcanvas title= "add new product" ></CustomOffcanvas>
          : <></>
      }
      </div>

  )
}
export default Products;
