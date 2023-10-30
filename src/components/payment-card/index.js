import PropTypes from 'prop-types';

const PaymentCard = ({ cardDetails }) => {
  return (
    <div className="col-10">
      <div className=" m-2 payment-card container">
        <div className="row m-2">
          <div className="col-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="34"
              viewBox="0 0 51 34"
              fill="none"
            >
              <path
                d="M46.75 0H4.25C1.90279 0 0 1.90279 0 4.25V29.75C0 32.0972 1.90279 34 4.25 34H46.75C49.0972 34 51 32.0972 51 29.75V4.25C51 1.90279 49.0972 0 46.75 0Z"
                fill="#252525"
              />
              <path
                d="M19.125 27.625C24.993 27.625 29.75 22.868 29.75 17C29.75 11.132 24.993 6.375 19.125 6.375C13.257 6.375 8.5 11.132 8.5 17C8.5 22.868 13.257 27.625 19.125 27.625Z"
                fill="#EB001B"
              />
              <path
                d="M31.875 27.625C37.743 27.625 42.5 22.868 42.5 17C42.5 11.132 37.743 6.375 31.875 6.375C26.007 6.375 21.25 11.132 21.25 17C21.25 22.868 26.007 27.625 31.875 27.625Z"
                fill="#F79E1B"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.5 8.49902C28.0807 10.4375 29.75 13.5237 29.75 16.9998C29.75 20.4759 28.0807 23.5621 25.5 25.5006C22.9193 23.5621 21.25 20.4759 21.25 16.9998C21.25 13.5237 22.9193 10.4375 25.5 8.49902Z"
                fill="#FF5F00"
              />
            </svg>
          </div>
          <div className="col-9">{cardDetails.brand}</div>
        </div>
        <div className="row m-2">
          <div className="col">**** **** **** {cardDetails.cardNumber}</div>
        </div>
        <div className="row m-2">
          <div className="col">{cardDetails.exp_month}/{cardDetails.exp_year}</div>
        </div>
        <div className="row m-2">
          <div className="col">{cardDetails.customerName}</div>
        </div>
      </div>
    </div>
  );
};

PaymentCard.propTypes = {
  cardDetails: PropTypes.any
};

export default PaymentCard;
