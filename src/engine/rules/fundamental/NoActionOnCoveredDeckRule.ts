import Action, { ActionType } from '../../objects/actions/Action';
import Move from '../../objects/actions/Move';
import GameState from '../../objects/GameState';
import Rule from '../Rule';

class NoActionOnCoveredDeck extends Rule {
  public isLegal(action: Action, gameState: GameState): boolean {
    return this.canCoveredDeckBeSource(gameState, action) && this.canCoveredDeckBeTarget(gameState, action);
  }

  private canCoveredDeckBeSource(gameState: GameState, action: Action): boolean {
    const sourceDeck = gameState.getDeck(action.getSourceDeckName());
    const coveringDeck = gameState.getDecksByStack().get(sourceDeck.getName());
    return !Boolean(coveringDeck) || coveringDeck!.isEmpty();
  }

  private canCoveredDeckBeTarget(gameState: GameState, action: Action): boolean {
    if (action.getType() === ActionType.MOVE) {
      const move = action as Move;
      const targetDeck = gameState.getDeck(move.getTargetDeckName());
      const coveringDeck = gameState.getDecksByStack().get(targetDeck.getName());
      return !coveringDeck || coveringDeck.isEmpty();
    }
    return true;
  }
}

export default NoActionOnCoveredDeck;
