import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { GetOrdersByUserId, GetOrders } from '../../../redux/slices/orders';

import { Badge } from 'react-bootstrap';

import CustomTable from '../../../components/custom-table';
import CustomButton from '../../../components/button';
import OrderDetailsOffcanvas from '../../../components/order-details-offcanvas';
import Loader from '../../../components/loader';
import moment from 'moment';

const Orders = () => {
  const [orderDetailsOffcanvas, setOrderDetailsOffcanvas] = useState(false);
  const orders = useSelector((state) => state.orders.orders);
  const loader = useSelector((state) => state.orders.loader);
  const currentUser = useSelector((state) => state.authentication.currentUser);
  const [singleOrder, setSingleOrder] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetOrders({ userId: currentUser.userId }));
  }, []);

  const headings = [
    {
      id: 'orderId',
      label: 'Order#',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    },
    {
      id: 'userName',
      label: 'Name',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    },
    {
      id: 'totalQuantity',
      label: 'Products',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    },
    {
      id: 'status',
      label: 'Status',
      render: (doc, id) => (
        <Badge bg={ doc[id] === 'Paid' ? 'success' : 'warning' }>{ doc[id] }</Badge>
      )
    },
    {
      id: 'totalAmount',
      label: 'Amount',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    },
    {
      id: 'date',
      label: 'Date',
      render: (doc, id) => (
        <>{ moment(doc[id]).format('ll') }</>
      )
    },
    {
      id: 'action',
      label: 'Actions',
      render: (doc, id) => (
        <CustomButton
          value="View details"
          onClick={() => {
            setSingleOrder(doc);
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
            {}
            {loader
              ? <Loader />
              : <>

        <CustomTable
          data={orders}
          getData={GetOrdersByUserId}
          headings={headings}
          pagination={false}
        ></CustomTable>
              </>
            }

      </div>
    </div>
  );
};

export default Orders;
