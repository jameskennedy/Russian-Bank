import Card from '../Card';
import CardSuit from '../CardSuit';

describe('Card', () => {
  test('verifies rank', () => {
    expect(new Card(1, CardSuit.HEARTS, true).getRank()).toEqual(1);
    expect(new Card(13, CardSuit.HEARTS, true).getRank()).toEqual(13);
    expect(() => new Card(0, CardSuit.HEARTS, true)).toThrowError();
    expect(() => new Card(14, CardSuit.HEARTS, true)).toThrowError();
  });

  test('is face-down by default', () => {
    expect(new Card(1, CardSuit.HEARTS).isFaceUp()).toBe(false);
  });

  test('can be face-up', () => {
    expect(new Card(1, CardSuit.HEARTS, true).isFaceUp()).toBe(true);
  });

  test('has string representation', () => {
    expect(new Card(1, CardSuit.HEARTS, true).toString()).toEqual('A♥');
    expect(new Card(11, CardSuit.SPADES, true).toString()).toEqual('J♠');
    expect(new Card(12, CardSuit.CLUBS, true).toString()).toEqual('Q♣');
    expect(new Card(13, CardSuit.DIAMONDS, true).toString()).toEqual('K♦');
    expect(new Card(2, CardSuit.DIAMONDS, true).toString()).toEqual('2♦');
  });
});
