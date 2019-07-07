import Action from "../actions/Action";
import GameService from "../GameService";
import IArtificialPlayer from "./AI";

class RandomActionAI implements IArtificialPlayer {
  public nextAction(gameService: GameService): Action | undefined {
    const legalActions = gameService.getLegalAIActions();
    if (legalActions.length === 0) {
      return undefined;
    }
    return legalActions[Math.floor(Math.random() * legalActions.length)];
  }
}

export default RandomActionAI;
