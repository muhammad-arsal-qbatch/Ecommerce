import { useEffect, useState } from 'react';
import CustomCards from '../../../components/customCards';
import CustomTable from '../../../components/customTable';
import CustomInput from '../../../components/inputField';
import './adminOrder.css';
import { getData, getOrder } from '../../../redux/slices/adminProduct';
import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';

const AdminOrder = () => {
  const dispatch = useDispatch();
  const [value, SetValue] = useState('');
  // useEffect(
  //   getData(),
  //   [])
  // const data= useSelector((state) => state.adminProduct.data);
  useEffect(
    () => {
      console.log('inside get order use effect')
      console.log(value)
      if (value === '') {
        dispatch(getData())
      } else {
        dispatch(getOrder({ order: value }))
      }
    }
    , [value]
  )
  useEffect(
    () => {
      dispatch(getData());
    },
    []
  )
  const headings = [{
    id: 'title',
    label: 'Title',
    image: 'thumbnail',
    render: (img) => (<img src= {img} className='item-image' ></img>)
  }, {
    id: 'category',
    label: 'Category'
  }, {
    id: 'brand',
    label: 'Brand'
  }, {
    id: 'price',
    label: 'Prize'
  }, {
    id: 'stock',
    label: 'Stock'
  }];
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
        <div className='main-box'>
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
        <CustomTable headings={headings}></CustomTable>
        </div>

  )
}
export default AdminOrder;
