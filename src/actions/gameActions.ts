import Action from "../engine/objects/actions/Action";

export const EXECUTE_ACTION = 'EXECUTE_ACTION';

export function executeAction(action: Action) {
  return { type: EXECUTE_ACTION, action };
}
