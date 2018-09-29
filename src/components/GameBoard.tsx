import * as React from 'react';
import Action from '../engine/objects/actions/Action';
import Deck from '../engine/objects/Deck';
import GameState from '../engine/objects/GameState';
import DeckComponent from './DeckComponent';

interface IGameBoardProps {
  gameState: GameState;
  legalActions: Action[];
}


export class GameBoard extends React.PureComponent<IGameBoardProps>  {

  public render() {
    const gameState = this.props.gameState;
    const isGameActive = !!gameState;
    if (!isGameActive) {
      return this.renderGameInactive();
    }

    let indent = 0;
    const decks = gameState.getDecks();
    const deckComponents = decks.map((deck: Deck) => {
      indent += 200;
      const actions = this.props.legalActions.filter(a => a.getSourceDeckName() === deck.getName());
      return (
        <DeckComponent key={indent} deck={deck} legalActions={actions} left={indent} top={150} />
      );
    });

    return (
      <div className="game-board">
        {deckComponents}
      </div>);
  }

  private renderGameInactive() {
    return (<p>Game not started</p>);
  }
}

export default GameBoard;
