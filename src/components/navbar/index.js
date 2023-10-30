import Navbar from 'react-bootstrap/Navbar';
import {
  Badge,
  Dropdown,
  Image
} from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';

import userImage from '../../assets/images/user-image.png';
import Bag from '../../assets/images/Bag.svg';

import './navbar.css';

const CustomNavbar = (props) => {
  const naviagtion = useNavigate();
  const token = useSelector((state) => state.authentication.token);
  const isAdmin = useSelector((state) => state.authentication.isAdmin);

  const userName = useSelector(
    (state) => state.authentication.currentUser.name
  );

  const cart = useSelector((state) => state.shoppingBag.cart);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const logoutIt = () => {
    dispatch(LogoutUser());
    navigation('/');
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
              {isAdmin
                ? (
                <></>
                  )
                : (
                <>
                  <Image
                    className="curson-pointer"
                    onClick={() => {
                      if (!token) {
                        naviagtion('/login');
                      } else {
                        naviagtion('/shoppingBag');
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
                </>
                  )}
            </div>
          </div>
          {token
            ? (
            <>
              <NavDropdown title={userName} className="user-name">
                {isAdmin === false
                  ? (
                  <>
                    {' '}
                    <NavDropdown.Item
                      onClick={() => {
                        naviagtion('/o');
                      }}
                    >
                      Orders
                    </NavDropdown.Item>
                    <Dropdown.Divider></Dropdown.Divider>
                  </>
                    )
                  : (
                  <></>
                    )}

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
