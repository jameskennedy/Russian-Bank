import Move from '../../actions/Move';
import Deck from '../../objects/Deck';
import GameState from '../../objects/GameState';
import MoveActionRule from './MoveActionRule';

class LimitMoveSourceRule extends MoveActionRule {
  constructor(private sourceDeckWhiteList: string[], affectedDecks?: string[]) {
    super(affectedDecks)
  }

  protected isMoveLegal(move: Move, sourceDeck: Deck, targetDeck: Deck, gameState: GameState): boolean {
    if (!this.isCurrentPlayerAffected(gameState)) {
      return true;
    }
    return this.isCurrentPlayerAffected(gameState) && this.isSourceDeckInWhiteList(move.getSourceDeckName());
  }

  private isSourceDeckInWhiteList(sourceDeckName: string): boolean {
    return Boolean(this.sourceDeckWhiteList.find(name => name === sourceDeckName))
  }

}

export default LimitMoveSourceRule;
