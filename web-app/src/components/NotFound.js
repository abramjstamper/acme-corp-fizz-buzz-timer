import React from 'react';
import { Redirect } from 'react-router-dom';

const NotFound = props => {

  return (<Redirect to='/timer-configuration' />);
};

export default NotFound;