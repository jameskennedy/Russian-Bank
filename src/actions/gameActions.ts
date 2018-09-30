import Card from "../engine/objects/Card";
import Deck from "../engine/objects/Deck";

export const SELECT_CARD = 'SELECT_CARD';

export function selectCardAction(deck: Deck, card: Card) {
  return { type: SELECT_CARD, deck, card };
}
