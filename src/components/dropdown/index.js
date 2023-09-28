import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types'

import './dropdown.css'

const CustomDropDown = ({
  heading,
  items
}) => {
  return (
    <Dropdown >
  <div className='dropdown-style'>
  <span>
      <Dropdown.Toggle size='sm' variant='none' id="">
        {heading}
      </Dropdown.Toggle>
      </span>

      <Dropdown.Menu>
        {items.map((item, index) => (
          <Dropdown.Item key={index} href="#/action-1">{item}</Dropdown.Item>

        ))}
      </Dropdown.Menu>
    </div>
    </Dropdown>

  )
}
CustomDropDown.propTypes = {
  heading: PropTypes.string,
  items: PropTypes.array
}

export default CustomDropDown;
