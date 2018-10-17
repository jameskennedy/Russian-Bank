import Move from '../../actions/Move';
import RuleEngine, { ActionPlayability } from '../../internal/RuleEngine';
import Deck from '../../objects/Deck';
import GameState from '../../objects/GameState';
import MoveActionRule from './MoveActionRule';

class LimitMoveTargetRule extends MoveActionRule {
  constructor(private sourceDecks: string[], private targetDeckWhiteList: string[]) {
    super()
  }

  protected isMoveLegal(move: Move, sourceDeck: Deck, targetDeck: Deck, gameState: GameState): ActionPlayability {
    if (!this.sourceDecks.find(s => sourceDeck.getName() === s)) {
      return ActionPlayability.LEGAL;
    }
    return RuleEngine.legalIf(this.isTargetDeckInWhiteList(move.getTargetDeckName()));
  }

  private isTargetDeckInWhiteList(targetDeckName: string): boolean {
    return Boolean(this.targetDeckWhiteList.find(name => name === targetDeckName))
  }

}

export default LimitMoveTargetRule;
