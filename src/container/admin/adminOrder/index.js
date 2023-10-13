import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomCards from '../../../components/customCards';
import CustomInput from '../../../components/inputField';
import CustomTable from '../../../components/customTable';

import { DeliverOrder, getOrdersInGroup } from '../../../redux/slices/orders';
import './adminOrder.css';
import { Badge } from 'react-bootstrap';
import CustomButton from '../../../components/button';

const AdminOrder = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orders.orders);

  const [value, SetValue] = useState('');
  // useEffect(
  //   getData(),
  //   [])
  // const data= useSelector((state) => state.adminProduct.data);
  useEffect(
    () => {
      console.log('inside get order use effect')
      dispatch(getOrdersInGroup());
      console.log('orders is ,', data);
    }, []
  )
  const headings = [{
    id: 'date',
    label: 'Date',
    image: 'thumbnail',
    render: (img) => (<img src= {img} className='item-image' ></img>
    )
  },
  {
    id: 'orderId',
    label: 'Order#Id'
  }, {
    id: 'userName',
    label: 'User'
  }, {
    id: 'totalQuantity',
    label: 'Products'
  }, {
    id: 'totalAmount',
    label: 'Amount'
  }, {
    id: 'status',
    label: 'Status',
    render: (text) => (
      <Badge bg={text[0] === 'Paid' ? 'primary' : 'danger'}>{text}</Badge>
    )
  }, {
    id: 'action',
    label: 'Action',
    render: (order) => (
      order.delivered[0] === 'Delivered'
        ? <CustomButton
        size='sm'
      value='Ordered is Delivered'
      disabled={true}
      className='btn btn-outline-success' />
        : <CustomButton
        size='sm'
      value='Mark as Delivered'
      onClick={() => dispatch(DeliverOrder(order))}
      disabled={false}
      className='btn btn-outline-primary' />
    )
  }
  ];
  const totalOrders = [
    { TotalOrders: '78' }
  ]
  const totalUnits = [
    { TotalUnits: '45' }
  ]
  const totalAmount = [
    { TotalAmount: '$100,000' }
  ]
  return (
        <div className='main-box-admin'>
            <div className='cards-box'>
        <CustomCards cardsText={totalOrders} heading5= 'heading5' quantityStyle = 'quantity-order'></CustomCards>
        <CustomCards cardsText={totalUnits} heading5= 'heading5' quantityStyle = 'quantity-order'></CustomCards>
        <CustomCards cardsText={totalAmount} heading5= 'heading5' quantityStyle = 'quantity-order'></CustomCards>
        </div>
        <div className='order-searchbar'>
        <h4 className='orders-heading'>Orders</h4>
        <CustomInput value = {value}
        onChange={(e) => SetValue(e.target.value)}
        placeholder='Seach by phone name'></CustomInput>
        </div>
        <CustomTable pagination ={false} data={data} headings={headings}></CustomTable>
        </div>

  )
}
export default AdminOrder;
