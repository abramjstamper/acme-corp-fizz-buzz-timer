import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const TimerConfiguration = props => {
  return (
    <div className='center-parent'>
      <div className='center-child'>
        <div className='timer-config-description'>
          Please enter a fizz and buzz time in seconds. <b>Values should be 2 to 10, inclusive.</b>
        </div>

        <div className='fiz-buzz-input-wrapper'>
          <label>Fizz:</label>
          <input
            className='fiz-buzz-input-box'
            name='fizz'
            type='number'
            value={props.config.fizz}
            onChange={e => props.handleConfigChange(e.target.name, e.target.value, 10)}
            disabled={!props.timerIsInInitialState}
            min='2'
            max='10'
          />
          <label>Buzz:</label>
          <input
            className='fiz-buzz-input-box'
            name='buzz'
            type='number'
            value={props.config.buzz}
            onChange={e => props.handleConfigChange(e.target.name, e.target.value, 10)}
            disabled={!props.timerIsInInitialState}
            min='2'
            max='10'
          />
        </div>

        <Link className='nav-button' to='/timer-display'>
          {`Go to Timer >`}
        </Link>

      </div>
    </div>
  );
};

TimerConfiguration.propTypes = {
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
  handleConfigChange: PropTypes.func.isRequired,
  timerIsInInitialState: PropTypes.bool.isRequired
};

export default TimerConfiguration;
