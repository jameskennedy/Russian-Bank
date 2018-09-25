import assert from 'assert-js';
import GameState from '../objects/GameState';
import Action from '../objects/actions/Action';

class RuleEngine {
  isLegal(action, gameState) {
    assert.instanceOf(action, Action);
    assert.instanceOf(gameState, GameState);
    return action.isLegal(gameState);
  }
}

export default RuleEngine;
