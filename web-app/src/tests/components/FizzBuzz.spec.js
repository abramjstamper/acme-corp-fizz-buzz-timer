import FizzBuzz from '../../components/FizzBuzz';
import React from 'react';
import { shallow } from 'enzyme';

it('renders nothing by default', () => {
  const config = {
    fizz: '',
    buzz: ''
  };

  const value = 0;

  const wrapper = shallow(<FizzBuzz config={config} value={value} />);

  expect(wrapper.hasClass('timer-display-text')).toBe(true);
  expect(wrapper.text()).toBe('');
});

it('renders Fizz', () => {
  const config = {
    fizz: 5,
    buzz: ''
  };

  const value = 5;

  const wrapper = shallow(<FizzBuzz config={config} value={value} />);
  expect(wrapper.hasClass('timer-display-text')).toBe(true);
  expect(wrapper.text()).toBe('Fizz');
});

it('renders Buzz', () => {
  const config = {
    fizz: '',
    buzz: 5
  };

  const value = 5;

  const wrapper = shallow(<FizzBuzz config={config} value={value} />);
  expect(wrapper.hasClass('timer-display-text')).toBe(true);
  expect(wrapper.text()).toBe('Buzz');
});

it('renders FizzBuzz', () => {
  const config = {
    fizz: 10,
    buzz: 5
  };

  const value = 10;

  const wrapper = shallow(<FizzBuzz config={config} value={value} />);
  expect(wrapper.hasClass('timer-display-text')).toBe(true);
  expect(wrapper.text()).toBe('FizzBuzz');
});
