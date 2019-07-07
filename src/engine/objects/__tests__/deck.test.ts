
import Player from '../../players/Player';
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

  test('can be copied, preserving non-card object references', () => {
    const card = new Card(1, CardSuit.HEARTS, true);
    const deck = new Deck('discard', DeckMode.FACE_DOWN, [card], true);
    const stackedOnDeck = new Deck('stack', DeckMode.FACE_DOWN, [], true);
    const owner = new Player('player');
    deck.setStackedOnDeck(stackedOnDeck);
    deck.setOwner(owner);

    const copy = deck.createCopy();

    expect(copy.getName()).toEqual('discard');
    expect(copy.getMode()).toEqual(DeckMode.FACE_DOWN);
    expect(copy.isAcceptingNewCards()).toEqual(true);
    expect(copy.getCards()[0]).toEqual(card);
    expect(copy.getCards()[0]).not.toBe(card);
    expect(copy.getOwner()).toBe(owner);
    expect(copy.getStackedOnDeck()).toBe(stackedOnDeck);
  });
});
