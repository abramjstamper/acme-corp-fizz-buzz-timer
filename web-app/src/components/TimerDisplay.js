import FizzBuzz from './FizzBuzz';
import { formatSecondsIntoString } from '../common/dateHelper';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { useInterval } from '../common/hooks';

const TimerDisplay = props => {

  useInterval(() => {
    const delta = Math.floor((Date.now() - props.timer.offsetTime) / 1000);
    props.updateTimer({ ...props.timer, elapsedTime: delta });

  }, props.timer.isTicking ? 300 : null);

  const handleStartButton = () => {
    if (!props.timer.isTicking) {
      const newOffset = new Date();
      if (!props.timer.isInInitialState) {
        newOffset.setTime(newOffset.getTime() - (props.timer.elapsedTime * 1000));
      }
      props.updateTimer({ ...props.timer, offsetTime: newOffset, isInInitialState: false, isTicking: true });
    } else {
      props.updateTimer({ ...props.timer, isInInitialState: false, isTicking: true });
    }
  }

  const handleStopResetButton = () => {
    if (!props.timer.isTicking) {
      props.updateTimer({ ...props.timer, elapsedTime: 0, isInInitialState: true, isTicking: false });
    } else {
      props.updateTimer({ ...props.timer, isTicking: false });
    }
  }

  return (
    <React.Fragment>
      <Link className='top-left-nav-button' to='/timer-configuration'>{`< Set Times`}</Link>

      <div className='center-parent'>
        <div className='center-child'>
          <div className='timer-display-title'>
            Time Elapsed
        </div>

          <input className='timer-display-container' name='timer-display' value={formatSecondsIntoString(props.timer.elapsedTime)} disabled />

          <div className='timer-display-button-wrapper'>
            <button className='start' onClick={() => handleStartButton()}>Start</button>
            <button className='reset' onClick={() => handleStopResetButton()}>Stop / Reset</button>
          </div>


          <FizzBuzz config={props.config} value={props.timer.elapsedTime} />
        </div>
      </div>
    </React.Fragment>
  );
};

TimerDisplay.propTypes = {
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
  timer: PropTypes.shape({
    offsetTime: PropTypes.instanceOf(Date).isRequired,
    elapsedTime: PropTypes.number.isRequired,
    isTicking: PropTypes.bool.isRequired,
    isInInitialState: PropTypes.bool.isRequired
  }).isRequired,
  updateTimer: PropTypes.func.isRequired
};

export default TimerDisplay;


