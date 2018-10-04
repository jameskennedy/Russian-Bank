import Move from '../../objects/actions/Move';
import Deck from '../../objects/Deck';
import GameState from '../../objects/GameState';
import MoveActionRule from './MoveActionRule';

class LimitMoveTargetRule extends MoveActionRule {
  constructor(private sourceDecks: string[], private targetDeckWhiteList: string[]) {
    super()
  }

  protected isMoveLegal(move: Move, sourceDeck: Deck, targetDeck: Deck, gameState: GameState): boolean {
    if (!this.sourceDecks.find(s => sourceDeck.getName() === s)) {
      return true;
    }
    return this.isTargetDeckInWhiteList(move.getTargetDeckName());
  }

  private isTargetDeckInWhiteList(targetDeckName: string): boolean {
    return Boolean(this.targetDeckWhiteList.find(name => name === targetDeckName))
  }

}

export default LimitMoveTargetRule;
