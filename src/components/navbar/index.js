import Navbar from 'react-bootstrap/Navbar';
import {
  Dropdown,
  Badge,
  Image
} from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';

import userImage from '../../assets/images/user-image.png';
import { ReadNotification } from '../../redux/slices/notification';

import Bag from '../../assets/images/Bag.svg';
import Notification from '../../assets/images/Notification.svg';

import './navbar.css';

const CustomNavbar = (props) => {
  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.notification?.notifications) || [];
  console.log('notifications for this user is  ', notifications);

  const navigation = useNavigate();
  const token = useSelector((state) => state.authentication.token);
  const isAdmin = useSelector((state) => state.authentication.isAdmin);

  const userName = useSelector(
    (state) => state.authentication.currentUser.name
  );

  const cart = useSelector((state) => state.shoppingBag.cart);

  const logoutIt = () => {
    dispatch(LogoutUser());
    navigation('/');
  };

  return (
    <Navbar expand="lg" className="admin-header">
      <Container>
        <h2
          onClick={() => {
            console.log('sdasdasdasda\n\nfsdfsdfdsf');
            navigation('/');
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
              {token
                ? <>
                <Dropdown>
                  <div className='my-class'>
                  <Dropdown.Toggle>
                    <Image
                      className="curson-pointer"
                      id='dropdown-autoclose-true dropdown-autoclose-true'
                      src={Notification}
                    ></Image>
                    </Dropdown.Toggle>
                    </div>
                    {notifications.length

                      ? <Dropdown.Menu align= 'end'>
                    {notifications.map((singleNotification, index) => (
                      <Dropdown.Item onClick={() => {
                        console.log('dasdsaddad');
                        dispatch(ReadNotification({ orderId: singleNotification.orderId }))
                      }} key={index} >{singleNotification.text}</Dropdown.Item>

                    ))}
                        </Dropdown.Menu>
                      : <></>
                    }
                  </Dropdown>
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
                    {notifications.length ? <>{notifications.length}</> : <></>}
                  </Badge></>
                : <Image
                  className="curson-pointer"
                  id='dropdown-autoclose-true'
                  onClick={ () => {
                    navigation('/auth/login');
                  }
                  }
                  src={Notification}
                ></Image>

            }

              {isAdmin
                ? null
                : (
                <>
                  <Image
                    className="curson-pointer"
                    onClick={() => {
                      if (!token) {
                        navigation('/auth/login');
                      } else {
                        navigation('/user/shoppingBag');
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
                    {cart.length ? <>{cart.length}</> : <></>}
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
                    <NavDropdown.Item
                      onClick={() => {
                        navigation('/user/orders');
                      }}
                    >
                      Orders
                    </NavDropdown.Item>
                    <Dropdown.Divider></Dropdown.Divider>
                  </>
                    )
                  : null}

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
                navigation('/auth/login');
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
