import Deck from '../Deck';
import Card from '../Card';

describe('Deck', () => {
  test('verifies deck mode', () => {
    expect(() => new Deck('discard', null)).toThrowError();
    expect(() => new Deck('discard', {})).toThrowError();
    expect(() => new Deck('discard', '')).toThrowError();
  });

  test('verifies name', () => {
    expect(() => new Deck({}, Deck.DeckMode.FACE_DOWN)).toThrowError();
    expect(() => new Deck(null, Deck.DeckMode.FACE_DOWN)).toThrowError();
  });

  test('has empty card list by default', () => {
    expect(new Deck('discard', Deck.DeckMode.FACE_DOWN).getCards()).toHaveLength(0);
  });

  test('can contain cards', () => {
    const card = new Card(1, Card.SUITS.HEARTS);
    expect(new Deck('discard', Deck.DeckMode.FACE_DOWN, [card]).getCards()).toContain(card);
  });

  test('has string representation', () => {
    expect(new Deck('discard', Deck.DeckMode.FACE_DOWN).toString()).toEqual('discard Deck');
  });
});
