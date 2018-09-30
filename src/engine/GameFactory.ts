import GameService from './GameService';
import GameBuilder from './internal/GameBuilder';
import Game from './objects/Game';
import LimitMoveSourceRule from './rules/common/LimitMoveSourceRule';

class GameFactory {
  private activeGames: Game[] = [];

  public startRussianBankGame() {
    const game = new GameBuilder().addStandardCardDeck('P1')
      .addTopCardDeck('P1:top', 'P1')
      .addRule(new LimitMoveSourceRule(['P1'], ['P1:top']))
      .addDiscardDeck('P1 Discard')
      .addDiscardDeck('Spades')
      .addDiscardDeck('Hearts')
      .addDiscardDeck('Clubs')
      .addDiscardDeck('Diamonds')
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
