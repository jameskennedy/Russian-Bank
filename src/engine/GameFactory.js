import {
  List
} from 'immutable';
import Game from './objects/Game';
import GameState from './objects/GameState';
import GameService from './GameService';
import GameBuilder from './internal/GameBuilder';

class GameFactory {
  constructor() {
    this.activeGames = [];
  }

  startRussianBankGame() {
    const builder = new GameBuilder();
    const id = builder.newUniqueGameId(this.activeGames);
    const fullDeck = new GameBuilder().createStandardCardDeck();
    const initialState = new GameState([fullDeck]);
    const players = List([]);
    const rules = List([]);
    const game = new Game(id, players, initialState, rules);
    this.activeGames.push(game);
    return new GameService(game);
  }
}

const GLOBAL = new GameFactory();

export default GLOBAL;
