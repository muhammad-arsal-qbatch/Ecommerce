import { useSelector } from 'react-redux';
import CustomTable from '../../../components/customTable';
// import { getOrders } from '../../../redux/slices/user/checkout';
import { GetOrdersByUserId } from '../../../redux/slices/orders';
// import { useEffect } from 'react';
import { Badge } from 'react-bootstrap';

const Orders = () => {
  const orders = useSelector((state) => state.orders.orders);
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
  }
];
  console.log('in ordersss page', { orders });
  return (
    <div className='container mt-5 orders-box'>
      <div className="row heading-style">
        <h3>Orders</h3>

      </div>
      <div className="row">

      <CustomTable data={orders} getData={GetOrdersByUserId} headings={headings} pagination={true}></CustomTable>
      </div>

    </div>
  )
}
export default Orders;
