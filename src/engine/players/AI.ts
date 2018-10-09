import Action from "../actions/Action";
import GameService from "../GameService";

class AI {
  public nextAction(gameService: GameService): Action | undefined {
    const legalActions = gameService.getLegalAIActions();
    if (legalActions.length === 0) {
      return undefined;
    }
    return legalActions[Math.floor(Math.random() * legalActions.length)];
  }
}

export default AI;
