import Action from './actions/Action';
import FlipTopCard from './actions/FlipTopCard';
import Move from './actions/Move';
import SkipTurn from './actions/SkipTurn';
import TapDeck from './actions/TapDeck';
import RuleEngine, { ActionPlayability } from './internal/RuleEngine';
import Deck, { DeckMode } from './objects/Deck';
import Game from './objects/Game';
import GameState, { GameStatus } from './objects/GameState';

class GameService {
  private ruleEngine: RuleEngine = new RuleEngine(this.game);
  constructor(private game: Game) {
  }

  public getCopyOfCurrentGameState() {
    const currentState = this.game.getCurrentGameState();
    return currentState.createCopy();
  }

  public getLegalAIActions(gameState: GameState = this.game.getCurrentGameState()): Action[] {
    return this.getLegalActions().filter(a => !(a instanceof TapDeck));
  }

  public getLegalActions(gameState: GameState = this.game.getCurrentGameState()): Action[] {
    if (gameState.getStatus() !== GameStatus.IN_PLAY) {
      return [];
    }
    const possibleActions = this.determinePossibleActions(gameState);
    const actionPlayability: Map<ActionPlayability, Action[]> = this.ruleEngine.groupByLegality(possibleActions, gameState);
    let legalActions = actionPlayability.get(ActionPlayability.LEGAL) || [];
    const exclusiveActions = actionPlayability.get(ActionPlayability.EXCLUSIVE) || [];
    if (exclusiveActions.length !== 0) {
      legalActions = exclusiveActions;
    }
    console.debug(`Legal legalActions: ${legalActions}`);
    return legalActions;
  }

  public getLegalActionsForDeck(deck: Deck): any {
    return this.getLegalActions().filter(a => a.getSourceDeckName() === deck.getName());
  }

  public executeAction(action: Action): GameState {
    const legality = this.ruleEngine.isLegal(action, this.game.getCurrentGameState());
    if (legality === ActionPlayability.ILLEGAL) {
      throw new Error(`Not a legal move: ${action}`);
    }
    const newState = this.getCopyOfCurrentGameState();
    newState.setPreviousAction(action);
    newState.setActionInProgress(undefined);
    newState.setStatusMessage('');

    this.triggerBeforeActionEvents(newState, action);
    action.execute(newState);
    this.triggerAfterActionEvents(newState, action);
    this.game.advanceState(newState);

    if (newState.getStatus() === GameStatus.IN_PLAY) {
      this.startAIPlayerAction(newState);
      if (newState.getActionInProgress() instanceof SkipTurn) {
        return this.executeAction(newState.getActionInProgress()!);
      }
    }

    return this.game.getCurrentGameState();
  }

  public endTurn(gameState: GameState) {
    const players = this.getPlayers();
    const index = players.findIndex(p => p === gameState.getPlayerTurn());
    const nextPlayer = players[(index + 1) % players.length];
    gameState.setPlayerTurn(nextPlayer);
    gameState.setStatusMessage(`${nextPlayer.getName()} go!`);
  }

  public getPlayers() {
    return [...this.game.getPlayers()];
  }

  private determinePossibleActions(gameState: GameState): Action[] {
    const possibleActions: Action[] = this.game.getGameActions();
    const decks: Deck[] = gameState.getDecks();
    decks.forEach((sourceDeck) => {
      if (sourceDeck.getMode() === DeckMode.FACE_DOWN) {
        possibleActions.push(new FlipTopCard(sourceDeck.getName()));
      }
      else {
        decks.forEach((targetDeck) => {
          if (sourceDeck !== targetDeck) {
            sourceDeck.getMovableCards().forEach(card => possibleActions.push(new Move(sourceDeck.getName(), targetDeck.getName(), card.getName())));
          }
        });
      }
    });
    return possibleActions;
  }

  private triggerBeforeActionEvents(gameState: GameState, action: Action) {
    this.game.getEvents().forEach(e => e.beforeAction(gameState, action));
  }

  private triggerAfterActionEvents(gameState: GameState, action: Action) {
    this.game.getEvents().forEach(e => e.afterAction(gameState, action));
  }

  private startAIPlayerAction(gameState: GameState) {
    const ai = gameState.getPlayerTurn().getAI();
    if (ai) {
      gameState.setActionInProgress(ai.nextAction(this));
    }
  }
}

export default GameService;
