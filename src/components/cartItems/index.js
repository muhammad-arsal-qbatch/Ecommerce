import { Col, Container, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Checkbox from '../../assets/images/Checkbox.svg'
import Bin from '../../assets/images/delete-btn.svg';
import IncDecBtns from '../../components/incDecBtns';

import './cartItems.css'

const CartItems = ({ data }) => {
  return (
    <Container className='mb-2 ms-4  '>
      <Row className='items-select-box'>
        <Col style={{ backgroundColor: '' }} xs='1'>
        <Image src={Checkbox}></Image>
        </Col>
        <Col style={{ backgroundColor: '' }} xs='2' >
        <Image src={data.thumbnail} style={{ width: '100px', height: '100px', flexShrink: '0' }}></Image></Col>
        <Col style={{ backgroundColor: '' }} xs='7'>
          <Container>
            <Row>
              <Col>{data.description}</Col>
            </Row>
            <Row>
              <Col>
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
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </Col>
        <Col style={{ backgroundColor: '' }} xs='2'>
          <Container>
            <Row>
              <Col xs='7'></Col>
              <Col>
              <Image src={Bin}></Image>
              </Col>
            </Row>
            <Row>
              <Col>
              <IncDecBtns></IncDecBtns>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

    </Container>
  )
}

CartItems.propTypes = {
 data: PropTypes.any
}

export default CartItems;
