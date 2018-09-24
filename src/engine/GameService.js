class GameService {
  constructor(game) {
    this.game = game;
  }

  getCurrentGameState() {
    return this.game.getCurrentGameState();
  }
}

export default GameService;
