import PropTypes from 'prop-types';
import { Card, CardImg } from 'react-bootstrap';

import CustomButton from '../button';

import './userCards.css';

const UserCards = ({
  onClick,
  cardData,
  showFullDescription = false
}) => {
  return (
    <>
      <Card
        style={{
          width: '18rem',
          minHeight: '418px',
          maxHeight: '520px',
          marginLeft: '4%',
          marginBottom: '2%'
        }}
      >
        <CardImg
          variant="top"
          src= {cardData.images[0] ? `http://localhost:5000/${cardData?.images[0]}` : '' }
          width="256px"
          height="222px"
        />
<Card.Body>
  <Card.Title> {cardData.productName} </Card.Title>
  <Card.Text>
    {showFullDescription
      ? (
      <p className="card-text">{cardData.description}</p>
        )
      : (
      <p className="card-text multiline-ellipsis">{cardData.description}</p>
        )}
    Price <span className="price-text">${cardData.price}</span>
  </Card.Text>
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    {cardData.quantity < 1
      ? (
      <CustomButton
        variant="outline-danger"
        value="Out of stock"
        size="sm"
        onClick={onClick}
      />
        )
      : (
      <CustomButton
        value="Details"
        size="sm"
        onClick={onClick}
        variant="primary"
      />
        )}
  </div>
</Card.Body>

      </Card>
    </>
  );
};

UserCards.propTypes = {
  onClick: PropTypes.func,
  cardData: PropTypes.object,
  showFullDescription: PropTypes.bool
};

export default UserCards;
