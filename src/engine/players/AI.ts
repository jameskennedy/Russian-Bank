import Action from "../actions/Action";
import GameService from "../GameService";

interface IArtificialPlayer {
  nextAction(gameService: GameService): Action | undefined;
}

export default IArtificialPlayer;
