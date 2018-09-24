import React from 'react';
import PropTypes from 'prop-types';
import GameState from '../engine/objects/GameState';
import DeckComponent from './DeckComponent';

class GameBoard extends React.Component {
  renderGameInactive() {
    return (<p>Game not started</p>);
  }

  render() {
    const gameState = this.props.gameState;
    const isGameActive = !!gameState;
    if (!isGameActive) {
      return this.renderGameInactive();
    }

    let indent = 0;
    const decks = gameState.decks;
    const deckComponents = decks.map((deck) => {
      indent += 200;
      return (<DeckComponent key={indent} deck={deck} left={indent} top={150} />);
    });

    return (
      <div className="game-board">
        {deckComponents}
      </div>);
  }
}


GameBoard.propTypes = {
  gameState: PropTypes.instanceOf(GameState)
};

GameBoard.defaultProps = {
  gameState: null
};

export default GameBoard;
