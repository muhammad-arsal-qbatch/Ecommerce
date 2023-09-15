import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Image } from 'react-bootstrap';

import Arrow from '../../assets/images/LRArrow.svg';

import './sideBarGroup.css'

const SideBarGroup = (props) => {
  const navigate = useNavigate();
  const handleClick = (link) => {
    console.log('inside handle click');
    navigate(link);
  }
  const {
    text = '',
    link = ''

  } = props
  return (
            <div className='group-sidebar'>
                <div className='arrow-text'>
                  <Image src={Arrow}></Image>
< span onClick={() => handleClick(link)} className='sidebar-btn' >{text}</span>
                </div>
                <div className='rectangle-sidebar'></div>

            </div>

  )
}
SideBarGroup.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string
}

export default SideBarGroup;
