import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

import FilterRectangle from '../../../components/filterRectangle';
import { clearError } from '../../../redux/slices/auth';
import UserCards from '../../../components/userCards';
import { getData } from '../../../redux/slices/adminProduct';
import UserDetailedCards from '../../../components/userDetailedCards';
import ErrorModal from '../../../components/errorModal';

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
    dispatch(getData({ limit: 100 }));
  }, []);
  return (
    <>
      {cn}
        <div className="user-box">
          <div>
            <FilterRectangle />
          </div>
          <div className="products-listing">
          {error ? <ErrorModal clearError={clearError} error={error} className="error-container" /> : <></>}
            {loader
              ? (
        <div style={{ margin: '400px' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
                )
              : <></>}
              {dataError
                ? (<p style={{ margin: '400px' }}>{dataError}</p>)

                : (
            <><div className="left-box">
                    {data.map((obj, index) => (
                      <UserCards
                        cardData={obj}
                        onClick={() => displayRightCard(obj._id)}
                        key={index} />
                    ))}
                  </div><div className="right-box">
                      {rightCard
                        ? (
                          <UserDetailedCards singleCard={singleCard}></UserDetailedCards>
                          )
                        : (
                          <></>
                          )}
                    </div></>
                  )
}
          </div>
        </div>
    </>
  );
};
UserHomepage.propTypes = {
  cn: PropTypes.any
};
export default UserHomepage;
