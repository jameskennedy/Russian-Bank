import assert from 'assert-js';

class ActionType {
  constructor(name) {
    this.name = name;
  }
}

ActionType.MOVE = new ActionType('move');

class Action {
  constructor(type) {
    assert.instanceOf(type, ActionType);
    this.type = type;
  }

  getType() {
    return this.type;
  }

  isLegal() {
    return true;
  }

  toString() {
    return `${this.type}`;
  }
}

Action.ActionType = ActionType;

export default Action;
