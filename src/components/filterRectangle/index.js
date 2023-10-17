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
    const filterName = Object.keys(filter)[0];
    console.log(filterName);
    const filterCode = filter[filterName];
    console.log(filter[filterName]);
    if (filterName === 'Color') {
      dispatch(getData({ filterCode: filterCode + 10 }))
    }
    if (filterName === 'Size') {
      console.log('filter code is, ', filterCode);
      dispatch(getData({ filterCode: filterCode + 0 }))
    }
    if (filterName === 'Price') {
      dispatch(getData({ filterCode: filterCode + 4 }))
    }
    if (filterName === 'Default Sorting') {
      dispatch(getData({ filterCode: filterCode + 7 }))
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
