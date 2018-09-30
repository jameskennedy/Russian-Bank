import Card from '../Card';
import CardSuit from '../CardSuit';
import Deck, { DeckMode } from '../Deck';

describe('Deck', () => {

  test('does not accepts new cards by default', () => {
    expect(new Deck('discard', DeckMode.FACE_DOWN, []).isAcceptingNewCards()).toBeFalsy();
  });

  test('can contain cards', () => {
    const card = new Card(1, CardSuit.HEARTS, true);
    expect(new Deck('discard', DeckMode.FACE_DOWN, [card]).getCards()).toContain(card);
  });

  test('has string representation', () => {
    expect(new Deck('discard', DeckMode.FACE_DOWN, []).toString()).toEqual('discard deck');
  });

  test('can get top card', () => {
    const cardA = new Card(1, CardSuit.HEARTS, true);
    const deck = new Deck('discard', DeckMode.FACE_DOWN, [], true);

    expect(deck.getTopCard()).toBeUndefined();
    deck.pushCard(cardA);
    expect(deck.getTopCard()).toEqual(cardA);
  });

  test('push and pop cards', () => {
    const cardA = new Card(1, CardSuit.HEARTS, true);
    const cardB = new Card(1, CardSuit.HEARTS, true);
    const deck = new Deck('discard', DeckMode.FACE_DOWN, [], true);

    deck.pushCard(cardA);

    expect(deck.getTopCard()).toEqual(cardA);

    deck.pushCard(cardB);

    expect(deck.getTopCard()).toEqual(cardB);

    const poppedCard = deck.popCard();

    expect(poppedCard).toEqual(cardB);
    expect(deck.getTopCard()).toEqual(cardA);
  });

  test('has undefined card popped off of empty deck', () => {
    const deck = new Deck('discard', DeckMode.FACE_DOWN, [], true);

    const poppedCard = deck.popCard();

    expect(poppedCard).toBeUndefined();
  });
});
