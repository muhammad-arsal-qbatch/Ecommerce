import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { GetOrdersByUserId, GetOrders } from '../../../redux/slices/orders';

import { Badge } from 'react-bootstrap';

import CustomTable from '../../../components/custom-table';
import CustomButton from '../../../components/button';
import OrderDetailsOffcanvas from '../../../components/order-details-offcanvas';

const Orders = () => {
  const [orderDetailsOffcanvas, setOrderDetailsOffcanvas] = useState(false);
  const orders = useSelector((state) => state.orders.orders);
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const [singleOrder, setSingleOrder] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetOrders({ userId: currentUser._id }));
  }, []);

  const headings = [
    {
      id: 'orderId',
      label: 'Order#'
    },
    {
      id: 'userName',
      label: 'Name'
    },
    {
      id: 'totalQuantity',
      label: 'Products'
    },
    {
      id: 'status',
      label: 'Status',
      render: (text) => (
        <Badge bg={text === 'Paid' ? 'success' : 'warning'}>{text}</Badge>
      )
    },
    {
      id: 'totalAmount',
      label: 'Amount'
    },
    {
      id: 'date',
      label: 'Date'
    },
    {
      id: 'action',
      label: 'Actions',
      render: (order) => (
        <CustomButton
          value="View details"
          onClick={() => {
            setSingleOrder(order);
            setOrderDetailsOffcanvas(true);
          }}
        ></CustomButton>
      )
    }
  ];

  return (
    <div className="container mt-5 orders-box">
      <div className="row heading-style">
        <h3>Orders</h3>
      </div>
      <div className="row">
        {orderDetailsOffcanvas
          ? (
          <OrderDetailsOffcanvas
            handleShow={() => {
              setOrderDetailsOffcanvas(false);
            }}
            show={orderDetailsOffcanvas}
            order={singleOrder}
          ></OrderDetailsOffcanvas>
            )
          : (
          <></>
            )}

        <CustomTable
          data={orders}
          getData={GetOrdersByUserId}
          headings={headings}
          pagination={false}
        ></CustomTable>
      </div>
    </div>
  );
};

export default Orders;
