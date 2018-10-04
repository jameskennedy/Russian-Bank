import Action from "../engine/actions/Action";

export const EXECUTE_ACTION = 'EXECUTE_ACTION';

export function executeAction(action: Action) {
  return { type: EXECUTE_ACTION, action };
}
