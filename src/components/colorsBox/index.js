import PropTypes from 'prop-types';

import './colorsBox.css';

const ColorsBox = ({ text, colors }) => {
  return (
    <>
      {text}
      {text === 'Color'
        ? (
        <div className="size-box">
          {typeof colors === 'string'
            ? (
            <div className="sizes">
              <div
                className="color-box"
                style={{ 'background-color': colors }}
              />
            </div>
              )
            : (
                colors.map((c, index) => (
              <div key={index} className="sizes">
                <div
                  key={index}
                  className="color-box"
                  style={{ 'background-color': c }}
                />
              </div>
                ))
              )}
        </div>
          )
        : (
        <div className="size-box">
          {typeof colors === 'string'
            ? (
            <div className="sizes">
              <div className="color-box">{colors}</div>
            </div>
              )
            : (
                colors.map((c, index) => (
              <div key={index} className="sizes">
                <div key={index} className="color-box" />
                {c}
              </div>
                ))
              )}
        </div>
          )}
    </>
  );
};

ColorsBox.propTypes = {
  text: PropTypes.string,
  colors: PropTypes.array
};

export default ColorsBox;
