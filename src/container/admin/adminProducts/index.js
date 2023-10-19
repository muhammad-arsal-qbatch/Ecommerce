import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Pagination } from 'react-bootstrap';

import CustomTable from '../../../components/customTable';
import { clearError, getData } from '../../../redux/slices/adminProduct';

import Products from '../../../components/products';
import ErrorModal from '../../../components/errorModal';

import './adminProducts.css';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const data = useSelector((state) => state.adminProduct.data);
  const error = useSelector((state) => state.adminProduct.error);
  useEffect(() => {
    dispatch(getData(offset));
  }, [offset]);

  const headings = [
    {
      id: 'title',
      label: 'Title',
      image: 'thumbnail',
      render: (doc) => (
        <img
          src={`http://localhost:5000/${doc.images[0]}`}
          className="item-image"
        ></img>
      )
    },
    {
      id: 'size',
      label: 'Size'
    },
    {
      id: 'color',
      label: 'Color'
    },
    {
      id: 'price',
      label: 'Price'
    },
    {
      id: 'quantity',
      label: 'Stock'
    },
    {
      id: 'actions',
      label: 'Actions'
    }
  ];

  return (
    <div className="main-box-admin">
      {error
        ? (
        <ErrorModal clearError={clearError} error={error} />
          )
        : (
        <>
          <Products />

          <CustomTable data={data} pagination={false} headings={headings} />
          <div className="pagination">
            <Pagination>
              <Pagination.Item
                disabled={offset <= 0}
                onClick={() => {
                  setOffset(offset - 1);
                }}
              >
                {'Previous'}
              </Pagination.Item>
              <Pagination.Item
                onClick={() => {
                  setOffset(offset + 1);
                }}
              >
                {offset + 1}
              </Pagination.Item>
              <Pagination.Item
                onClick={() => {
                  setOffset(offset + 2);
                }}
              >
                {offset + 2}
              </Pagination.Item>
              <Pagination.Item
                onClick={() => {
                  setOffset(offset + 3);
                }}
              >
                {offset + 3}
              </Pagination.Item>
              <Pagination.Item
                disabled={offset >= 9}
                onClick={() => setOffset(offset + 1)}
              >
                {'Next'}
              </Pagination.Item>
            </Pagination>
          </div>
        </>
          )}
    </div>
  );
};

export default AdminProducts;
