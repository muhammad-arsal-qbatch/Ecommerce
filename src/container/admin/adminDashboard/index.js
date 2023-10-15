import CustomTable from '../../../components/customTable';
import CustomCards from '../../../components/customCards';
import ShoppingCart from '../../../assets/images/shopping_cart.svg'
import CustomChart from '../../../components/chart';
import { GetTopSellingProducts } from '../../../redux/slices/adminProduct';

import './adminDashboard.css';
import '../../../layout/layout.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const AdminDashboard = () => {
  // const data = useSelector((state) => state.adminProduct.data);
  const topSellingProducts = useSelector((state) => state.adminProduct.topSellingProducts);
  const loader = useSelector((state) => state.adminProduct.loader);
  const headings = [{
    id: 'productName',
    label: 'Product',
    image: 'thumbnail',
    render: (img) => (<img src= {img} className='item-image' ></img>)
  },
   {
    id: 'quantity',
    label: 'Stock'
  }, {
    id: 'totalSold',
    label: 'Units (sold)'
  }, {
    id: 'price',
    label: 'Amount'
  }];
  const today = [
    { TotalProduct: '1' },
    { TotalOrders: '23' },
    { TotalUnits: '728' },
    { TotalSale: '19' }
  ];
  const sevenDays = [
    { TotalProduct: '1' },
    { TotalOrders: '23' },
    { TotalUnits: '728' },
    { TotalSale: '19' }
  ];
  const thirtyDays = [
    { TotalProduct: '1' },
    { TotalOrders: '23' },
    { TotalUnits: '728' },
    { TotalSale: '19' }
  ]
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('asdsaasdasdsada');
    dispatch(GetTopSellingProducts());
    // dispatch(GetTopSellingProducts()) // mounting
    // return () => {
    //   console.log('Clean Up') // unmounting
    // }
  }, [])

  return (
        <div className='main-box-admin'>
            <h4 className='dashboard-heading'>Dashboard</h4>
          <div className='cards-box'>
            <CustomCards imageSrc={ShoppingCart} cardHeading='Today' cardsText={today} quantityStyle= 'quantity-dashboard' heading5= 'heading5' ></CustomCards>
            <CustomCards imageSrc={ShoppingCart} cardHeading='7 Days' cardsText={sevenDays} quantityStyle= 'quantity-dashboard' heading5= 'heading5' ></CustomCards>
            <CustomCards imageSrc={ShoppingCart} cardHeading='30 Days' cardsText={thirtyDays} quantityStyle= 'quantity-dashboard' heading5= 'heading5' ></CustomCards>

          </div>
          <div className='cards-box'>
            <CustomChart type='donut'/>
            <CustomChart type='donut'/>

          </div>
          <h6 className='top-products'>Top selling products</h6>
          {loader === true
            ? <div><Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner></div>

            : <CustomTable data={topSellingProducts} headings= {headings}/>
        }

        </div>

  )
}

export default AdminDashboard;
