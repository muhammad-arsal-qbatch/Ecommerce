import Navbar from 'react-bootstrap/Navbar';
import { Badge, Dropdown, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { logout } from '../../redux/slices/auth';
import userImage from '../../assets/images/user-image.png';
import Bag from '../../assets/images/Bag.svg';
import Notification from '../../assets/images/Notification.svg';

import './navbar.css';
import { useNavigate } from 'react-router-dom';

const CustomNavbar = (props) => {
  const naviagtion = useNavigate();
  const token = useSelector((state) => state.authentication.token);
  const userName = useSelector(
    (state) => state.authentication.currentUser.name
  );
  const cart = useSelector((state) => state.shoppingBag.cart);

  const dispatch = useDispatch();
  const logoutIt = () => {
    alert('func called');
    dispatch(logout());
  };
  return (
    <Navbar expand="lg" className="admin-header">
      <Container>
        <h2
          onClick={() => {
            naviagtion('/');
          }}
          className="ecom"
        >
          E-Commerce
        </h2>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div
            style={{ justifyContent: 'space-evenly', width: '90px' }}
            className="d-flex"
          >
            <div className="d-flex">
              <Image
                className="cursor-pointer"
                onClick={() => {
                  if (!token) {
                    naviagtion('/login');
                  } else {
                    // show bag here
                  }
                }}
                src={Bag}
              ></Image>
              <Badge
                style={{
                  position: 'relative',
                  minHeight: 'fit-content',
                  minWidth: 'fit-content',
                  bottom: '10px',
                  right: '9px',
                  borderRadius: '50%'
                }}
                bg="primary"
              >
                {cart.length === 0 ? <></> : cart.length}
              </Badge>
            </div>

            <div className="d-flex">
              <Image
                onClick={() => {
                  if (!token) {
                    naviagtion('/login');
                  } else {
                    // show Notifications here
                  }
                }}
                src={Notification}
              ></Image>
              <Badge
                style={{
                  position: 'relative',
                  bottom: '10px',
                  right: '9px',
                  borderRadius: '50%'
                }}
                bg="primary"
              >
                {cart.length === 0 ? <></> : cart.length}
              </Badge>{' '}
            </div>
          </div>
          {token
            ? (
            <>
              <NavDropdown title={userName} className="user-name">
                <NavDropdown.Item
                  onClick={() => {
                    naviagtion('/o');
                  }}
                >
                  Orders
                </NavDropdown.Item>
                <Dropdown.Divider></Dropdown.Divider>
                <NavDropdown.Item onClick={logoutIt}>Logout</NavDropdown.Item>
              </NavDropdown>
              <Image
                src={userImage}
                className="user-image"
                roundedCircle
              ></Image>
            </>
              )
            : (
            <button
              onClick={() => {
                naviagtion('/login');
              }}
              style={{ textDecoration: 'none' }}
              type="button"
              className="btn btn-link"
            >
              Login
            </button>
              )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
CustomNavbar.propTypes = {};
export default CustomNavbar;
