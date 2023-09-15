import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { logout } from '../../redux/slices/auth';
import userImage from '../../assets/images/user-image.png'

import './navbar.css'

const CustomNavbar = (props) => {
  const dispatch = useDispatch();
  const logoutIt = () => {
    alert('func called');
    dispatch(logout());
  }
  const {
    name = 'Smith Johnson'
  } = props
  return (
    <Navbar expand="lg" className="admin-header">
    <Container>
        <h2 className='ecom'>E-Commerce</h2>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clipPath="url(#clip0_2232_595)">
    <path d="M8 16C8.53043 16 9.03914 15.7893 9.41421 15.4142C9.78929 15.0391 10 14.5304 10 14H6C6 14.5304 6.21071 15.0391 6.58579 15.4142C6.96086 15.7893 7.46957 16 8 16Z" fill="#007BFF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M8 1.9179L7.203 2.0789C6.29896 2.2631 5.48633 2.754 4.90265 3.46852C4.31897 4.18304 4.0001 5.07728 4 5.9999C4 6.6279 3.866 8.1969 3.541 9.7419C3.381 10.5089 3.165 11.3079 2.878 11.9999H13.122C12.835 11.3079 12.62 10.5099 12.459 9.7419C12.134 8.1969 12 6.6279 12 5.9999C11.9997 5.07746 11.6807 4.18345 11.097 3.46913C10.5134 2.75482 9.70087 2.26406 8.797 2.0799L8 1.9169V1.9179ZM14.22 11.9999C14.443 12.4469 14.701 12.8009 15 12.9999H1C1.299 12.8009 1.557 12.4469 1.78 11.9999C2.68 10.1999 3 6.8799 3 5.9999C3 3.5799 4.72 1.5599 7.005 1.0989C6.99104 0.959852 7.00638 0.819425 7.05003 0.686672C7.09368 0.553919 7.16467 0.431788 7.25842 0.328156C7.35217 0.224525 7.4666 0.141693 7.59433 0.0850029C7.72206 0.0283129 7.86026 -0.000976562 8 -0.000976562C8.13974 -0.000976563 8.27794 0.0283129 8.40567 0.0850029C8.5334 0.141693 8.64783 0.224525 8.74158 0.328156C8.83533 0.431788 8.90632 0.553919 8.94997 0.686672C8.99362 0.819425 9.00896 0.959852 8.995 1.0989C10.1253 1.3288 11.1414 1.94226 11.8712 2.8354C12.6011 3.72854 12.9999 4.84647 13 5.9999C13 6.8799 13.32 10.1999 14.22 11.9999Z" fill="#007BFF"/>
  </g>
  <defs>
    <clipPath id="clip0_2232_595">
      <rect width="16" height="16" fill="white"/>
    </clipPath>
  </defs>
</svg>
        <NavDropdown title = {name} className='user-name'>
              <NavDropdown.Item href='/' onClick={logoutIt}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Image src= {userImage} className='user-image' roundedCircle></Image>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
CustomNavbar.propTypes = {
  name: PropTypes.string
}
export default CustomNavbar;
