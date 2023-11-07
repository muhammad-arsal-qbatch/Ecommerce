import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Spinner } from 'react-bootstrap';
import moment from 'moment';

import CustomTable from '../../../components/custom-table';

import {
  DeliverOrder,
  ClearError,
  GetOrders
} from '../../../redux/slices/orders';

import CustomButton from '../../../components/button';
import ErrorModal from '../../../components/error-modal';

import './adminOrder.css';

const AdminOrder = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orders.orders);
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const loader = useSelector((state) => state.orders.loader);

  useEffect(() => {
    dispatch(GetOrders({ sortingObj: { orderId: -1 } }));
  }, [status]);

  let totalUnits = 0;
  let totalAmount = 0;

  data?.forEach((singleData, index) => {
    totalUnits += singleData.totalQuantity;
    totalAmount += singleData.totalAmount;
  });

  const ordersStats = [
    { TotalOrders: data?.length },
    { TotalUnits: totalUnits },
    { TotalAmount: totalAmount }
  ];

  const headings = [
    {
      id: 'date',
      label: 'Date',
      image: 'thumbnail',
      render: (doc, id) => (
        <>
        {moment(doc[id]).format('ll')}
        </>
      )
    },
    {
      id: 'orderId',
      label: 'Order#Id',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    },
    {
      id: 'userName',
      label: 'User',
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
      id: 'totalAmount',
      label: 'Amount',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    },
    {
      id: 'status',
      label: 'Status',
      render: (doc, id) => (
        <Badge bg={doc[id] === 'Paid' ? 'primary' : 'danger'}>{doc[id]}</Badge>
      )
    },
    {
      id: 'action',
      label: 'Action',
      render: (order) =>
        order.delivered === 'Delivered'
          ? (
          <CustomButton
            size="sm"
            value="Ordered is Delivered"
            disabled={true}
            className="btn btn-outline-success"
          />
            )
          : (
          <CustomButton
            size="sm"
            value="Mark as Delivered"
            onClick={() => {
              dispatch(DeliverOrder(order));
            }}
            disabled={false}
            className="btn btn-outline-primary"
          />
            )
    }
  ];

  return (
    <div className="main-box-admin">
      <div className="cards-box">
        {error ? <ErrorModal error={error} clearError={ClearError} /> : <></>}
        {ordersStats.map((box, index) => (
          <div key={index} className="orders-box">
            {Object.keys(box).map((key) => (
              <div key={key}>
                <p>{key}</p>
                <h4 className="orders-text">{box[key]}</h4>
              </div>
            ))}
          </div>
        ))}
      </div>
      {loader
        ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
          )
        : (
        <CustomTable
          pagination={false}
          data={data || [] }
          headings={headings || []}
        ></CustomTable>
          )}
    </div>
  );
};

export default AdminOrder;
