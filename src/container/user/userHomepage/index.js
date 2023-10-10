import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import FilterRectangle from '../../../components/filterRectangle'
import UserCards from '../../../components/userCards'
import { getData } from '../../../redux/slices/adminProduct'
import UserDetailedCards from '../../../components/userDetailedCards'
import ErrorModal from '../../../components/errorModal';
import PropTypes from 'prop-types';

import './userHomepage.css'

const UserHomepage = ({ cn }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminProduct.data);
  const error = useSelector((state) => state.authentication.error);
  const [rightCard, showRightCard] = useState(false);
  const [singleCard, setSingleCard] = useState({});
  const displayRightCard = (id) => {
    console.log({ id });
    showRightCard(true);
    const card = data.find((obj) => obj._id === id);
    setSingleCard(card);
  }

  useEffect(
    () => {
      console.log('error message', error);
      dispatch(getData());
    }
    , []
  )
  return (
    <>
    {cn}

        <div className='user-box'>
        {error
          ? <ErrorModal
          error={error}
          />
          : <></>
    }
          <div>
        <FilterRectangle/>
        </div>
        <div className='products-listing'>
          <div className='left-box'>
            {data.map((obj, index) => (
              <UserCards cardData={obj} onClick={() => displayRightCard(obj._id)} key={index} />

            ))}
          </div>
          <div className='right-box'>
            {rightCard
              ? <UserDetailedCards singleCard={singleCard} ></UserDetailedCards>
              // <UserCards showFullDescription= {true} cardData={singleCard} ></UserCards>

              : <></>
            }
          </div>

        </div>
        </div>
        </>

  )
}
UserHomepage.propTypes = {
  cn: PropTypes.any
}
export default UserHomepage;
