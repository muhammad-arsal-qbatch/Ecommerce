import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';

import CustomDropDown from '../../components/dropdown';
import CustomInput from '../inputField';
import { getData } from '../../redux/slices/adminProduct';
import { useEffect, useState } from 'react';

import './filterRectangle.css';

const FilterRectangle = () => {
  const dispatch = useDispatch();

  const [filterObject, setFilterObject] = useState({});
  const [sortingObject, setSortingObject] = useState({});
  const [searchKeyword, setSearchKeyword] = useState('');

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

    if (filterName === 'price') {
      const splittedValue = filterAction.split('-');
      const startValue = splittedValue[0].split('$')[1];
      const endValue = splittedValue[1].split('$')[1];
      setFilterObject({
        ...filterObject,
        [filterName]: [startValue, endValue]
      });
    } else {
      setFilterObject({
        ...filterObject,
        [filterName]: filterAction
      });
    }
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
    setSortingObject({ ...sortingObj });
  };

  const handleSearch = debounce((e) => {
    setSearchKeyword({ search: e.target.value });
  }, 500);

  useEffect(() => {
    dispatch(
      getData({
        filterObj: filterObject,
        sortingObj: sortingObject,
        ...searchKeyword
      })
    );
  }, [filterObject, searchKeyword, sortingObject]);

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
            <CustomDropDown
              handleClick={handleFilters}
              key={index}
              heading={singleDropdown.heading}
              items={singleDropdown.items}
            />
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
