import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import OrdersPaid from '../../assets/images/Orders-Paid.svg';
import PropTypes from 'prop-types';
import './line-chart.css';

export default function DashboardLineChart ({ oneYearData }) {
  const monthNameMap = {
    1: 'Jan',
    2: 'Feb',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'Aug',
    9: 'Sept',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  };
  // Create an array with objects for each month, including months with 0 orders and sales
  const allMonthsData = Array.from({ length: 12 }, (_, i) => {
    const monthNumber = i + 1;
    const monthName = monthNameMap[monthNumber];
    const dataForMonth = oneYearData?.find((data) => data.name === monthNumber) || { name: monthName, orders: 0, sales: 0 };
    return {
      name: monthName,
      orders: dataForMonth.orders,
      sales: dataForMonth.sales
    };
  });
  const sortedData = allMonthsData.sort((a, b) => a.name - b.name);
  console.log(allMonthsData);
  return (
    <div className='d-flex flex-column' >
    <h6 className="chart-heading">Sales & Orders report</h6><div className="dashboard-line-chart-main-div">

      <div className="p-4 dashboard-line-chart-text">
        <img src={OrdersPaid} alt="Orders Paid Icon" />
        <span className="me-2">Sales</span>
        <img src={OrdersPaid} alt="Orders Unpaid Icon" />
        <span className="">Orders</span>
      </div>
      <LineChart
        width={653}
        height={227}
        data={sortedData}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="sales"
          stroke="rgba(0, 123, 255, 1)" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="orders"
          stroke="rgba(230, 86, 0, 1)" />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
      </LineChart>
    </div>
    </div>
  );
};

DashboardLineChart.propTypes = {
  oneYearData: PropTypes.any
};
