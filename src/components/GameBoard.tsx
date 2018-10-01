import * as React from 'react';
import Action from '../engine/objects/actions/Action';
import Move from '../engine/objects/actions/Move';
import Card from '../engine/objects/Card';
import Deck from '../engine/objects/Deck';
import GameState from '../engine/objects/GameState';
import MoveInProgress from '../models/MoveInProgress';
import DeckComponent from './DeckComponent';

interface IGameBoardProps {
  gameState: GameState;
  legalActions: Action[];
  selectCard: (deck: Deck, card: Card) => void;
  executeAction: (action: Action) => void;
}

interface IGameBoardState {
  moveInProgress: MoveInProgress
}

const deckCoords = {
  'Clubs': { left: 420, top: 20 },
  'Diamonds': { left: 620, top: 20 },
  'Hearts': { left: 220, top: 20 },
  'P1': { left: 400, top: 400 },
  'P1 Discard': { left: 600, top: 400 },
  'Spades': { left: 20, top: 20 }
}

export class GameBoard extends React.Component<IGameBoardProps, IGameBoardState>  {

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
      const startDrag = (moveInProgress: MoveInProgress) => this.setState({ moveInProgress });
      const endDrag = (targetDeck: Deck) => this.executeMoveAction(targetDeck);
      return (
        <DeckComponent key={index++} deck={deck} left={coords.left} top={coords.top}
          legalActions={this.getLegalActionsForDeck(deck)}
          selectCard={selectCard}
          handleBeginDragDrop={startDrag}
          handleEndDragDrop={endDrag}>
          {childDeck && !childDeck.isEmpty() && <DeckComponent deck={childDeck}
            legalActions={this.getLegalActionsForDeck(childDeck)} left={0} top={0}
            selectCard={selectChildCard}
            handleBeginDragDrop={startDrag}
            handleEndDragDrop={endDrag} />
          }
        </DeckComponent>
      );
    });

    return (
      <div className="game-board">
        {deckComponents}
      </div>);
  }

  private executeMoveAction(targetDeck: Deck) {
    const moveAction = this.props.legalActions.filter(a => a instanceof Move).map(a => a as Move)
      .find(a => a.getSourceDeckName() === this.state.moveInProgress.getSourceDeck()
        && a.getTargetDeckName() === targetDeck.getName());
    if (moveAction) {
      this.props.executeAction(moveAction);
    }
  }

  private getLegalActionsForDeck(deck: Deck): Action[] {
    return this.props.legalActions.filter(a => a.getSourceDeckName() === deck.getName());
  }

  private renderGameInactive() {
    return (<p>Game not started</p>);
  }
}

export default GameBoard;
