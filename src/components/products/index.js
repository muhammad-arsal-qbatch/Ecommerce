import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../button';
import { ImportBulkProducts, ShowAddProductCanvas } from '../../redux/slices/products';
import CustomOffcanvas from '../offcanvas';

import './products.css';
import { useRef, useState } from 'react';

const Products = () => {
  const bulkRef = useRef();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const handleUpload = () => {
    const formData = new FormData();
    console.log('file is  ', file);
    formData.append('file', file)
    console.log('form data is  ', formData);
    dispatch(ImportBulkProducts(file));
  }
  const addProductCanvas = useSelector(
    (state) => state.adminProduct.addProductCanvas
  );
  return (
    <div className="rectangle-admin-p">
      <h4 className="heading-style">Products</h4>
      <div className="btn-position">
        <div className="single-btn">
          <input
          ref={bulkRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files)}
          type='file'
          title='import bulk products'
          />
                <button onClick={handleUpload}>Upload File</button>

          <CustomButton
          onClick={() => {
            console.log('dasdasd');
            bulkRef.current.click();
          }}
          type='file'
            size="default"
            variant="primary"
            value="Import Bulk Products"
          ></CustomButton>
        </div>
        <div className="single-btn">
          <CustomButton
            size="default"
            onClick={() => {
              dispatch(ShowAddProductCanvas({}));
            }}
            variant="primary"
            value="Add New"
          ></CustomButton>
        </div>
      </div>
      {addProductCanvas
        ? (
        <CustomOffcanvas title="add new product"></CustomOffcanvas>
          )
        : (
        <></>
          )}
    </div>
  );
};

export default Products;
