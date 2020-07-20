import { act, render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, StaticRouter } from 'react-router-dom';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { mount } from 'enzyme';
import TimerDisplay from '../../components/TimerDisplay';

describe('TimerDisplay functional-testing', () => {
  let div = null;
  let container = null;
  let getByText = null;
  const initConfig = {
    fizz: '',
    buzz: ''
  };
  const initTimer = {
    offsetTime: new Date(),
    elapsedTime: 0,
    isTicking: false,
    isInInitialState: true
  };

  let timer = {};
  let config = {};

  const updateTimer = (t) => {
    timer = { ...timer, ...t };
  };

  beforeEach(() => {
    div = document.createElement('div');
    timer = { ...initTimer, offsetTime: new Date() };
    config = { ...initConfig };

    const { container: c, getByText: g, rerender: r } = render(<Router><TimerDisplay config={config} timer={timer} updateTimer={updateTimer} /></Router>, div);

    container = c;
    getByText = g;
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    getByText = null;
  });

  it('renders timer display and buttons', () => {

    act(() => {
      const timeDisplay = container.querySelectorAll('input')[0];

      expect(getByText('Time Elapsed')).toBeInTheDocument();
      expect(timeDisplay.value).toEqual('0:00:00');
      expect(timeDisplay.disabled).toEqual(true);
      expect(getByText('Start')).toBeInTheDocument();
      expect(getByText('Stop / Reset')).toBeInTheDocument();
    });
  });

  it('starts timer', () => {

    const start = getByText('Start');
    fireEvent.click(start);

    expect(timer.elapsedTime).toEqual(0);
    expect(timer.isTicking).toEqual(true);
    expect(timer.isInInitialState).toEqual(false);
  });

  it('stops timer', () => {
    expect(timer.isTicking).toEqual(false);
    expect(timer.isInInitialState).toEqual(true);

    act(() => {
      const start = getByText('Start');
      fireEvent.click(start);
    });

    expect(timer.isTicking).toEqual(true);
    expect(timer.isInInitialState).toEqual(false);

    act(() => {
      const stop = getByText('Stop / Reset');
      fireEvent.click(stop);
    });

    expect(timer.isTicking).toEqual(false);
  });

  it('resets timer and restarts the timer', async () => {
    let oldOffset = timer.offsetTime;
    expect(timer.isTicking).toEqual(false);
    expect(timer.isInInitialState).toEqual(true);

    act(() => {
      const start = getByText('Start');
      fireEvent.click(start);
    });

    expect(timer.isTicking).toEqual(true);
    expect(timer.isInInitialState).toEqual(false);
    timer.elapsedTime = 10;

    act(() => {
      const stop = getByText('Stop / Reset');
      fireEvent.click(stop);
    });

    expect(timer.isTicking).toEqual(false);

    act(() => {
      const stop = getByText('Stop / Reset');
      fireEvent.click(stop);
    });

    expect(timer.elapsedTime).toEqual(0);
    expect(timer.isTicking).toEqual(false);

    act(() => {
      const start = getByText('Start');
      fireEvent.click(start);
    });

    expect(timer.isTicking).toEqual(true);
    expect(timer.offsetTime).not.toEqual(oldOffset);
  });
});

describe('TimerDisplay integration-test', () => {
  const spyFunction = jest.fn();

  const timer = {
    offsetTime: new Date(),
    isTicking: true,
    elapsedTime: 0,
    isInInitialState: true
  };

  let wrapper = null;

  beforeEach(() => {
    jest.useFakeTimers();

    wrapper = mount(
      <StaticRouter location='/timer-display'>
        <TimerDisplay updateTimer={spyFunction} timer={timer} config={{ fizz: '', buzz: '' }} />
      </StaticRouter>
    );
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('timer should run', () => {
    expect(spyFunction).not.toHaveBeenCalled();

    wrapper.find('button.start').simulate('click', { button: 0 });

    // doesn't seem to work for some reason
    jest.advanceTimersByTime(600);

    // test passes because this is called by the button.start
    expect(spyFunction).toHaveBeenCalled();
    // test should fail with this expect
    expect(spyFunction).toHaveBeenCalledTimes(3);
  });
});