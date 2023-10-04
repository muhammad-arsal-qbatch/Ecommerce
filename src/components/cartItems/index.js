import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Checkbox from '../../assets/images/Checkbox.svg'
import Bin from '../../assets/images/delete-btn.svg';
import IncDecBtns from '../../components/incDecBtns';

import './cartItems.css'

const CartItems = ({ data }) => {
  return (
    <div className=' container mb-2'>
      <div className=' row items-select-box pt-2 pb-2'>
        <div style={{ backgroundColor: '' }} className='col-1'>
        <Image src={Checkbox}></Image>
        </div>
        <div className='image-box col-2' >
        <Image src={data.thumbnail} style={{ width: '100px', height: '100px', flexShrink: '0' }}></Image>
        </div>
        <div style={{ backgroundColor: '' }} className='col-7'>
          <div className='container'>
            <div className='row'>
              <div className='col'>{data.description}</div>
            </div>
            <div className='row'>
              <div className='col'>
              <div style={{ display: 'inline-flex', gap: '10px', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
  <g filter="url(#filter0_d_1295_19179)">
    <circle cx="11" cy="8.5" r="6" fill="#BA885B"/>
    <circle cx="11" cy="8.5" r="6" stroke="white"/>
  </g>
  <defs>
    <filter id="filter0_d_1295_19179" x="0.5" y="0" width="21" height="21" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="2"/>
      <feGaussianBlur stdDeviation="2"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.075 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1295_19179"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1295_19179" result="shape"/>
    </filter>
  </defs>
</svg>
Brown
<span>XL</span>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: '' }} className='col-2'>
          <div className='container-fluid d-flex-column justify-content-end '>
            <div className='row'>
              <div className='col d-flex justify-content-end'>
              <Image src={Bin}></Image>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
              <IncDecBtns></IncDecBtns>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

CartItems.propTypes = {
 data: PropTypes.any
}

export default CartItems;
