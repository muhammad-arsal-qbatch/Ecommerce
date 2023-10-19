import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

import './chart.css';

const CustomChart = ({ type, currentOrders }) => {
  const ordersDelivered = currentOrders.filter(order => order.delivered === 'Delivered');
  const deliveredOrdersCount = ordersDelivered.length;
  const ordersNotDelivered = currentOrders.filter(order => order.delivered === 'Not Delivered');
  const notDeliveredOrdersCount = ordersNotDelivered.length;

  const [chartData] = useState({
    series: [deliveredOrdersCount, notDeliveredOrdersCount],
    options: {
      labels: ['Orders Delivered', 'Orders Not Delivered'],
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      }
    }
  });

  return (
    <div className="donut" style={{ height: '300px', width: '300px' }}>
      <h6 className="chart-heading">Orders overview</h6>
      <div className="chart-box" style={{ height: '300px', width: '300px' }}>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type={type}
          className="overview-chart"
          style={{ height: '100px', width: '300px' }}
        />
        <div className='single-label'>
          <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g filter="url(#filter0_d_1295_22424)">
            <circle cx="10" cy="8" r="5" fill="#5DDC6B" />
            <circle cx="10" cy="8" r="5" stroke="white" />
          </g>
          <defs>
            <filter
              id="filter0_d_1295_22424"
              x="0.5"
              y="0.5"
              width="19"
              height="19"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.075 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1295_22424"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1295_22424"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <p className="label-style">Orders Not Delivered</p>
        </div>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g filter="url(#filter0_d_1295_22433)">
    <circle cx="10" cy="8" r="5" fill="#5366FF"/>
    <circle cx="10" cy="8" r="5" stroke="white"/>
  </g>
  <defs>
    <filter id="filter0_d_1295_22433" x="0.5" y="0.5" width="19" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="2"/>
      <feGaussianBlur stdDeviation="2"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.075 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1295_22433"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1295_22433" result="shape"/>
    </filter>
  </defs>
</svg>
        <p className="label-style">Orders Delivered </p>
        </div>
        </div>
      </div>
    </div>
  );
};

CustomChart.propTypes = {
  type: PropTypes.string,
  currentOrders: PropTypes.any
};

export default CustomChart;
