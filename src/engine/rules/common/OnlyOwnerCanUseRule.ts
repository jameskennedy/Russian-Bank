import Action from '../../actions/Action';
import RuleEngine, { ActionPlayability } from '../../internal/RuleEngine';
import GameState from '../../objects/GameState';
import Rule from '../Rule';

class OnlyOwnerCanUseRule extends Rule {
  constructor(affectedDecks?: string[]) {
    super(affectedDecks);
  }

  public isLegal(action: Action, gameState: GameState): ActionPlayability {
    if (!action.getSourceDeckName()) {
      return ActionPlayability.LEGAL;
    }
    const sourceDeck = gameState.getDeck(action.getSourceDeckName());
    if (this.isAffectedDeck(sourceDeck)) {
      return RuleEngine.legalIf(sourceDeck.getOwner().getName() === gameState.getPlayerTurn().getName());
    }
    return ActionPlayability.LEGAL;
  }

}

export default OnlyOwnerCanUseRule;
