import { debounce } from 'lodash';
import CustomDropDown from '../../components/dropdown'
import CustomInput from '../inputField'

import './filterRectangle.css'
import { useDispatch } from 'react-redux';
import { getData } from '../../redux/slices/adminProduct';

const FilterRectangle = () => {
  const dropdownArray = [
    {
      heading: 'Size',
      items: ['XS', 'S', 'M', 'L']

    },
    {
      heading: 'Color',
      items: ['black', 'darkred', 'darkgreen', 'grey', 'darkblue']
    },
    {
      heading: 'Price',
      items: ['$0 - $20', '$20 - $40', '$40 - $10,000']
    }
  ]
  const dropdownArray2 = [
    {
      heading: 'Default Sorting',
      items: ['Price low to high', 'Price high to low', 'Newest Products']

    }
  ]
  const dispatch = useDispatch();
  const handleFilters = (filter) => {
    console.log('my filter', filter)
    const filterName = Object.keys(filter)[0];
    const filterAction = filter.filterAction;
    console.log(filterName);
    console.log(filterAction);
    const filterCode = filter[filterName];
    console.log(filter[filterName]);
    if (filterName === 'Color') {
      const filterObj = { filterCode: 1, filterAction }
      dispatch(getData({ filterObj }))
    }
    if (filterName === 'Size') {
      console.log('filter code is, ', filterCode);
      const filterObj = { filterCode: 0, filterAction }
      dispatch(getData({ filterObj }))
    }
    if (filterName === 'Price') {
      const filterObj = {
        filterCode: 2, filterAction: filterCode

      }
      dispatch(getData({ filterObj }))
    }
    if (filterName === 'Default Sorting') {
      const filterObj = {
        filterCode: 3, filterAction: filterCode
      }
      dispatch(getData({ filterObj }))
    }
    // console.log('filterss are, ', filterName[0]);
  }
  const handleSearch = debounce((e) => {
    dispatch(getData({ search: e.target.value }));
  }, 500);
  return (
        <div className="main-box-user ">
            <div className='heading-style'>
            <h4>Heading</h4>
            </div>
            <div className='filter-box'>
              <div className='single-filter-box'>
                <div> <b>filteres: </b></div>
                {dropdownArray.map((singleDropdown, index) => (
                    <CustomDropDown handleClick={handleFilters} key={index} heading = {singleDropdown.heading} items= {singleDropdown.items}/>

                ))}
                </div>
                <div className='single-filter-box'>
                  <div> <b>Sorting: </b></div>
                {dropdownArray2.map((singleDropdown, index) => (
                    <CustomDropDown handleClick={handleFilters} key={index} heading = {singleDropdown.heading} items= {singleDropdown.items}/>

                ))}
                </div>
                <div className='single-filter-box'>
                                <div> <b>Search: </b></div>

                <CustomInput
                onChange={handleSearch}
                placeholder='Search by Name'></CustomInput>
                </div>
                </div>
        </div>

  )
}
export default FilterRectangle;
