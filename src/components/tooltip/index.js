import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const CustomTooltip = ({ text }) => {
  return (
    <OverlayTrigger placement='left' overlay={<Tooltip id='tooltip-1'>{text}</Tooltip>}>
      <div className='card-description multiline-ellipsis'>{text}</div>
    </OverlayTrigger>
  );
};

CustomTooltip.propTypes = {
  text: PropTypes.string.isRequired // Add `isRequired` if `text` is required
};

export default CustomTooltip;
