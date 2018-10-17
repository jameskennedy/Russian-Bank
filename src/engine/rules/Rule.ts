import Action from '../actions/Action';
import { ActionPlayability } from '../internal/RuleEngine';
import Deck from '../objects/Deck';
import GameState from '../objects/GameState';

class Rule {
  private affectedPlayers: string[] = [];
  constructor(private affectedDecks?: string[]) {

  }

  public isLegal(action: Action, gameState: GameState): ActionPlayability {
    return ActionPlayability.ILLEGAL;
  }

  public setAffectedPlayers(players: string[]) {
    this.affectedPlayers = [...players];
  }

  protected isCurrentPlayerAffected(gameState: GameState) {
    return !this.affectedPlayers || this.affectedPlayers.length === 0 || this.isAffectedPlayer(gameState.getPlayerTurn().getName());
  }

  protected isAffectedPlayer(playerName: string): boolean {
    return !!this.affectedPlayers.find(p => p === playerName);
  }

  protected isAffectedDeck(deck: Deck): boolean {
    return !this.affectedDecks
      || this.affectedDecks.find(name => name === deck.getName()) !== undefined;
  }
}

export default Rule;
