import PropTypes from 'prop-types';

import CustomNavbar from '../components/navbar';
import SideBar from '../components/sideBar';

import './layout.css';

const Layout = ({ children, showSidebar = true }) => {
  return (
    <div className="layout-style">
      <CustomNavbar name="Arsal" />
      {showSidebar
        ? (
        <div className="layout-box-admin">
          {' '}
          <SideBar /> {children}
        </div>
          )
        : (
        <div className="layout-box-user">
          {' '}
          <></> {children}
        </div>
          )}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
  showSidebar: PropTypes.bool
};

export default Layout;
