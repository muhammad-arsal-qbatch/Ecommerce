import PropTypes from 'prop-types'

import CustomNavbar from '../components/navbar';
import SideBar from '../components/sideBar';

import './layout.css'

const Layout = ({ children, showSidebar = true }) => {
  return (
      <div className='layout-style' >
        <CustomNavbar name= 'Arsal' />
        <div className='layout-box' >
          {showSidebar
            ? <SideBar />
            : <></>
          }
        {children}
        </div>
      </div>

  )
}
Layout.propTypes = {
  children: PropTypes.element,
  showSidebar: PropTypes.bool
}
export default Layout;
