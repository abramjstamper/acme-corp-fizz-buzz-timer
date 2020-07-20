import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import TimerConfiguration from '../../components/TimerConfiguration';

it('renders fizz and buzz inputs and allows changing the values', () => {
  const config = {
    fizz: '',
    buzz: ''
  };

  const timerIsInInitialState = true;

  const handleConfigChange = (name, value) => {
    config[name] = value;
  };

  const { container, getByText } = render(<Router><TimerConfiguration config={config} timerIsInInitialState={timerIsInInitialState} handleConfigChange={handleConfigChange} /></Router>);

  act(() => {

    expect(getByText('Please enter a fizz and buzz time in seconds.')).toBeInTheDocument();
    expect(getByText('Values should be 2 to 10, inclusive.')).toBeInTheDocument();

    expect(getByText('Fizz:')).toBeInTheDocument();
    expect(getByText('Buzz:')).toBeInTheDocument();
  });

  const fizzInput = container.querySelectorAll('input')[0];
  const buzzInput = container.querySelectorAll('input')[1];

  expect(fizzInput.value).toBe('');
  expect(fizzInput.className).toBe('fiz-buzz-input-box');
  expect(fizzInput.name).toBe('fizz');
  expect(fizzInput.type).toBe('number');
  expect(fizzInput.min).toBe('2');
  expect(fizzInput.max).toBe('10');
  expect(fizzInput.disabled).toBe(false);

  expect(buzzInput.value).toBe('');
  expect(buzzInput.className).toBe('fiz-buzz-input-box');
  expect(buzzInput.name).toBe('buzz');
  expect(buzzInput.type).toBe('number');
  expect(buzzInput.min).toBe('2');
  expect(buzzInput.max).toBe('10');
  expect(buzzInput.disabled).toBe(false);

  act(() => {
    fireEvent.change(fizzInput, { target: { name: 'fizz', value: '3' } });
  });

  expect(config.fizz).toEqual('3');
  expect(config.buzz).toBe('');

  act(() => {
    fireEvent.change(buzzInput, { target: { name: 'buzz', value: '6' } });
  });

  expect(config.fizz).toEqual('3');
  expect(config.buzz).toBe('6');
});

it('disables input fields when timerIsInInitialState is false', () => {
  const config = {
    fizz: '4',
    buzz: '6'
  };

  const timerIsInInitialState = false;

  const handleConfigChange = (name, value) => {
    config[name] = value;
  };

  const { container } = render(<Router><TimerConfiguration config={config} timerIsInInitialState={timerIsInInitialState} handleConfigChange={handleConfigChange} /></Router>);

  const fizzInput = container.querySelectorAll('input')[0];
  const buzzInput = container.querySelectorAll('input')[1];

  expect(fizzInput.value).toBe('4');
  expect(fizzInput.className).toBe('fiz-buzz-input-box');
  expect(fizzInput.name).toBe('fizz');
  expect(fizzInput.type).toBe('number');
  expect(fizzInput.min).toBe('2');
  expect(fizzInput.max).toBe('10');
  expect(fizzInput.disabled).toBe(true);

  expect(buzzInput.value).toBe('6');
  expect(buzzInput.className).toBe('fiz-buzz-input-box');
  expect(buzzInput.name).toBe('buzz');
  expect(buzzInput.type).toBe('number');
  expect(buzzInput.min).toBe('2');
  expect(buzzInput.max).toBe('10');
  expect(buzzInput.disabled).toBe(true);
});