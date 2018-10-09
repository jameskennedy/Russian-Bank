import * as React from 'react';
import Action, { ActionType } from '../engine/actions/Action';
import Move from '../engine/actions/Move';
import Card from '../engine/objects/Card';
import Deck from '../engine/objects/Deck';
import GameState from '../engine/objects/GameState';
import AIMoveInProgress from '../models/AIMoveInProgress';
import MoveInProgress from '../models/MoveInProgress';
import AnimatedDeckComponent from './AnimatedDeckComponent';
import DeckComponent, { getCardOffsetX, getCardOffsetY } from './DeckComponent';

interface IGameBoardProps {
  gameState: GameState;
  legalActions: Action[];
  executeAction: (action: Action) => void;
  moveInProgress?: AIMoveInProgress;
}

interface IGameBoardState {
  dragInProgress?: MoveInProgress;
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
      const startDrag = (dragInProgress: MoveInProgress) => this.setState({ dragInProgress });
      const endDrag = (targetDeck: Deck) => this.executeMoveAction(targetDeck, this.state.dragInProgress);
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
        {this.props.moveInProgress && this.renderAnimatedDeck(gameState)}
      </div>);
  }

  private executeMoveAction(targetDeck: Deck, moveInProgress?: MoveInProgress) {
    if (moveInProgress) {
      const sourceCard = moveInProgress.getTransferDeck().getCards()[0];
      const moveAction = this.props.legalActions.filter(a => a instanceof Move).map(a => a as Move)
        .find(a => a.getSourceDeckName() === moveInProgress.getSourceDeck()
          && a.getTargetDeckName() === targetDeck.getName()
          && (!a.getSourceCardName() || a.getSourceCardName() === sourceCard.getName()));
      if (moveAction) {
        this.props.executeAction(moveAction);
      }
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

  private renderAnimatedDeck(gameState: GameState) {
    if (this.props.moveInProgress) {
      const move = this.props.moveInProgress;
      const transferDeck = move.getTransferDeck();
      const targetDeck = move.getTargetDeck()!;
      const srcDeck = gameState.getDeck(move.getSourceDeck());
      const srcDeckIndex = srcDeck.getCards().length - transferDeck.getCards().length;
      const srcOffsetX = getCardOffsetX(srcDeck, srcDeckIndex)
      const srcOffsetY = getCardOffsetY(srcDeck, srcDeckIndex);
      const startX = this.getDeckCoordinateX(srcDeck.getPositionX()) + srcOffsetX;
      const startY = this.getDeckCoordinateY(srcDeck.getPositionY()) + srcOffsetY;

      let stopX = startX;
      let stopY = startY;
      if (targetDeck) {
        const offsetX = getCardOffsetX(targetDeck);
        const offsetY = getCardOffsetY(targetDeck);
        stopX = this.getDeckCoordinateX(targetDeck.getPositionX()) + offsetX;
        stopY = this.getDeckCoordinateY(targetDeck.getPositionY()) + offsetY;
      }
      const onComplete = () => this.props.executeAction(move.getAction());
      return (
        <AnimatedDeckComponent animationComplete={onComplete}
          deck={transferDeck}
          startLeft={startX} startTop={startY} endLeft={stopX} endTop={stopY}
          secondsToComplete={1} />
      )
    }
    return undefined;
  }

  private getDeckCoordinateX(position: number): number {
    return position * 150 + 20;
  }

  private getDeckCoordinateY(position: number): number {
    return position * 200 + 20;
  }
}

export default GameBoard;
