import React from 'react';
import { Dropdown } from 'react-bootstrap';

import PropTypes from 'prop-types';

const NotificationBox = ({ isDisplay, notifications = [] }) => {
  console.log('dasdasdadas');
  return (
    <Dropdown>
    <Dropdown.Menu>
                    {notifications.map((singleNotification, index) => (
                      <Dropdown.Item key={index} href="#">{singleNotification.text}</Dropdown.Item>

                    ))}
                  </Dropdown.Menu>
                  </Dropdown>
  );
};

NotificationBox.propTypes = {
  notifications: PropTypes.array,
  isDisplay: PropTypes.string
};

export default NotificationBox;
