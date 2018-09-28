import React from 'react';
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
      const actions = this.props.legalActions.filter(a => a.sourceDeckName === deck.getName());
      return (
        <DeckComponent key={indent} deck={deck} legalActions={actions} left={indent} top={150} />
      );
    });

    return (
      <div className="game-board">
        {deckComponents}
      </div>);
  }
}

export default GameBoard;
