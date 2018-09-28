import React from 'react';
import PropTypes from 'prop-types';
import GameBoardContainer from '../containers/GameBoardContainer';

class RussianBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div>
        <div name="start"><button onClick={() => this.props.newGame()}>New Game</button></div>
        <GameBoardContainer />

      </div>);
  }
}


RussianBank.propTypes = {
  newGame: PropTypes.func.isRequired
};

RussianBank.defaultProps = {
  isBusy: false,
  selectedTab: 'Features'
};

export default RussianBank;
