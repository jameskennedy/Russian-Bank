import GameService from './GameService';
import GameBuilder from './internal/GameBuilder';
import GameStateBuilder from './internal/GameStateBuilder';
import Game from './objects/Game';
import LimitMoveSourceRule from './rules/common/LimitMoveSourceRule';
import MaxDeckSizeRule from './rules/common/MaxDeckSizeRule';
import Rule from './rules/Rule'

class GameFactory {
  private activeGames: Game[] = [];

  public startRussianBankGame() {
    const builder = new GameBuilder();
    const gameId = builder.newUniqueGameId(this.activeGames);
    const fullDeck = builder.createStandardCardDeck('P1');
    const topOfFullDeck = builder.createTopCardDeck('P1:top', fullDeck);
    const discardDeck = builder.createDiscardDeck('P1 Discard');
    const initialState = new GameStateBuilder()
      .createInitialState(gameId, [fullDeck, topOfFullDeck, discardDeck]);
    const rules: Rule[] = builder.createStandardRules();
    rules.push(new MaxDeckSizeRule(1, [topOfFullDeck.getName()]));
    rules.push(new LimitMoveSourceRule([fullDeck.getName()], [topOfFullDeck.getName()]));
    const game = new Game(gameId, initialState, rules);
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
