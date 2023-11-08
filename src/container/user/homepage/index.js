import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { ClearError } from '../../../redux/slices/auth';

import { Spinner } from 'react-bootstrap';

import FilterRectangle from '../../../components/filter-rectangle';
import UserCards from '../../../components/user-cards';
import { GetData, GetDataLength } from '../../../redux/slices/products';
import UserDetailedCards from '../../../components/user-detailed-cards';
import ErrorModal from '../../../components/error-modal';

import './userHomepage.css';
import { GetNotifications } from '../../../redux/slices/notification';

const UserHomepage = ({ cn }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminProduct?.data) || [];
  const productsLength = useSelector((state) => state.adminProduct?.productsLength) || 0;
  const loader = useSelector((state) => state.adminProduct.loader);
  const error = useSelector((state) => state.authentication.error);
  const dataError = useSelector((state) => state.adminProduct.error);
  const [rightCard, showRightCard] = useState(false);
  const [singleCard, setSingleCard] = useState({});
  const [limit, setLimit] = useState(10);

  const displayRightCard = (id) => {
    showRightCard(true);
    const card = data.find((obj) => obj._id === id);
    setSingleCard(card);
  };
  const handleInifiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 10 >= document.documentElement.offsetHeight

      ) {
        setLimit((prev) => prev + 10);
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    console.log('limit and prodcuts length', limit, productsLength);
    if (limit - 10 < productsLength) {
      console.log('i am not called');
      dispatch(GetData({ offset: 0, limit }));
    }
  }, [limit]);

  useEffect(() => {
    console.log('i am called');
    dispatch(GetData({ offset: 0, limit }));
    dispatch(GetNotifications())
    dispatch(GetDataLength());
    window.addEventListener('scroll', handleInifiniteScroll);
    return () => window.removeEventListener('scroll', handleInifiniteScroll);
  }, [])

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
                {data?.map((obj, index) => (
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
