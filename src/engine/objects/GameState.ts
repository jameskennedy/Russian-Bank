import Action from "../actions/Action";
import Player from "../players/Player";
import Deck from "./Deck";

export enum GameStatus {
  IN_PLAY = "IN_PLAY",
  FINISHED = "FINISHED"
}

class GameState {
  private actionInProgress?: Action;
  private playerTurn: Player;
  private status: GameStatus = GameStatus.IN_PLAY;

  constructor(public gameId: Readonly<number>, private id: number, private previousAction: Action, private decks: Deck[]) {
    this.decks = decks.slice();
  }

  public getStateId() {
    return this.id;
  }

  public getGameId(): number {
    return this.gameId;
  }

  public getStatus(): GameStatus {
    return this.status;
  }

  public setStatus(status: GameStatus) {
    this.status = status;
  }

  public getDecks() {
    return this.decks;
  }

  public getDeck(name: string) {
    const deck = this.decks.find(d => d.getName() === name);
    if (!deck) {
      throw new Error(`Deck ${name} not found`);
    }
    return deck;
  }

  public getDecksByStack(): Map<string, Deck> {
    return this.decks.reduce((map, deck) => {
      if (deck.getStackedOnDeck()) {
        map.set(deck.getStackedOnDeck()!.getName(), deck);
      }
      return map;
    }, new Map<string, Deck>());
  }

  public setActionInProgress(action?: Action) {
    this.actionInProgress = action;
  }

  public getActionInProgress(): Action | undefined {
    return this.actionInProgress;
  }

  public setPreviousAction(action: Action) {
    this.previousAction = action;
  }

  public getPreviousAction(): Action {
    return this.previousAction;
  }

  public getPlayerTurn(): Player {
    return this.playerTurn;
  }

  public setPlayerTurn(player: Player) {
    this.playerTurn = player;
  }

  public createCopy(): GameState {
    const id = this.getStateId() + 1;
    const oldNewMap = this.getDecks().reduce((map, oldDeck) => {
      map.set(oldDeck.getName(), oldDeck.createCopy());
      return map;
    }, new Map<string, Deck>());

    const decks = Array.from(oldNewMap.values());
    this.copyDeckReferences(oldNewMap);
    const newState = new GameState(this.gameId, id, this.previousAction, decks);
    newState.setPlayerTurn(this.getPlayerTurn());
    newState.setActionInProgress(this.getActionInProgress());
    newState.previousAction = this.previousAction;
    newState.status = this.status;
    return newState;
  }

  public getVictoryMessage(): string {
    if (this.status === GameStatus.FINISHED) {
      return `${this.playerTurn.getName()} wins!`;
    }
    return "Game in progress";
  }

  public toString(): string {
    let decks = '';
    this.decks.forEach(deck => {
      decks += `${deck.getName()}: ${deck.getCards()} \n`;
    });
    return `Game state ${this.getStateId()}:\n${decks}`;
  }

  private copyDeckReferences(oldNewMap: Map<string, Deck>) {
    this.getDecks().forEach(deck => {
      if (deck.getStackedOnDeck()) {
        const oldFlipToDeck = deck.getStackedOnDeck()!;
        const newDeck = oldNewMap.get(deck.getName());
        if (newDeck) {
          const newFlipToDeck = oldNewMap.get(oldFlipToDeck.getName());
          if (newFlipToDeck) {
            newDeck.setStackedOnDeck(newFlipToDeck);
          }
        }
      }
    });
  }
}

export default GameState;
