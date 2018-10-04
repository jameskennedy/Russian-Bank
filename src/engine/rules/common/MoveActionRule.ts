import Action from '../../actions/Action';
import Move from '../../actions/Move';
import Deck from '../../objects/Deck';
import GameState from '../../objects/GameState';
import Rule from '../Rule';

class MoveActionRule extends Rule {
  constructor(affectedDecks?: string[]) {
    super(affectedDecks)
  }

  public isLegal(action: Action, gameState: GameState): boolean {
    if (action instanceof Move) {
      const move = action as Move;
      const sourceDeck = move.getSourceDeck(gameState);
      const targetDeck = move.getTargetDeck(gameState);
      return !this.isAffectedDeck(targetDeck) ||
        this.isMoveLegal(move, sourceDeck, targetDeck, gameState);
    }
    return true;
  }

  protected isMoveLegal(move: Move, sourceDeck: Deck, targetDeck: Deck, gameState: GameState): boolean {
    return true;
  }

}

export default MoveActionRule;
