import Action from '../../actions/Action';
import SkipTurn from '../../actions/SkipTurn';
import GameFactory from "../../GameFactory";
import RuleEngine, { ActionPlayability } from '../../internal/RuleEngine';
import GameState from '../../objects/GameState';
import Rule from '../Rule';

class CanOnlySkipTurnWhenStockEmpty extends Rule {
  public isLegal(action: Action, gameState: GameState): ActionPlayability {
    if (action instanceof SkipTurn) {
      const player = gameState.getPlayerTurn();
      const service = GameFactory.getGameService(gameState.getGameId());
      const playerIndex = service.getPlayers().indexOf(player) + 1;
      return RuleEngine.legalIf(
        gameState.getDeck(`Stock${playerIndex}`).isEmpty()
        && gameState.getDeck(`Stock${playerIndex}:top`).isEmpty()
      );
    }
    return ActionPlayability.LEGAL;
  }

}

export default CanOnlySkipTurnWhenStockEmpty;
