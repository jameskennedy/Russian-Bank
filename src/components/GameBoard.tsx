import * as React from 'react';
import Action, { ActionType } from '../engine/actions/Action';
import Move from '../engine/actions/Move';
import Card from '../engine/objects/Card';
import Deck from '../engine/objects/Deck';
import GameState from '../engine/objects/GameState';
import MoveInProgress from '../models/MoveInProgress';
import DeckComponent from './DeckComponent';

interface IGameBoardProps {
  gameState: GameState;
  legalActions: Action[];
  executeAction: (action: Action) => void;
}

interface IGameBoardState {
  moveInProgress: MoveInProgress
}

const deckCoords = {
  'Foundation 1': { left: 20, top: 20 },
  'Foundation 2': { left: 170, top: 20 },
  'Foundation 3': { left: 320, top: 20 },
  'Foundation 4': { left: 470, top: 20 },
  'House feeder 1': { left: 20, top: 200 },
  'House feeder 2': { left: 170, top: 200 },
  'House feeder 3': { left: 320, top: 200 },
  'House feeder 4': { left: 470, top: 200 },
  'House feeder 5': { left: 620, top: 200 },
  'House feeder 6': { left: 770, top: 200 },
  'House feeder 7': { left: 910, top: 200 },
  'Stock': { left: 910, top: 20 },
  'Waste': { left: 770, top: 20 }
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
      if (deck.getStackedOnDeck()) {
        return undefined;
      }
      const coords = deckCoords[deck.getName()] || { left: 0, top: 0 };
      const childDeck = stackedDecksMap.get(deck.getName());
      const selectCard = (card: Card) => this.executeTapAction(deck, card);
      const selectChildCard = (card: Card) => this.executeTapAction(childDeck!, card);
      const startDrag = (moveInProgress: MoveInProgress) => this.setState({ moveInProgress });
      const endDrag = (targetDeck: Deck) => this.executeMoveAction(targetDeck);
      const childDeckOffset = Math.min(10, deck.getCards().length);
      return (
        <DeckComponent key={index++} deck={deck} childDeck={childDeck} left={coords.left} top={coords.top}
          legalActions={this.getLegalActionsForDeck(deck)}
          selectCard={selectCard}
          handleBeginDragDrop={startDrag}
          handleEndDragDrop={endDrag}>
          {childDeck && !childDeck.isEmpty() && <DeckComponent deck={childDeck}
            legalActions={this.getLegalActionsForDeck(childDeck)} left={childDeckOffset} top={childDeckOffset}
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
    const moveInProgress = this.state.moveInProgress;
    const sourceCard = moveInProgress.getTransferDeck().getCards()[0];
    const moveAction = this.props.legalActions.filter(a => a instanceof Move).map(a => a as Move)
      .find(a => a.getSourceDeckName() === moveInProgress.getSourceDeck()
        && a.getTargetDeckName() === targetDeck.getName()
        && (!a.getSourceCardName() || a.getSourceCardName() === sourceCard.getName()));
    if (moveAction) {
      this.props.executeAction(moveAction);
    }
  }

  private executeTapAction(targetDeck: Deck, targetCard: Card) {
    const action = this.props.legalActions
      .filter(a => (a.getType() === ActionType.TAP || a.getType() === ActionType.FLIP))
      .find(a => a.getSourceDeckName() === targetDeck.getName());
    if (action) {
      this.props.executeAction(action);
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
