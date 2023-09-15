import PropTypes from 'prop-types';
import { Offcanvas, Image } from 'react-bootstrap';

import CloudArrowUp from '../../assets/images/cloud-arrow-up.svg';

import './offcanvas.css'
import CustomButton from '../button';
import CustomInput from '../inputField';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, hideOffcanvas } from '../../redux/slices/adminProduct';
import { useState } from 'react';
const CustomOffcanvas = ({
  title = 'Add new product',
  onClick,
  productName = 'Add Product Name',
  price = 'price',
  quantity = 'Quantity'
}) => {
  const handleEdit = () => {
    console.log('edit btn is clicked');
  }

  const colors = ['#155724', '#AAA', '#1B1E21', '#231579', '#740F0F'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  const [productTitle, setProductTitle] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const body = useSelector((state) => state.adminProduct.product);
  const dispatch = useDispatch();
  const addMyProduct = () => {
    console.log('add product btn is clicked', productTitle, productPrice, productStock);
    dispatch(addProduct({ title: productTitle, stock: productStock, price: productPrice }))
  }
  // const offcanvas = useSelector((state) => state.adminProduct.offcanvas);

  return (
            <div className='custom-offcanvas'>
        <Offcanvas className='custom-offcanvas' show= {true} placement='end' onHide= {() => dispatch(hideOffcanvas())} >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
                <Offcanvas.Body>
                  {body.title ? body.title : 'Product Name'}

                <div className='canvas-body'>
                  <div className='body-left'>
                    <div className='image-input'>
                      <Image className='cloud-image' src={CloudArrowUp}></Image>
                      <p className='drag-files-text'>Drag & drop files here Or</p>
                      <CustomButton value='Browse' variant='primary' size='sm'></CustomButton>
                        </div>
                      <p className='images-text'>multiple images can be upload</p>
                      <div className='images-div'>
                        { body.images
                          ? body.images.map((img, index) => {
                            return (
                          <Image className='product-image' key={index} src={img}></Image>
                            )
                          })
                          : <p>add an image</p> }

                      </div>

                  </div>
                  <div className='body-right'>
                    <CustomInput
                    id= 'productName'
                    label='Product Name'
                    placeholder={body.title ? body.title : productName}
                    size='lg'
                    value = {productTitle}
                    onChange={ (e) => setProductTitle(e.target.value) }
                    />
                    Size
                      <div className='size-box'>
                        {sizes.map((s, index) => {
                          return (
                            <div key={index} className='sizes'>
                          {s}

                        </div>
                          )
                        })}

                      </div>
                      Color
                      <div className='size-box'>
                          {colors.map((c, index) => {
                            return (
                              <div key={index} className='sizes'>
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
                    placeholder= {body.stock ? body.stock : quantity}
                    size='lg'
                    value = {productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                     />
                    <div className='btn-position'>
                    <CustomButton
                    value={body.id ? 'Update' : 'Add'}
                    variant='primary'
                    size='lg'
                    onClick={body.id ? (e) => handleEdit() : () => addMyProduct()}
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
