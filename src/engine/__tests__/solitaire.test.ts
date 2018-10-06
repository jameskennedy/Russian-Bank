import GameFactory from '../GameFactory';
import GameState from '../objects/GameState';


const gameService = GameFactory.startSolitaireGame();
const initialGameState = gameService.getCopyOfCurrentGameState();

function expectCardCount(deck: string, expectedCardCount: number, gameState: GameState = initialGameState) {
  expect(gameState.getDeck(deck).getCards()).toHaveLength(expectedCardCount);
}

function getMovesForDeck(gameState: GameState, deckName: string) {
  return gameService.getLegalActionsForDeck(gameState.getDeck(deckName));
}

describe('Solitaire', () => {
  test('starts with right decks populated correctly', () => {
    expect(initialGameState.getDecks()).toHaveLength(21);
    expectCardCount('Stock', 24);
    expectCardCount('Stock:top', 0);
    expectCardCount('Waste', 0);
    expectCardCount('Foundation 1', 0);
    expectCardCount('Foundation 2', 0);
    expectCardCount('Foundation 3', 0);
    expectCardCount('Foundation 4', 0);
    expectCardCount('House feeder 1', 6);
    expectCardCount('House feeder 2', 5);
    expectCardCount('House feeder 3', 4);
    expectCardCount('House feeder 4', 3);
    expectCardCount('House feeder 5', 2);
    expectCardCount('House feeder 6', 1);
    expectCardCount('House feeder 7', 0);
    expectCardCount('House 1', 1);
    expectCardCount('House 2', 1);
    expectCardCount('House 3', 1);
    expectCardCount('House 4', 1);
    expectCardCount('House 5', 1);
    expectCardCount('House 6', 1);
    expectCardCount('House 7', 1);
  });

  test('can flip top card of stock deck', () => {
    const topCard = initialGameState.getDeck('Stock').getTopCard();
    const legalMoves = getMovesForDeck(initialGameState, 'Stock');
    expect(legalMoves).toHaveLength(1);
    const gameState = gameService.executeAction(legalMoves[0]);

    expectCardCount('Stock', 23, gameState);
    expectCardCount('Stock:top', 1, gameState);
    expect(gameState.getDeck('Stock:top').getTopCard().getName()).toBe(topCard.getName());
    expect(gameState.getDeck('Stock:top').getTopCard().isFaceUp()).toBeTruthy();
  });
});
