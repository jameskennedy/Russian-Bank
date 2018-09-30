import * as React from 'react';
import Action from '../engine/objects/actions/Action';
import Card from '../engine/objects/Card';
import Deck from '../engine/objects/Deck';
import GameState from '../engine/objects/GameState';
import DeckComponent from './DeckComponent';

interface IGameBoardProps {
  gameState: GameState;
  legalActions: Action[];
  selectCard: (deck: Deck, card: Card) => void;
}

const deckCoords = {
  'P1': { left: 400, top: 400 },
  'P1 Discard': { left: 600, top: 400 }
}

export class GameBoard extends React.PureComponent<IGameBoardProps>  {

  public render() {
    const gameState = this.props.gameState;
    const isGameActive = !!gameState;
    if (!isGameActive) {
      return this.renderGameInactive();
    }

    let index = 0;
    const decks = gameState.getDecks();
    const stackedDecksMap: Map<string, Deck> = gameState.getDecksByStack();
    const deckComponents = decks.map((deck: Deck) => {
      if (deck.getStackdOnDeck()) {
        return undefined;
      }
      const coords = deckCoords[deck.getName()] || { left: 0, top: 0 };
      const childDeck = stackedDecksMap.get(deck.getName());
      const selectCard = (card: Card) => this.props.selectCard(deck, card);
      const selectChildCard = (card: Card) => this.props.selectCard(childDeck!, card);
      return (
        <DeckComponent key={index++} deck={deck} left={coords.left} top={coords.top}
          legalActions={this.getLegalActionsForDeck(deck)}
          selectCard={selectCard}>
          {childDeck && !childDeck.isEmpty() && <DeckComponent deck={childDeck}
            legalActions={this.getLegalActionsForDeck(childDeck)} left={0} top={0}
            selectCard={selectChildCard} />
          }
        </DeckComponent>
      );
    });

    return (
      <div className="game-board">
        {deckComponents}
      </div>);
  }

  private getLegalActionsForDeck(deck: Deck): Action[] {
    return this.props.legalActions.filter(a => a.getSourceDeckName() === deck.getName());
  }

  private renderGameInactive() {
    return (<p>Game not started</p>);
  }
}

export default GameBoard;
