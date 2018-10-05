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
      const childDeck = stackedDecksMap.get(deck.getName());
      const selectCard = (card: Card) => this.executeTapAction(deck, card);
      const selectChildCard = (card: Card) => this.executeTapAction(childDeck!, card);
      const startDrag = (moveInProgress: MoveInProgress) => this.setState({ moveInProgress });
      const endDrag = (targetDeck: Deck) => this.executeMoveAction(targetDeck);
      const childDeckOffset = Math.min(10, deck.getCards().length);
      const left = deck.getPositionX() * 150 + 20;
      const top = deck.getPositionY() * 200 + 20;
      return (
        <DeckComponent key={index++} deck={deck} childDeck={childDeck} left={left} top={top}
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
