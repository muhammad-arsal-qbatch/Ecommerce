import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Pagination, Image } from 'react-bootstrap';

import CustomTable from '../../../components/custom-table';
import { GetData, GetDataLength, DisplayModal, ShowOffcanvas } from '../../../redux/slices/products';
import DeleteBtn from '../../../assets/images/delete-btn.svg';
import EditBtn from '../../../assets/images/edit-btn.svg';
import Products from '../../../components/products';

import './adminProducts.css';
import Loader from '../../../components/loader';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const data = useSelector((state) => state.adminProduct.data);
  const loader = useSelector((state) => state.adminProduct.loader);
  const error = useSelector((state) => state.adminProduct.tableDataError);
  const productsLength = useSelector((state) => state.adminProduct?.productsLength) || 0;

  useEffect(() => {
    dispatch(GetData({ offset, limit: 10 }));
    dispatch(GetDataLength());
  }, [offset]);

  const headings = [
    {
      id: 'title',
      label: 'Title',
      image: 'thumbnail',
      render: (doc, id) => (

      <div className='box-text'>
        <span className='image-box'>
          { <img src={`http://localhost:5000/${doc.images[0]}`}
          className="item-image" />}
          </span>
          <span className='item-text' id='title-text'>{doc.productName}</span>
          </div>
      )
    },
    {
      id: 'size',
      label: 'Size',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    },
    {
      id: 'color',
      label: 'Color',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    },
    {
      id: 'price',
      label: 'Price',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    },
    {
      id: 'quantity',
      label: 'Stock',
      render: (doc, id) => (
        <>{ doc[id] }</>
      )
    },
    {
      id: 'actions',
      label: 'Actions',
      render: (doc, id) => (
        <div className='actions-btn'>
                        <Image
                          onClick={() => dispatch(ShowOffcanvas(doc))}
                          className='action-images'
                          src={EditBtn}
                          alt="Edit"
                        />
                        <Image
                          onClick={() => dispatch(DisplayModal(doc))}
                          className='action-images'
                          src={DeleteBtn}
                          alt="Delete"
                        />
                      </div>
      )
    }
  ];

  return (
    <div className="main-box-admin">

        <>
          <Products />
          {loader
            ? <Loader/>
            : <>
                  <CustomTable
          data={data}
          pagination={false}
          error={ error }
          headings={headings} /></>
        }

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
                disabled={offset >= ((productsLength / 10) - 1)}
                onClick={() => setOffset(offset + 1)}
              >
                {'Next'}
              </Pagination.Item>
            </Pagination>
          </div>
        </>

    </div>
  );
};

export default AdminProducts;
