import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { ClearError } from '../../../redux/slices/auth';

import { Spinner } from 'react-bootstrap';

import FilterRectangle from '../../../components/filter-rectangle';
import UserCards from '../../../components/userCards';
import { GetData } from '../../../redux/slices/admin-product';
import UserDetailedCards from '../../../components/user-detailed-cards';
import ErrorModal from '../../../components/error-modal';

import './userHomepage.css';

const UserHomepage = ({ cn }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminProduct.data);
  const loader = useSelector((state) => state.adminProduct.loader);
  const error = useSelector((state) => state.authentication.error);
  const dataError = useSelector((state) => state.adminProduct.error);
  const [rightCard, showRightCard] = useState(false);
  const [singleCard, setSingleCard] = useState({});

  const displayRightCard = (id) => {
    showRightCard(true);
    const card = data.find((obj) => obj._id === id);
    setSingleCard(card);
  };

  useEffect(() => {
    dispatch(GetData({ limit: 100 }));
  }, []);

  return (
    <>
      {cn}
      <div className="user-box">
        <div>
          <FilterRectangle />
        </div>
        <div className="products-listing">
          {error
            ? (
            <ErrorModal
              clearError={ClearError}
              error={error}
              className="error-container"
            />
              )
            : (
            <></>
              )}
          {loader
            ? (
            <div style={{ margin: '400px' }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
              )
            : (
            <>
            {dataError
              ? (
            <p style={{ margin: '400px' }}>{dataError}</p>
                )
              : (
            <>
              <div className="left-box">
                {data.map((obj, index) => (
                  <UserCards
                    cardData={obj}
                    onClick={() => displayRightCard(obj._id)}
                    key={index}
                  />
                ))}
              </div>
              <div className="right-box">
                {rightCard
                  ? (
                  <UserDetailedCards
                    singleCard={singleCard}
                  ></UserDetailedCards>
                    )
                  : (
                  <></>
                    )}
              </div>
            </>
                )}

            </>

              )}
        </div>
      </div>
    </>
  );
};

UserHomepage.propTypes = {
  cn: PropTypes.any
};

export default UserHomepage;
