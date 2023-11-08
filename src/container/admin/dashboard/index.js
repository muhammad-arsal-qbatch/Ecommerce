import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { GetStats } from '../../../redux/slices/dashboard';

import CustomTable from '../../../components/custom-table';
import CustomCards from '../../../components/custom-cards';
import ShoppingCart from '../../../assets/images/shopping_cart.svg';
import CustomChart from '../../../components/chart';
import DashboardLineChart from '../../../components/line-chart'

import '../../../layout/layout.css';
import './adminDashboard.css';
import Loader from '../../../components/loader';
import { GetNotifications } from '../../../redux/slices/notification';

const AdminDashboard = () => {
  const stats = useSelector((state) => state.adminDashboard.stats);
  const statsLoader = useSelector((state) => state.adminDashboard.statsLoader);
  const ordersPaid = useSelector((state) => state.adminDashboard.stats?.ordersPaid) || 0;
  const ordersUnpaid = useSelector((state) => state.adminDashboard.stats?.ordersUnpaid) || 0;

  const headings = [
    {
      id: 'productName',
      label: 'Product',
      image: 'thumbnail',
      render: (doc, id) => <> <img src={`http://localhost:5000/${doc.images[0]}`}
      className="item-image" />{doc.productName} </>
    },
    {
      id: 'quantity',
      label: 'Stock',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )

    },
    {
      id: 'totalSold',
      label: 'Units (sold)',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    },
    {
      id: 'price',
      label: 'Amount',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    }
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetNotifications())
    dispatch(GetStats());
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
            cardsText={stats?.todayStats}
            quantityStyle="quantity-dashboard"
            heading5="heading5"
          ></CustomCards>
          <CustomCards
            imageSrc={ShoppingCart}
            cardHeading="7 Days"
            cardsText={stats?.sevenDayStats}
            quantityStyle="quantity-dashboard"
            heading5="heading5"
          ></CustomCards>
          <CustomCards
            imageSrc={ShoppingCart}
            cardHeading="30 Days"
            cardsText={stats?.thirtyDayStats}
            quantityStyle="quantity-dashboard"
            heading5="heading5"
          ></CustomCards>
        </>
          )
        : (
        <>
          <Loader />
        </>
          )}
    </div>
    <div className="charts-box" >

        <CustomChart ordersPaid={ordersPaid || 0} ordersUnpaid={ordersUnpaid || 0}/>
        <DashboardLineChart oneYearData= {stats?.oneYearStats}/>
    </div>
    <h6 className="top-products">Top selling products</h6>
    {statsLoader
      ? (
      <Loader />
        )
      : (
      <CustomTable data={stats?.topSellingProducts} headings={headings} />
        )}
  </div>
  );
};

export default AdminDashboard;
