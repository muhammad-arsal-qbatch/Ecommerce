import CustomTable from '../../../components/customTable';
import CustomCards from '../../../components/customCards';
import ShoppingCart from '../../../assets/images/shopping_cart.svg'
import CustomChart from '../../../components/chart';

import './adminDashboard.css';
import '../../../layout/layout.css'

const AdminDashboard = () => {
  const headings = [{
    id: 'title',
    label: 'Title',
    image: 'thumbnail',
    render: (img) => (<img src= {img} className='item-image' ></img>)
  }, {
    id: 'stock',
    label: 'Stock'
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
  const today = [
    { TotalProduct: '78' },
    { TotalOrders: '23' },
    { TotalUnits: '728' },
    { TotalSale: '19' }
  ];
  const sevenDays = [
    { TotalProduct: '78' },
    { TotalOrders: '23' },
    { TotalUnits: '728' },
    { TotalSale: '19' }
  ];
  const thirtyDays = [
    { TotalProduct: '78' },
    { TotalOrders: '23' },
    { TotalUnits: '728' },
    { TotalSale: '19' }
  ]

  return (
        <div className='main-box-admin'>
            <h4 className='dashboard-heading'>Dashboard</h4>
          <div className='cards-box'>
            <CustomCards imageSrc={ShoppingCart} cardHeading='Today' cardsText={today} quantityStyle= 'quantity-dashboard' heading5= 'heading5' ></CustomCards>
            <CustomCards imageSrc={ShoppingCart} cardHeading='7 Days' cardsText={sevenDays} quantityStyle= 'quantity-dashboard' heading5= 'heading5' ></CustomCards>
            <CustomCards imageSrc={ShoppingCart} cardHeading='30 Days' cardsText={thirtyDays} quantityStyle= 'quantity-dashboard' heading5= 'heading5' ></CustomCards>
            {/* <CustomCards heading5= 'heading5' ></CustomCards>
            <CustomCards heading5= 'heading5' ></CustomCards> */}

          </div>
          <div className='cards-box'>
            <CustomChart type='donut'/>
            <CustomChart type='donut'/>
            
          </div>
          <h6 className='top-products'>Top selling products</h6>
          <CustomTable pagination= { false } headings= {headings}/>

        </div>

  )
}

export default AdminDashboard;
