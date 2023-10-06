import { useSelector } from 'react-redux';
import CustomTable from '../../../components/customTable';
import { getOrders } from '../../../redux/slices/user/checkout';

const Orders = () => {
  const orders = useSelector((state) => state.checkout.orders);
  const headings = [{
    id: 'id',
    label: 'Id'
  }, {
    id: 'title',
    label: 'Title',
    image: 'thumbnail',
    render: (img) => (<img src= {img} className='item-image' ></img>)

  }, {
    id: 'brand',
    label: 'Brand'
  }, {
    id: 'category',
    label: 'Categoty'
  }, {
    id: 'stock',
    label: 'Stock'
  }];
  console.log('in ordersss page', { orders });
  return (
    <div className='container mt-5 orders-box'>
      <div className="row heading-style">
        <h3>Orders</h3>

      </div>
      <div className="row">

      <CustomTable data={orders} getData={getOrders} headings={headings} pagination={true}></CustomTable>
      </div>

    </div>
  )
}
export default Orders;
