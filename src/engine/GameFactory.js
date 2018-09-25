import {
  List
} from 'immutable';
import Game from './objects/Game';
import GameService from './GameService';
import GameBuilder from './internal/GameBuilder';
import GameStateBuilder from './internal/GameStateBuilder';

class GameFactory {
  constructor() {
    this.activeGames = [];
  }

  startRussianBankGame() {
    const builder = new GameBuilder();
    const gameId = builder.newUniqueGameId(this.activeGames);
    const fullDeck = builder.createStandardCardDeck('P1');
    const discardDeck = builder.createDiscardDeck('P1 Discard');
    const player1Hand = builder.createHandDeck('P1 Hand');
    const initialState = new GameStateBuilder()
      .createInitialState(gameId, [fullDeck, discardDeck, player1Hand]);
    const players = List([]);
    const rules = List([]);
    const game = new Game(gameId, players, initialState, rules);
    this.activeGames.push(game);
    return new GameService(game);
  }

  getGameService(gameId) {
    const foundGame = this.activeGames.find(game => game.gameId === gameId);
    if (!foundGame) {
      throw new Error(`Could not find game with id ${gameId}`);
    }
    return new GameService(foundGame);
  }
}

const GLOBAL = new GameFactory();

export default GLOBAL;
