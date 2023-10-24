import { Form, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Bin from '../../assets/images/delete-btn.svg';

import CustomInput from '../input-field';

import {
  UpdateCartItem,
  DeleteFromCart
} from '../../redux/slices/shopping-bag';

import './cartItems.css';

const CartItems = ({
  data,
  showCheckBox,
  showBin = true
}) => {
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(UpdateCartItem(data));
  };

  const deleteFromTheCart = (item) => {
    dispatch(DeleteFromCart(item));
  };

  return (
    <div className=" container mb-2">
      <div className=" row items-select-box pt-2 pb-2">
        <div style={{ backgroundColor: '' }} className="col-1">
          {showCheckBox
            ? (
            <Form.Check
              onChange={handleSelect}
              defaultChecked={data.selected}
              type="checkbox"
            />
              )
            : (
            <></>
              )}
        </div>
        <div className="cart-image-box col-2">
          <Image
            src={
              data.images.length === 0
                ? ''
                : `http://localhost:5000/${data.images[0]}`
            }
            style={{ width: '100px', height: '100px', flexShrink: '0' }}
          ></Image>
        </div>
        <div style={{ backgroundColor: '' }} className="col-6">
          <div className="container">
            <div className="row">
              <div className="col">{data.productName}</div>
            </div>
            <div className="row">
              <div className="col">
                <div
                  className="flex "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="21"
                    viewBox="0 0 22 21"
                    fill="none"
                  >
                    <g filter="url(#filter0_d_1295_19179)">
                      <circle cx="11" cy="8.5" r="6" fill={data.color} />
                      <circle cx="11" cy="8.5" r="6" stroke="white" />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_1295_19179"
                        x="0.5"
                        y="0"
                        width="21"
                        height="21"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="2" />
                        <feGaussianBlur stdDeviation="2" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.075 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1295_19179"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1295_19179"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                  {data.color}
                  {data.size}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: '' }} className="col-3">
          <div className="container-fluid justify-content-end ">
            <div className="row">
              <div className="col d-flex justify-content-end">
                {showBin
                  ? (
                  <Image
                    onClick={() => {
                      deleteFromTheCart(data);
                    }}
                    src={Bin}
                  ></Image>
                    )
                  : (
                  <></>
                    )}
              </div>
            </div>
            <div className="row">
              <div className="container-fluid">
                <div className="row d-flex align-items-center justify-content-end">
                  <div className="col-5">
                    <CustomInput
                      readOnly={true}
                      value={data.quantity}
                      placeholder="02"
                    ></CustomInput>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItems.propTypes = {
  data: PropTypes.any,
  showCheckBox: PropTypes.bool,
  showBin: PropTypes.bool
};

export default CartItems;
