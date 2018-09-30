import Action from '../engine/objects/actions/Action';
import GameStateBuilder from './internal/GameStateBuilder';
import RuleEngine from './internal/RuleEngine';
import FlipTopCard from './objects/actions/FlipTopCard';
import Move from './objects/actions/Move';
import Deck, { DeckMode } from './objects/Deck';
import Game from './objects/Game';
import GameState from './objects/GameState';

class GameService {
  private ruleEngine: RuleEngine = new RuleEngine(this.game);
  private gameStateBuilder = new GameStateBuilder();
  constructor(private game: Game) {
  }

  public getCopyOfCurrentGameState() {
    const currentState = this.game.getCurrentGameState();
    return this.gameStateBuilder.copyGameState(currentState);
  }

  public getLegalActions(gameState: GameState = this.game.getCurrentGameState()): Action[] {
    const possibleActions: Action[] = [];
    const decks: Deck[] = gameState.getDecks();
    decks.forEach((sourceDeck) => {
      if (sourceDeck.getMode() === DeckMode.FACE_DOWN) {
        possibleActions.push(new FlipTopCard(sourceDeck.getName()));

      } else {
        decks.forEach((targetDeck) => {
          if (sourceDeck !== targetDeck) {
            possibleActions.push(new Move(sourceDeck.getName(), targetDeck.getName()));
          }
        })
      }
    });

    const legalActions = possibleActions.filter(a => this.ruleEngine.isLegal(a, gameState));

    console.debug(`Legal legalActions: ${legalActions} Possible actions: ${possibleActions}`);
    return legalActions;
  }

  public getLegalActionsForDeck(deck: Deck): any {
    return this.getLegalActions().filter(a => a.getSourceDeckName() === deck.getName());
  }

  public executeAction(action: Action) {
    const isLegal = this.ruleEngine.isLegal(action, this.game.getCurrentGameState());
    if (!isLegal) {
      throw new Error(`Not a legal move: ${action}`);
    }
    const newState = this.getCopyOfCurrentGameState();
    action.execute(newState);
    this.game.advanceState(newState);
    console.debug(`*** Game step ${newState.getStateId()}: ${action} ***`);
    return this.game.getCurrentGameState();
  }
}

export default GameService;
