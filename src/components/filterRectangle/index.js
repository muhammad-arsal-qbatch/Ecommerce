import CustomDropDown from '../../components/dropdown'
import CustomInput from '../inputField'

import './filterRectangle.css'
const FilterRectangle = () => {
  const dropdownArray = [
    {
      heading: 'Size',
      items: ['XS', 'S', 'M', 'L']

    },
    {
      heading: 'Color',
      items: ['Black', 'red', 'green']
    },
    {
      heading: 'Price',
      items: ['$0 - $20', '$20 - $40', '$40 - $60']
    }
  ]
  const dropdownArray2 = [
    {
      heading: 'Default Sorting',
      items: ['Price low to high', 'Price high to low', 'Newest Products']

    }
  ]
  return (
        <div className="main-box-user fixed-top top-30 ">
            <div className='heading-style'>
            <h4>Heading</h4>
            </div>
            <div className='filter-box'>
              <div className='single-filter-box'>
                <div> <b>filteres: </b></div>
                {dropdownArray.map((singleDropdown, index) => (
                    <CustomDropDown key={index} heading = {singleDropdown.heading} items= {singleDropdown.items}/>

                ))}
                </div>
                <div className='single-filter-box'>
                  <div> <b>Sorting: </b></div>
                {dropdownArray2.map((singleDropdown, index) => (
                    <CustomDropDown key={index} heading = {singleDropdown.heading} items= {singleDropdown.items}/>

                ))}
                </div>
                <div className='single-filter-box'>
                                <div> <b>Search: </b></div>

                <CustomInput placeholder='Search by Name'></CustomInput>
                </div>
                </div>
        </div>

  )
}
export default FilterRectangle;
