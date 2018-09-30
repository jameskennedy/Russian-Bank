import Action from '../../objects/actions/Action';
import Move from '../../objects/actions/Move';
import GameState from '../../objects/GameState';
import Rule from '../Rule';

class LimitMoveSourceRule extends Rule {
  constructor(private sourceDeckWhiteList: string[], affectedDecks?: string[]) {
    super(affectedDecks)
  }

  public isLegal(action: Action, gameState: GameState): boolean {
    if (action instanceof Move) {
      const move = action as Move;
      const targetDeck = move.getTargetDeck(gameState);
      return !this.isAffectedDeck(targetDeck) || this.isSourceDeckInWhiteList(action.getSourceDeckName());
    }
    return true;
  }

  private isSourceDeckInWhiteList(sourceDeckName: string): boolean {
    return Boolean(this.sourceDeckWhiteList.find(name => name === sourceDeckName))
  }

}

export default LimitMoveSourceRule;
