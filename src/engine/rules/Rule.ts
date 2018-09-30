import Action from '../objects/actions/Action';
import Deck from '../objects/Deck';
import GameState from '../objects/GameState';

class Rule {
  constructor(private affectedDecks?: string[]) {

  }
  public isLegal(action: Action, gameState: GameState): boolean {
    return false;
  }

  protected isAffectedDeck(deck: Deck): boolean {
    return !this.affectedDecks
      || this.affectedDecks.find(name => name === deck.getName()) !== undefined;
  }
}

export default Rule;
