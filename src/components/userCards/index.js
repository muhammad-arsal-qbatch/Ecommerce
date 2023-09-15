import { Card, CardImg } from 'react-bootstrap'
import CustomButton from '../button';
import PropTypes from 'prop-types'

import './userCards.css'
const UserCards = ({ onClick, cardData, showFullDescription = false }) => {
  return (
      <>
          {/* <div className='card-style'> */}
      <Card style={{ width: '18rem', minHeight: '418px', maxHeight: '520px', marginLeft: '4%', marginBottom: '2%' }}>
            <CardImg variant='top' src= {cardData.thumbnail} width='256px' height='222px'></CardImg>
      <Card.Body>
        <Card.Title> {cardData.title} </Card.Title>
        <Card.Text>
          {showFullDescription
            ? <h6 className='card-text '>
          {cardData.description}
          </h6>
            : <h6 className='card-text multiline-ellipsis'>
          {cardData.description}
          </h6>
          }
          Price <span className='price-text' >${cardData.price}</span>
        </Card.Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {cardData.stock < 50
          ? <CustomButton variant='outline-danger' value='Out of stock' size='sm' onClick={onClick}></CustomButton>

          : <CustomButton value='Details' size='sm' onClick={onClick} variant="primary"></CustomButton>
        }
        </div>
      </Card.Body>
    </Card>
    {/* </div> */}
    </>

  )
}
UserCards.propTypes = {
  onClick: PropTypes.func,
  cardData: PropTypes.object,
  showFullDescription: PropTypes.bool
}
export default UserCards;
