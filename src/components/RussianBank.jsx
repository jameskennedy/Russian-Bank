import React from 'react';
import GameBoardContainer from '../containers/GameBoardContainer';

class RussianBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div>
        <div name="start">Header</div>
        <GameBoardContainer />

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
