import Move from "../engine/actions/Move";
import Deck, { DeckMode } from "../engine/objects/Deck";
import GameState from "../engine/objects/GameState";
import MoveInProgress from "./MoveInProgress";

function createTransferDeck(moveAction: Move, gameState: GameState): Deck {
  const sourceDeck = moveAction.getSourceDeck(gameState);
  const targetDeck = moveAction.getTargetDeck(gameState);
  let sourceCard = sourceDeck.getCard(moveAction.getSourceCardName());
  if (!sourceCard) {
    sourceCard = sourceDeck.getTopCard();
  }
  if (!sourceCard) {
    throw new Error(`No source cards available for action ${moveAction}`);
  }
  const cards = sourceDeck.getCardsToMoveWith(sourceCard);
  if (!cards || cards.length === 0 || cards.find(c => !c)) {
    console.log(moveAction + ' has no source cards');
  }
  console.log('cards: ' + cards + ", " + sourceCard + " " + moveAction);
  const transferDeck = new Deck('--transfer--', targetDeck.getMode(), cards, false);
  if (sourceDeck.isFaceUp() && !transferDeck.isFaceUp()) {
    transferDeck.setDeckMode(DeckMode.FACE_UP);
  }
  transferDeck.setPosition(sourceDeck.getPositionX(), sourceDeck.getPositionY());
  return transferDeck;
}

class AIMoveInProgress extends MoveInProgress {
  constructor(private moveAction: Move, gameState: GameState) {
    super(moveAction.getSourceDeckName(), createTransferDeck(moveAction, gameState), moveAction.getTargetDeck(gameState));

  }

  public getAction() {
    return this.moveAction;
  }

}

export default AIMoveInProgress;
