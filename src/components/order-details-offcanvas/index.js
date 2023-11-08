import PropTypes from 'prop-types';
import moment from 'moment';
import { Offcanvas } from 'react-bootstrap';

import CustomTable from '../custom-table';

import './order-details-offcanvas.css';

const OrderDetailsOffcanvas = ({
  order,
  show,
  handleShow
}) => {
  const headings = [
    {
      id: 'productName',
      label: 'Title',
      image: 'thumbnail',
      render: (doc, id) => <> <img src = {doc.images[0] ? `http://localhost:5000/${doc.images[0]}` : '' } 
      className="item-image"></img> <>{doc.productName}</> </>
    },
    {
      id: 'quantity',
      label: 'Quantity',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    },
    {
      id: 'price',
      label: 'Price',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    }
  ];

  return (
    <Offcanvas
      className="custom-offcanvas"
      show={show}
      onHide={handleShow}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <h3>Order Details</h3>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="container">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col">OrderId</div>
                <div className="col">Name</div>
                <div className="col">Products</div>
                <div className="col">Status</div>
                <div className="col">Total Amount</div>
                <div className="col">Date</div>{' '}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col">{order.orderId}</div>
                <div className="col">{order.userName}</div>
                <div className="col">{order.totalQuantity}</div>
                <div className="col">{order.status}</div>
                <div className="col">{order.totalAmount}</div>
                <div className="col">{moment(order.date).format('ll')}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <h2>Product Information</h2>
          </div>
          <div className="row">
            <CustomTable
              pagination={false}
              headings={headings}
              data={order.products}
              getData={() => {}}
            />
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

OrderDetailsOffcanvas.propTypes = {
  order: PropTypes.any,
  show: PropTypes.bool,
  handleShow: PropTypes.func
};

export default OrderDetailsOffcanvas;
