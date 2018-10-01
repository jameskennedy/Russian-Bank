import Action from "../engine/objects/actions/Action";
import Card from "../engine/objects/Card";
import Deck from "../engine/objects/Deck";

export const SELECT_CARD = 'SELECT_CARD';
export const EXECUTE_ACTION = 'EXECUTE_ACTION';

export function selectCardAction(deck: Deck, card: Card) {
  return { type: SELECT_CARD, deck, card };
}

export function executeAction(action: Action) {
  return { type: EXECUTE_ACTION, action };
}
