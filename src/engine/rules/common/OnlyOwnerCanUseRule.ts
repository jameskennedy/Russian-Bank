import Action from '../../actions/Action';
import GameState from '../../objects/GameState';
import Rule from '../Rule';

class OnlyOwnerCanUseRule extends Rule {
  constructor(affectedDecks?: string[]) {
    super(affectedDecks);
  }

  public isLegal(action: Action, gameState: GameState): boolean {
    const sourceDeck = gameState.getDeck(action.getSourceDeckName());
    if (this.isAffectedDeck(sourceDeck)) {
      return sourceDeck.getOwner().getName() === gameState.getPlayerTurn().getName();
    }
    return true;
  }

}

export default OnlyOwnerCanUseRule;
