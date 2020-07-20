import App from '../../components/App';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { mount } from 'enzyme';

describe('<App /> core', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<App />, div);
  });

  it('react router navigation works as expected', () => {
    const { container, getByText } = render(<App />);
    expect(container.baseURI).toContain('/timer-configuration');

    fireEvent.click(getByText(/Go to Timer >/i));
    expect(container.baseURI).toContain('/timer-display');

    fireEvent.click(getByText(/< Set Times/i));
    expect(container.baseURI).toContain('/timer-configuration');
  });
});

describe('<App /> state functions', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('test handleChange of fizz', () => {
    const value = 5;

    wrapper.find('[name="fizz"]').simulate('change', { target: { name: 'fizz', value: value } });

    expect(wrapper.state('config')['fizz']).toEqual(value);
  });

  it('test handleChange of buzz', () => {
    const value = 5;

    wrapper.find('[name="buzz"]').simulate('change', { target: { name: 'buzz', value: value } });

    expect(wrapper.state('config')['buzz']).toEqual(value);
  });

  it('test handleChange of buzz where it\'s undefined', () => {
    const value = '';

    wrapper.find('[name="buzz"]').simulate('change', { target: { name: 'buzz', value: value } });

    expect(wrapper.state('config')['buzz']).toEqual(value);
  });


  it('test updateTimer function during start/end', () => {
    wrapper.find('Link').simulate('click', { button: 0 });

    wrapper.find('button.start').simulate('click', { button: 0 });

    expect(wrapper.state('timer')['isTicking']).toEqual(true);
    expect(wrapper.state('timer')['isInInitialState']).toEqual(false);
    expect(wrapper.state('timer')['elapsedTime']).toEqual(0);

    wrapper.find('button.reset').simulate('click', { button: 0 });

    expect(wrapper.state('timer')['isTicking']).toEqual(false);
    expect(wrapper.state('timer')['isInInitialState']).toEqual(false);
    expect(wrapper.state('timer')['elapsedTime']).toEqual(0);
  });
});

