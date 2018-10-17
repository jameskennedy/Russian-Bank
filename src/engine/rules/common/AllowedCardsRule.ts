import Action from '../../actions/Action';
import Move from '../../actions/Move';
import RuleEngine, { ActionPlayability } from '../../internal/RuleEngine';
import Card from '../../objects/Card';
import Deck from '../../objects/Deck';
import GameState from '../../objects/GameState';
import Rule from '../Rule';

class AllowedCardsRule extends Rule {
  constructor(private targetDeck: string, private cardFilter: (card: Card, targetDeck: Deck) => boolean) {
    super()
  }

  public isLegal(action: Action, gameState: GameState): ActionPlayability {
    if (action instanceof Move) {
      const move = action as Move;
      const sourceDeck = move.getSourceDeck(gameState);
      const targetDeck = move.getTargetDeck(gameState);
      if (targetDeck.getName() === this.targetDeck && targetDeck.getStackedOnDeck() !== sourceDeck) {
        const sourceCards = move.getCardsToMove(gameState);
        return RuleEngine.legalIf(sourceCards.length > 0 && this.cardFilter(sourceCards[0], targetDeck));
      }
    }
    return ActionPlayability.LEGAL;
  }
}

export default AllowedCardsRule;
