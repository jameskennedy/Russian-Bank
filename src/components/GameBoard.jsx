import React from 'react';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="game-board">
        Game on!
      </div>);
  }
}


GameBoard.propTypes = {
};

GameBoard.defaultProps = {
};

export default GameBoard;
