import Card from '../Card';
import Deck from '../Deck';
import GameState from '../GameState';
import { Action, ActionType } from './Action';

class Move extends Action {
  constructor(sourceDeckName: string, private targetDeckName: string, sourceCardName: string) {
    super(ActionType.MOVE, sourceDeckName, sourceCardName);
  }

  public isLegal(gameState: GameState) {
    const targetDeck = this.getTargetDeck(gameState);
    return this.getSourceDeckName() !== this.targetDeckName
      && targetDeck.isAcceptingNewCards()
      && this.getCardsToMove(gameState).length > 0;
  }

  public execute(gameState: GameState) {
    const sourceDeck = gameState.getDeck(this.getSourceDeckName() || '');
    let targetDeck = this.getTargetDeck(gameState);
    const stackedDeck = gameState.getDecksByStack().get(targetDeck.getName());
    if (stackedDeck && stackedDeck.isEmpty()) {
      targetDeck = stackedDeck;
    }
    this.move(sourceDeck, targetDeck);
  }

  public getTargetDeckName() {
    return this.targetDeckName;
  }
  public getSourceDeck(gameState: GameState): Deck {
    const sourceDeck = gameState.getDeck(this.getSourceDeckName());
    if (!sourceDeck) {
      throw new Error(`Move action requires a source deck, ${this.getSourceDeckName()} not found`);
    }
    return sourceDeck;
  }
  public getTargetDeck(gameState: GameState): Deck {
    const targetDeck = gameState.getDeck(this.targetDeckName);
    if (!targetDeck) {
      throw new Error(`Move action requires a target deck, ${this.targetDeckName} not found`);
    }
    return targetDeck;
  }

  public getCardsToMove(gameState: GameState): Card[] {
    const sourceDeck = this.getSourceDeck(gameState);
    let sourceCard = sourceDeck.getCard(this.getSourceCardName());
    if (!sourceCard) {
      sourceCard = this.getCardsToMove.length > 0 ? sourceDeck.getTopCard() : undefined;
    }
    return sourceCard ? sourceDeck.getCardsToMoveWith(sourceCard) : [];
  }

  public toString() {
    return `${super.toString()} ${this.getSourceCardName()} from ${this.getSourceDeckName() || 'no source'} to ${this.targetDeckName}`;
  }

  protected move(sourceDeck: Deck, targetDeck: Deck) {
    let sourceCard = sourceDeck.getCard(this.getSourceCardName());
    if (!sourceCard) {
      sourceCard = sourceDeck.getTopCard();
    }
    const cards = sourceDeck.getCardsToMoveWith(sourceCard);
    sourceDeck.removeCards(cards);
    cards.forEach(card => targetDeck.pushCard(card));
  }
}

export default Move;
