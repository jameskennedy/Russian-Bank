import GameService from './GameService';
import GameBuilder from './internal/GameBuilder';
import FlipDeck from './objects/actions/FlipDeck';
import Game from './objects/Game';
import LimitMoveSourceRule from './rules/common/LimitMoveSourceRule';
import SameSuitIncreasingRankRule from './rules/common/SameSuitIncreasingRankRule';

class GameFactory {
  private activeGames: Game[] = [];

  public startSolitaireGame() {
    const game = new GameBuilder().addStandardCardDeck('P1')
      .addTopCardDeck('P1:top', 'P1')
      .addRule(new LimitMoveSourceRule(['P1'], ['P1:top']))
      .addDiscardDeck('P1 Discard')
      .addRule(new LimitMoveSourceRule(['P1:top'], ['P1 Discard']))
      .addAction(new FlipDeck('P1 Discard', 'P1'))
      .addDiscardDeck('Suit Pile 1')
      .addDiscardDeck('Suit Pile 2')
      .addDiscardDeck('Suit Pile 3')
      .addDiscardDeck('Suit Pile 4')
      .addRule(new SameSuitIncreasingRankRule(['Suit Pile 1', 'Suit Pile 2', 'Suit Pile 3', 'Suit Pile 4']))
      .addRedBlackDescendingDeck('House 1')
      .addRedBlackDescendingDeck('House 2')
      .addRedBlackDescendingDeck('House 3')
      .addRedBlackDescendingDeck('House 4')
      .addRedBlackDescendingDeck('House 5')
      .addRedBlackDescendingDeck('House 6')
      .addRedBlackDescendingDeck('House 7')
      .dealCards((gameState) => {
        const mainDeck = gameState.getDeck('P1');
        for (let i = 1; i <= 7; i++) {
          const houseDeck = gameState.getDeck('House ' + i);
          for (let j = 1; j <= (7 - i + 1); j++) {
            houseDeck.pushCard(mainDeck.popCard()!);
          }
        }
      })
      .create(this.newUniqueGameId());



    this.activeGames.push(game);
    return new GameService(game);
  }

  public getGameService(gameId: number) {
    const foundGame = this.activeGames.find(game => game.getGameId() === gameId);
    if (!foundGame) {
      throw new Error(`Could not find game with id ${gameId}`);
    }
    return new GameService(foundGame);
  }

  private newUniqueGameId() {
    for (let newId = 0; newId < 1000; newId += 1) {
      if (!this.activeGames.find(game => game.getGameId() === newId)) {
        return newId;
      }
    }
    throw new Error('Failed to assign a unique game id');
  }
}

const GLOBAL = new GameFactory();

export default GLOBAL;
