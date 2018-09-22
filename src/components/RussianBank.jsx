import React from 'react';
import 'react-notifications/lib/notifications.css';

class RussianBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div>
        <button name="start">Start Game</button>

      </div>);
  }
}


RussianBank.propTypes = {
};

RussianBank.defaultProps = {
  selectedTab: 'Features',
  isBusy: false
};

export default RussianBank;
