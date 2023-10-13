import PropTypes from 'prop-types';
import { Offcanvas } from 'react-bootstrap';

import CustomTable from '../../components/customTable';

const OrderDetailsOffcanvas = ({
  order,
  show,
  handleShow
}) => {
  console.log('orders in offcanvas is, ', order.products)

  const headings = [{
  //   id: 'productName',
  //   label: 'Title',
  //   image: 'thumbnail',
  //   render: (img) => (<img src= {img} className='item-image' ></img>)
  // }, {
    id: 'quantity',
    label: 'Quantity'
  } 
  // {
   // id: 'price',
  //   label: 'Price'
  // }
];
  return (
    <Offcanvas show={ show } onHide={ handleShow } placement='end'>
      <Offcanvas.Header>
        <h3>Order Details</h3>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className='container'>
          <div className='row'>
            <div className='container'>
              <div className='row'>
                <div className='col'>{order.orderId}</div>
                <div className='col'>{order.userName}</div>
                <div className='col'>{order.totalQuantity}</div>
                <div className='col'>{order.status}</div>
                <div className='col'>{order.totalAmount}</div>
                <div className='col'>{order.date}</div>
              </div>
            </div>
          </div>
          <div className='row'>
            <h2>Product Information</h2>
          </div>
          <div className='row'>
            <CustomTable pagination={false} headings={headings} data={order.products} getData={() => {}}/>
          </div>
        </div>

      </Offcanvas.Body>
    </Offcanvas>

  )
}
OrderDetailsOffcanvas.propTypes = {
  order: PropTypes.any,
  show: PropTypes.bool,
  handleShow: PropTypes.func
}

export default OrderDetailsOffcanvas;
