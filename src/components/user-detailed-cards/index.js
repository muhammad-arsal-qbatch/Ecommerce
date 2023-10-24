import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Image } from 'react-bootstrap';

import ColorsBox from '../colors-box';
import CustomInput from '../input-field';
import CustomButton from '../button';
import CustomTooltip from '../tooltip';
import { AddToCart } from '../../redux/slices/shopping-bag';

import './user-detailed-cards.css';

const UserDetailedCards = ({ singleCard }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authentication.token);
  const [smallImagesShow, setSmallImagesShow] = useState(0);
  const [largeImagesShow, setLargeImagesShow] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleSmallImageClick = (index) => {
    setLargeImagesShow(index);
  };

  const handlePrevious = () => {
    setSmallImagesShow((prev) => Math.max(prev - 2, 0));
  };

  const handleNext = () => {
    setSmallImagesShow((prev) =>
      Math.min(prev + 2, singleCard.images.length - 2)
    );
  };

  const addToCarts = (singleCard) => {
    const updatedCard = { ...singleCard };
    updatedCard.quantity = selectedQuantity;
    dispatch(AddToCart(updatedCard));
    navigate('/shoppingBag');
  };

  useEffect(() => {
    setSelectedQuantity(1);
  }, [singleCard]);
  return (
    <>
      <div className="user-detailed-card-body">
        <div className="card-head">
          <Image
            src={`http://localhost:5000/${
              singleCard.images[largeImagesShow] || singleCard.images[0]
            }`}
            className="card-image"
          ></Image>
          <div className="head-right">
            <div className="card-description">
              <CustomTooltip text={singleCard.productName}></CustomTooltip>
            </div>
            <ColorsBox colors={singleCard.color} text="Color"></ColorsBox>
            <ColorsBox colors={singleCard.size} text="Size"></ColorsBox>
            <div className="price-box">
              <span className="price-heading"> Price</span>
              <h4 className="price-text">${singleCard.price}</h4>
            </div>
          </div>
        </div>
        <div className="card-images-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            onClick={handlePrevious}
          >
            <path
              d="M8.96158 12.0005L14.6154 17.6543L15.4308 16.8389L10.5769 12.0005L15.4154 7.16202L14.6 6.34665L8.96158 12.0005Z"
              fill="black"
            />
          </svg>
          {singleCard.images
            .slice(smallImagesShow, smallImagesShow + 2)
            .map((s, index) => (
              <div key={index} className="image-box-user-detailed-cards">
                <img
                  key={index}
                  onClick={() => handleSmallImageClick(index + smallImagesShow)}
                  className="small-images"
                  src={`http://localhost:5000/${s}`}
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            onClick={handleNext}
          >
            <path
              d="M15.0384 12.0005L9.38465 17.6543L8.56927 16.8389L13.4231 12.0005L8.58465 7.16202L9.40002 6.34665L15.0384 12.0005Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="bottom">
          <span className="line"></span>
          <div className="quantity-box">
            <span className="price-heading">Quantity</span>
            <div className="container">
              <div className="row d-flex align-items-center">
                <div
                  onClick={
                    selectedQuantity < singleCard.quantity
                      ? () => {
                          setSelectedQuantity(selectedQuantity + 1);
                        }
                      : () => {}
                  }
                  className="col-1 btn  btn-secondary "
                >
                  +
                </div>
                <div className="col-7">
                  <CustomInput
                    readOnly={true}
                    value={selectedQuantity}
                    placeholder="02"
                  ></CustomInput>
                </div>
                <div
                  onClick={
                    selectedQuantity > 1
                      ? () => {
                          setSelectedQuantity(selectedQuantity - 1);
                        }
                      : () => {}
                  }
                  className=" col-1 btn btn-secondary"
                >
                  -
                </div>
              </div>
            </div>
          </div>
          {singleCard.quantity < 1
            ? (
            <CustomButton
              disabled={true}
              onClick={() => {
                addToCarts(singleCard);
              }}
              value="Add to Cart"
              variant="primary"
              size="lg"
            ></CustomButton>
              )
            : (
            <CustomButton
              onClick={
                token !== ''
                  ? () => {
                      addToCarts(singleCard);
                    }
                  : () => {
                      navigate('/login');
                    }
              }
              value="Add to Cart"
              variant="primary"
              size="lg"
            ></CustomButton>
              )}
        </div>
      </div>
    </>
  );
};

UserDetailedCards.propTypes = {
  singleCard: PropTypes.object
};

export default UserDetailedCards;
