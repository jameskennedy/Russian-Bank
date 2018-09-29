import Action from '../engine/objects/actions/Action';
import GameStateBuilder from './internal/GameStateBuilder';
import RuleEngine from './internal/RuleEngine';
import Move from './objects/actions/Move';
import Game from './objects/Game';
import GameState from './objects/GameState';

class GameService {
  private ruleEngine: RuleEngine = new RuleEngine();
  private gameStateBuilder = new GameStateBuilder();
  constructor(private game: Game) {
  }

  public getCopyOfCurrentGameState() {
    const currentState = this.game.getCurrentGameState();
    return this.gameStateBuilder.copyGameState(currentState);
  }

  public getLegalActions(gameState: GameState = this.game.getCurrentGameState()): Action[] {
    const actions: Action[] = [];
    const decks = gameState.getDecks();
    decks.forEach((sourceDeck) => {
      decks.forEach((targetDeck) => {
        if (sourceDeck !== targetDeck) {
          const move = new Move(sourceDeck.getName(), targetDeck.getName());
          if (this.ruleEngine.isLegal(move, gameState)) {
            actions.push(move);
          }
        }
      });
    });

    return actions;
  }

  public executeAction(action: Action) {
    const isLegal = this.ruleEngine.isLegal(action, this.game.getCurrentGameState());
    if (!isLegal) {
      throw new Error(`Not a legal move: ${action}`);
    }
    const newState = this.getCopyOfCurrentGameState();
    action.execute(newState);
    this.game.advanceState(newState);
    return this.game.getCurrentGameState();
  }
}

export default GameService;
