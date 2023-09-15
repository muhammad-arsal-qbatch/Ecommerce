import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import FilterRectangle from '../../../components/filterRectangle'
import UserCards from '../../../components/userCards'
import { getData } from '../../../redux/slices/adminProduct'
import UserDetailedCards from '../../../components/userDetailedCards'

import './userHomepage.css'

const UserHomepage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.adminProduct.data);
  const [rightCard, showRightCard] = useState(false);
  const [singleCard, setSingleCard] = useState({});
  const displayRightCard = (id) => {
    console.log({ id });
    showRightCard(true);
    const card = data.find((obj) => obj.id === id);
    setSingleCard(card);
  }

  useEffect(
    () => {
      dispatch(getData());
    }
    , []
  )
  return (
        <div className='user-box'>
          <div>
        <FilterRectangle/>
        </div>
        <div className='products-listing'>
          <div className='lefts-box'>
            {data.map((obj, index) => (
              <UserCards cardData={obj} onClick={() => displayRightCard(obj.id)} key={index} />

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

  )
}
export default UserHomepage;
