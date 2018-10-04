import Action from '../../actions/Action';
import Move from '../../actions/Move';
import Card from '../../objects/Card';
import GameState from '../../objects/GameState';
import Rule from '../Rule';

class AllowedCardsRule extends Rule {
  constructor(private targetDeck: string, private cardFilter: (card: Card) => boolean) {
    super()
  }

  public isLegal(action: Action, gameState: GameState): boolean {
    if (action instanceof Move) {
      const move = action as Move;
      if (move.getTargetDeckName() === this.targetDeck) {
        const sourceCards = move.getCardsToMove(gameState);
        return sourceCards.filter(this.cardFilter).length === sourceCards.length;
      }
    }
    return true;
  }
}

export default AllowedCardsRule;
