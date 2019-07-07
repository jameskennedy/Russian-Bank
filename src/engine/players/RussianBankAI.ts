import Action, { ActionType } from "../actions/Action";
import Move from "../actions/Move";
import GameService from "../GameService";
import GameState from "../objects/GameState";
import IArtificialPlayer from "./AI";

class RussianBankAI implements IArtificialPlayer {
  public nextAction(gameService: GameService): Action | undefined {
    const legalActions = gameService.getLegalAIActions();
    if (legalActions.length === 0) {
      return undefined;
    }
    const gameState = gameService.getCopyOfCurrentGameState();
    legalActions.sort((a, b) => this.score(b, gameState) - this.score(a, gameState));
    console.log(`AI chose ${legalActions[0]} with score ${this.score(legalActions[0], gameState)}`)
    return legalActions[0];
  }

  private score(action: Action, gameState: GameState): number {
    if (action.getType() === ActionType.FLIP || action.getType() === ActionType.SKIP) {
      return -1;
    }
    if (action instanceof Move) {
      const move = action as Move;
      const sourceDeck = move.getSourceDeck(gameState);
      const targetDeck = move.getTargetDeck(gameState);
      const targetDeckOwner = targetDeck.getOwner();
      if (targetDeckOwner) {
        if (targetDeckOwner.getAI() !== this) {
          return targetDeck.getName().includes('Reserve') ? 2 : 1;
        } else {
          return -1;
        }
      }
      if (targetDeck.getName().includes('Foundation')) {
        return +3;
      }
      if (targetDeck.getName().includes('House')) {
        if (sourceDeck.getOwner() && sourceDeck.getOwner().getAI() === this) {
          return 1;
        }
        if (sourceDeck.getName().includes('House')) {
          const takesASpace = targetDeck.isEmpty();
          const canCreateSpace = sourceDeck.getCards().length - move.getCardsToMove(gameState).length < 1 && !takesASpace;
          return canCreateSpace ? 2 : -1;
        }
      }

    }
    return 0;
  }
}

export default RussianBankAI;
