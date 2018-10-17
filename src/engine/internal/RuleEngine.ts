import Action from '../actions/Action';
import Game from '../objects/Game';
import GameState from '../objects/GameState';
import Rule from '../rules/Rule'

export enum ActionPlayability {
  LEGAL,
  ILLEGAL,
  COMPULSORY,
  EXCLUSIVE
}

class RuleEngine {
  public static legalIf(predicate: boolean): ActionPlayability {
    return predicate ? ActionPlayability.LEGAL : ActionPlayability.ILLEGAL;
  }

  constructor(private game: Game) {
  }

  public groupByLegality(actions: Action[], gameState: GameState): Map<ActionPlayability, Action[]> {
    return actions.reduce((map, action) => {
      const playability = this.isLegal(action, gameState);
      const actionGroup = map.get(playability) || [];
      actionGroup.push(action);
      map.set(playability, actionGroup);
      return map;
    }, new Map<ActionPlayability, Action[]>());
  }

  public isLegal(action: Action, gameState: GameState): ActionPlayability {
    if (!action.isLegal(gameState)) {
      return ActionPlayability.ILLEGAL;
    }
    const rules: Rule[] = this.game.getRules();
    const illegalMove = rules.find(r => r.isLegal(action, gameState) === ActionPlayability.ILLEGAL);
    return illegalMove ? ActionPlayability.ILLEGAL : ActionPlayability.LEGAL;
  }
}

export default RuleEngine;
