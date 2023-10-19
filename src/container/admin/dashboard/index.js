import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import { GetTopSellingProducts } from '../../../redux/slices/admin-product';
import { GetStats, getOrders } from '../../../redux/slices/orders';

import CustomTable from '../../../components/custom-table';
import CustomCards from '../../../components/custom-cards';
import ShoppingCart from '../../../assets/images/shopping_cart.svg';
import CustomChart from '../../../components/chart';

import '../../../layout/layout.css';
import './adminDashboard.css';

const AdminDashboard = () => {
  const topSellingProducts = useSelector(
    (state) => state.adminProduct.topSellingProducts
  );

  const loader = useSelector((state) => state.adminProduct.loader);
  const stats = useSelector((state) => state.orders.stats);
  const statsLoader = useSelector((state) => state.orders.statsLoader);
  const currentOrders = useSelector((state) => state.orders.orders);

  const headings = [
    {
      id: 'productName',
      label: 'Product',
      image: 'thumbnail',
      render: (img) => <img src={img} className="item-image"></img>
    },
    {
      id: 'quantity',
      label: 'Stock'
    },
    {
      id: 'totalSold',
      label: 'Units (sold)'
    },
    {
      id: 'price',
      label: 'Amount'
    }
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetStats());
    dispatch(GetTopSellingProducts());
    dispatch(getOrders({ sortingObj: { orderId: -1 } }));
  }, []);

  return (
    <div className="main-box-admin">
      <h4 className="dashboard-heading">Dashboard</h4>
      <div className="cards-box">
        {statsLoader === false
          ? (
          <>
            <CustomCards
              imageSrc={ShoppingCart}
              cardHeading="Today"
              cardsText={stats.todayStats}
              quantityStyle="quantity-dashboard"
              heading5="heading5"
            ></CustomCards>
            <CustomCards
              imageSrc={ShoppingCart}
              cardHeading="7 Days"
              cardsText={stats.sevenDayStats}
              quantityStyle="quantity-dashboard"
              heading5="heading5"
            ></CustomCards>
            <CustomCards
              imageSrc={ShoppingCart}
              cardHeading="30 Days"
              cardsText={stats.thirtyDayStats}
              quantityStyle="quantity-dashboard"
              heading5="heading5"
            ></CustomCards>
          </>
            )
          : (
          <>
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </>
            )}
      </div>
      <div className="charts-box" >
        {currentOrders.length
          ? (
          <CustomChart currentOrders={currentOrders} type="donut" />
            )
          : (
          <></>
            )}
      </div>
      <h6 className="top-products">Top selling products</h6>
      {loader === true
        ? (
        <div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
          )
        : (
        <CustomTable data={topSellingProducts} headings={headings} />
          )}
    </div>
  );
};

export default AdminDashboard;
