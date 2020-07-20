import PropTypes from 'prop-types';
import React from 'react';

const FizzBuzz = ({ config, value }) => {
  let text = '';

  if (config?.fizz && !(value % config?.fizz)) {
    text += "Fizz";
  }
  if (config?.buzz && !(value % config?.buzz)) {
    text += "Buzz";
  }

  return (
    <div className='timer-display-text'>
      {text}
    </div>
  );
};

FizzBuzz.propTypes = {
  config: PropTypes.shape({
    fizz: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    buzz: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }).isRequired,
  value: PropTypes.number.isRequired
};

export default FizzBuzz;