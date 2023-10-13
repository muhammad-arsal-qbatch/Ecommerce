import { useSelector } from 'react-redux';
import CustomTable from '../../../components/customTable';
// import { getOrders } from '../../../redux/slices/user/checkout';
import { GetOrdersByUserId } from '../../../redux/slices/orders';
// import { useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import { useState } from 'react';
import CustomButton from '../../../components/button';
import OrderDetailsOffcanvas from '../../../components/order-details-offcanvas';

const Orders = () => {
  const [orderDetailsOffcanvas, setOrderDetailsOffcanvas] = useState(false);
  const orders = useSelector((state) => state.orders.orders);
  const [singleOrder, setSingleOrder] = useState({});
  const headings = [{
    id: 'orderId',
    label: 'Order#'
  }, {
    id: 'userName',
    label: 'Name'
  }, {
    id: 'totalQuantity',
    label: 'Products'
  }, {
    id: 'status',
    label: 'Status',
    render: (text) => (
      <Badge bg={text === 'Paid' ? 'success' : 'warning'}>{text}</Badge>
    )
  }, {
    id: 'totalAmount',
    label: 'Amount'
  }, {
    id: 'date',
    label: 'Date'
  }, {
    id: 'action',
    label: 'Actions',
    render: (order) => (
      <CustomButton value='View details' onClick={ () => {
        setSingleOrder(order)
        setOrderDetailsOffcanvas(true);
      }
      } ></CustomButton>
    )
  }
  ];
  console.log('in ordersss page', { orders });
  return (
    <div className='container mt-5 orders-box'>
      <div className="row heading-style">
        <h3>Orders</h3>

      </div>
      <div className="row">
        {orderDetailsOffcanvas
          ? <OrderDetailsOffcanvas
          handleShow={ () => setOrderDetailsOffcanvas(true) }
           show={orderDetailsOffcanvas} order={singleOrder}></OrderDetailsOffcanvas>
          : <></>
        }

      <CustomTable data={orders} getData={GetOrdersByUserId} headings={headings} pagination={false}></CustomTable>
      </div>

    </div>
  )
}
export default Orders;
