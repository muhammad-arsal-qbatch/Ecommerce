import PropTypes from 'prop-types';
import { Offcanvas, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import CloudArrowUp from '../../assets/images/cloud-arrow-up.svg';
import CustomButton from '../button';
import CustomInput from '../inputField';
import { addProduct, editProduct, hideOffcanvas } from '../../redux/slices/adminProduct';

import './offcanvas.css'

const CustomOffcanvas = ({
  title = 'Add new product',
  onClick,
  productName = 'Add Product Name',
  price = 'price',
  quantity = 'Quantity'
}) => {
  const colors = ['#155724', '#AAA', '#1B1E21', '#231579', '#740F0F'];
  const colorsName = [
    { '#155724': 'darkgreen' },
    { '#AAA': 'grey' },
    { '#1B1E21': 'black' },
    { '#231579': 'blue' },
    { '#740F0F': 'darkred' }
  ]
  const [selectedColors, setSelectedColors] = useState('');
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  const [selectedSize, setSelectedSizes] = useState('');
  const [imagesArray, setImagesArray] = useState([]);

  const [productTitle, setProductTitle] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const body = useSelector((state) => state.adminProduct.product);

  const dispatch = useDispatch();
  const addMyProduct = () => {
    console.log('add product btn is clicked', imagesArray);
    const matchingEntry = colorsName.find(entry => Object.keys(entry)[0] === selectedColors);
    const actualColor = Object.values(matchingEntry)[0];
    const newProduct = {
      productName: productTitle,
      size: selectedSize,
      color: actualColor,
      price: productPrice,
      quantity: productStock,
      images: [...imagesArray]
    }
    console.log('new product is, ', newProduct);
    dispatch(addProduct({ newProduct }))
  }
  const editMyProduct = () => {
    console.log('edit product btn is clicked', imagesArray);
    const matchingEntry = colorsName.find(entry => Object.keys(entry)[0] === selectedColors) || '';
    const actualColor = Object.values(matchingEntry)[0] || '';
    const newProduct = {
      productName: productTitle,
      size: selectedSize,
      color: actualColor,
      price: productPrice,
      quantity: productStock,
      images: [...imagesArray],
      id: body._id

    }
    console.log('updated product is, ', newProduct);
    dispatch(editProduct({ newProduct }))
  }

  const toggleSize = (size) => {
    if (selectedSize === size) {
      setSelectedSizes('')
    } else {
      setSelectedSizes(size);
    }
  }
  const toggleColor = (color) => {
    if (selectedColors === color) {
      // setSelectedColors(selectedColors.filter((c) => c !== color))
      setSelectedColors('')
    } else {
      // setSelectedColors([...selectedColors, color])
      setSelectedColors(color)
      console.log('selected color is, ', color);
    }
  }
  const addFile = (files) => {
    console.log({ files });
    setImagesArray([...imagesArray, ...files]);
  }

  return (
            <div className='custom-offcanvas'>
        <Offcanvas className='custom-offcanvas' show= {true} placement='end' onHide= {() => dispatch(hideOffcanvas())} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{title} </Offcanvas.Title>
            </Offcanvas.Header>
                <Offcanvas.Body>
                  {body.productName ? body.productName : 'Product Name'}

                <div className='canvas-body'>
                  <div className='body-left'>
                    <div className='image-input'>
                      <Image className='cloud-image' src={CloudArrowUp}></Image>
                      {/* <p className='drag-files-text'>Drag & drop files here Or</p> */}
                      <input onChange={(e) => addFile(e.target.files)} type='file' id='fileInput' multiple />
                      <CustomButton type='file' value='Browse' variant='primary' size='sm'></CustomButton>
                        </div>
                      <p className='images-text'>multiple images can be upload</p>
                      <div className='images-div'>
                        { body.images
                          ? body.images.map((img, index) => {
                            return (
                          <Image className='product-image' key={index} src={`http://localhost:5000/${img}`}></Image>
                            )
                          })
                          : <p>add an image</p> }

                      </div>

                  </div>
                  <div className='body-right'>
                    <CustomInput
                    id= 'productName'
                    label='Product Name'
                    placeholder={body.productName ? body.productName : productName}
                    size='lg'
                    value = {productTitle}
                    onChange={ (e) => setProductTitle(e.target.value) }
                    />
                    Size
                      <div className='size-box'>
                        {sizes.map((s, index) => {
                          return (
                            <div key={index}
                            onClick={() => toggleSize(s)}
                            className={`sizes ${selectedSize === s ? 'selected' : ''} `}>
                          {s}

                        </div>
                          )
                        })}

                      </div>
                      Color
                      <div className='size-box'>
                          {colors.map((c, index) => {
                            return (
                              <div
                              className={`sizes ${selectedColors === c ? 'selected' : ''}`}
                              onClick={() => toggleColor(c)}
                               key={index}
                               >
                              <div key={index} className='color-box' style={{ 'background-color': c }} />

                              </div>

                            )
                          })}

                      </div>
                      <CustomInput
                      id='price'
                    label='Price'
                    placeholder= { body.price ? `$${body.price}` : price}
                    size='lg'
                    value = {productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}/>
                    <CustomInput
                    id='quantity'
                    label='Quantity'
                    placeholder= {body.quantity ? body.quantity : quantity}
                    size='lg'
                    value = {productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                     />
                    <div className='btn-position'>
                    <CustomButton
                    value={body._id ? 'Update' : 'Add'}
                    variant='primary'
                    size='lg'
                    onClick={body._id ? (e) => editMyProduct() : () => addMyProduct()}
                    />
                    </div>
                  </div>

                </div>
                </Offcanvas.Body>
        </Offcanvas>
                </div>

  )
}
CustomOffcanvas.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  body: PropTypes.any,
  hideOffcanvas: PropTypes.func,
  onClick: PropTypes.func,
  productName: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.string
}
export default CustomOffcanvas;
