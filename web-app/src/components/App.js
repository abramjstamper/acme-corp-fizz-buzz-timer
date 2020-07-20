import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

// Components for Routes
import NotFound from './NotFound';
import TimerDisplay from './TimerDisplay';
import TimerConfiguration from './TimerConfiguration';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      config: {
        fizz: '',
        buzz: ''
      },
      timer: {
        offsetTime: new Date(),
        elapsedTime: 0,
        isTicking: false,
        isInInitialState: true
      }
    };
  }

  handleConfigChange = (field, value) => {
    const config = { ...this.state.config };
    config[field] = value ? Number.parseInt(value, 10) : '';
    this.setState({ ...this.state, config });
  };

  updateTimer = ({ offsetTime, elapsedTime, isTicking, isInInitialState }) => {
    const t = { ...this.state.timer, offsetTime, elapsedTime, isTicking, isInInitialState };
    this.setState({ ...this.state, timer: t });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/timer-configuration' render={(props) =>
            <TimerConfiguration
              {...props}
              config={this.state.config}
              handleConfigChange={this.handleConfigChange}
              timerIsInInitialState={this.state.timer?.isInInitialState}
            />}
          />
          <Route exact path='/timer-display' render={(props) =>
            <TimerDisplay
              {...props}
              config={this.state.config}
              updateTimer={this.updateTimer}
              timer={this.state.timer}
            />} />
          <Route render={(props) =>
            <NotFound {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
