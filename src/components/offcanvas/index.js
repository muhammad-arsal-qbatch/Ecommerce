import PropTypes from 'prop-types';
import { Offcanvas, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';

import {
  AddProduct,
  EditProduct,
  HideOffcanvas
} from '../../redux/slices/products';

import CloudArrowUp from '../../assets/images/cloud-arrow-up.svg';
import CustomButton from '../button';
import CustomInput from '../input-field';

import './offcanvas.css';
import Loader from '../loader';

const CustomOffcanvas = ({
  title = 'Add new product',
  onClick,
  productName = 'Add Product Name',
  price = 'price',
  quantity = 'Quantity'
}) => {
  const imageInputRef = useRef();
  const colors = ['darkgreen', 'grey', 'black', 'blue', 'darkred'];
  const [selectedColors, setSelectedColors] = useState([]);
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  const [selectedSize, setSelectedSizes] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);

  const [productTitle, setProductTitle] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const body = useSelector((state) => state.adminProduct.product);
  const loader = useSelector((state) => state.adminProduct.loader);

  const dispatch = useDispatch();

  const addMyProduct = () => {
    if (productTitle === '' || !/^\d+$/.test(productPrice) || !/^\d+$/.test(productStock)) {
      alert('Please provide valid Product Name, Quantity, and Price');
    } else {
      const newProduct = {
        productName: productTitle,
        size: selectedSize,
        color: selectedColors,
        price: productPrice,
        quantity: productStock,
        images: [...imagesArray]
      };
      dispatch(AddProduct({ newProduct }));
    }
  };

  const editMyProduct = () => {
    if ((!/^\d*$/.test(productPrice) && productPrice !== '') || (!/^\d*$/.test(productStock) && productStock !== '')) {
      alert('Please provide valid Product Name, Quantity, and Price');
    } else {
      const newProduct = {
        productName: productTitle,
        size: selectedSize,
        color: selectedColors,
        price: productPrice,
        quantity: productStock,
        images: [...imagesArray],
        id: body._id
      };
      dispatch(EditProduct({ newProduct }));
    }
  };

  const toggleSize = (size) => {
    setSelectedSizes((prevSize) => {
      if (prevSize.includes(size)) {
        return prevSize.filter((singleSize) => singleSize !== size);
      } else {
        return [...prevSize, size];
      }
    });
  };
  const toggleColor = (color) => {
    setSelectedColors((prevColor) => {
      if (prevColor.includes(color)) {
        return prevColor.filter((singleColor) => singleColor !== color);
      } else {
        return [...prevColor, color];
      }
    });
  };

  // const toggleColor = (color) => {
  //   setSelectedColors((prevColor) => (prevColor === color ? '' : color));
  // };

  const addFile = (files) => {
    setImagesArray([...imagesArray, ...files]);
  };

  return (
    <div className="custom-offcanvas">
      <Offcanvas
        className="custom-offcanvas"
        show={true}
        placement="end"
        onHide={() => dispatch(HideOffcanvas())}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title} </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {body.productName ? body.productName : 'Product Name'}
          <div className="canvas-body">
            <div className="body-left">
              <div className="image-input">
                <Image className="cloud-image" src={CloudArrowUp}></Image>
                <CustomButton
                onClick={ () => {
                  imageInputRef.current.click();
                }}
                  type="file"
                  value="Browse"
                  variant="primary"
                  size="sm"
                />
                <input
                style={{ display: 'none' }}
                ref={imageInputRef}
                  onChange={(e) => addFile(e.target.files)}
                  type="file"
                  id="fileInput"
                  multiple
                />
              </div>
              <p className="images-text">multiple images can be uploaded</p>
              <div className="images-div">
                {body.images
                  ? (
                      body.images.map((img, index) => (
                    <Image
                      className="product-image"
                      key={index}
                      src={`http://localhost:5000/${img}`}
                    ></Image>
                      ))
                    )
                  : (
                  <p>add an image</p>
                    )}
              </div>
            </div>
            <div className="body-right">
              <CustomInput
                id="productName"
                label="Product Name"
                placeholder={body.productName ? body.productName : productName}
                size="lg"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
              />
              Size
              <div className="size-box">
                {sizes.map((s, index) => (
                  <div
                    key={index}
                    onClick={() => toggleSize(s)}
                    className={`sizes ${selectedSize.includes(s) ? 'selected' : ''} `}
                  >
                    {s}
                  </div>
                ))}
              </div>
              Color
              <div className="size-box">
                {colors.map((c, index) => (
                  <div
                    className={`sizes ${selectedColors.includes(c) ? 'selected' : ''}`}
                    onClick={() => toggleColor(c)}
                    key={index}
                  >
                    <div
                      key={index}
                      className="color-box"
                      style={{ backgroundColor: c }}
                    />
                  </div>
                ))}
              </div>
              <CustomInput
                id="price"
                label="Price"
                placeholder={
                  body.price ? `$${body.price}` : `Enter ${price}`
                }
                size="lg"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <CustomInput
                id="quantity"
                label="Quantity"
                placeholder={
                  body.quantity ? body.quantity : `Enter ${quantity}`
                }
                size="lg"
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
              />
              <div className="btn-position">
                {loader
                  ? <Loader />

                  : <CustomButton
                  value={body._id ? 'Update' : 'Add'}
                  variant="primary"
                  size="lg"
                  onClick={
                    body._id
                      ? (e) => editMyProduct()
                      : () => addMyProduct()
                  }
                />
              }
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

CustomOffcanvas.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  body: PropTypes.any,
  hideOffcanvas: PropTypes.func,
  onClick: PropTypes.func,
  productName: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.string
};

export default CustomOffcanvas;
