import GameService from './GameService';
import GameBuilder from './internal/GameBuilder';
import GameStateBuilder from './internal/GameStateBuilder';
import Game from './objects/Game';

class GameFactory {
  private activeGames: Game[] = [];

  public startRussianBankGame() {
    const builder = new GameBuilder();
    const gameId = builder.newUniqueGameId(this.activeGames);
    const fullDeck = builder.createStandardCardDeck('P1');
    const discardDeck = builder.createDiscardDeck('P1 Discard');
    const player1Hand = builder.createHandDeck('P1 Hand');
    const initialState = new GameStateBuilder()
      .createInitialState(gameId, [fullDeck, discardDeck, player1Hand]);
    const game = new Game(gameId, initialState);
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
}

const GLOBAL = new GameFactory();

export default GLOBAL;
