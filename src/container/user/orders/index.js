import CustomTable from '../../../components/customTable';

const Orders = () => {
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
  return (
    <div className='container mt-5 orders-box'>
      <div className="row heading-style">
        <h3>Orders</h3>

      </div>
      <div className="row">

      <CustomTable headings={headings} pagination={true}></CustomTable>
      </div>

    </div>
  )
}
export default Orders;
