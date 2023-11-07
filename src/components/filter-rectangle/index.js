import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import CustomDropDown from '../dropdown';
import CustomInput from '../input-field';
import { GetData } from '../../redux/slices/products';
import { useState } from 'react';

import './filterRectangle.css';

const FilterRectangle = () => {
  const dispatch = useDispatch();
  const [filterObject, setFilterObject] = useState({});
  const [sortingObject, setSortingObject] = useState({});
  const [searchKeyword, setSearchKeyword] = useState('');
  const productsLength = useSelector((state) => state.adminProduct?.productsLength) || 0;

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
      items: ['$0 - $20', '$20 - $40', '$40 - $10000']
    }
  ];

  const dropdownArray2 = [
    {
      heading: 'Default Sorting',
      items: ['Price low to high', 'Price high to low', 'Newest Products']
    }
  ];

  const handleFilters = (filter) => {
    let filterName = Object.keys(filter)[0];
    const { filterAction } = filter;
    filterName = filterName.toLowerCase();
    let updatedFilterObject;
    if (filterName === 'price') {
      const splittedValue = filterAction.split('-');
      const startValue = splittedValue[0].split('$')[1];
      const endValue = splittedValue[1].split('$')[1];
      updatedFilterObject = {
        ...filterObject,
        [filterName]: [startValue, endValue]
      };
    } else {
      updatedFilterObject = {
        ...filterObject,
        [filterName]: filterAction
      };
    }
    setFilterObject(updatedFilterObject);
    dispatch(
      GetData({
        filterObj: updatedFilterObject,
        sortingObj: sortingObject,
        ...searchKeyword,
        limit: productsLength
      })
    );
  };

  const handleSort = (sort) => {
    const defaultSorting = Object.values(sort);
    let sortingObj = {};
  
    if (defaultSorting[0] === 2) {
      sortingObj = {
        date: -1
      };
    } else {
      if (defaultSorting[0] === 0) {
        sortingObj = {
          price: 1
        };
      } else {
        sortingObj = {
          price: -1
        };
      }
    }
  
    setSortingObject(sortingObj); // Update the sorting object immediately.
  
    dispatch(
      GetData({
        filterObj: filterObject, // Use the latest state value
        sortingObj: sortingObj, // Use the updated sorting object
        ...searchKeyword,
        limit: productsLength
      })
    );
  };

  const handleSearch = debounce((e) => {
    const newSearchKeyword = { search: e.target.value };
    setSearchKeyword(newSearchKeyword);
    dispatch(
      GetData({
        filterObj: filterObject,
        sortingObj: sortingObject,
        ...newSearchKeyword, // Use the newSearchKeyword here
        limit: productsLength
      })
    );
  }, 500);

  return (
    <div className="main-box-user ">
      <div className="heading-style">
        <h4>Heading</h4>
      </div>
      <div className="filter-box">
        <div className="single-filter-box">
          <div>
            {' '}
            <b>filteres: </b>
          </div>
          {dropdownArray.map((singleDropdown, index) => (
            <div style={{ margin: '2%' }} key={ index }>
            <CustomDropDown
              handleClick={handleFilters}
              key={index}
              heading={singleDropdown.heading}
              items={singleDropdown.items}
            />
            </div>
          ))}
        </div>
        <div className="single-filter-box">
          <div>
            <b>Sorting: </b>
          </div>
          {dropdownArray2.map((singleDropdown, index) => (
            <CustomDropDown
              handleClick={handleSort}
              key={index}
              heading={singleDropdown.heading}
              items={singleDropdown.items}
            />
          ))}
        </div>
        <div className="single-filter-box">
          <div>
            {' '}
            <b>Search: </b>
          </div>
          <CustomInput
            onChange={handleSearch}
            placeholder="Search by Name"
          ></CustomInput>
        </div>
      </div>
    </div>
  );
};

export default FilterRectangle;
