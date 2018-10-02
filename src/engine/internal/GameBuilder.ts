import Action from '../objects/actions/Action';
import Card from '../objects/Card';
import CardSuit from '../objects/CardSuit';
import { Deck, DeckMode } from '../objects/Deck';
import Game from '../objects/Game';
import GameState from '../objects/GameState';
import CannotMoveIfNotFaceUp from '../rules/common/CannotMoveIfNotFaceUpRule';
import MaxDeckSizeRule from '../rules/common/MaxDeckSizeRule';
import RedBlackDescendingRule from '../rules/common/RedBlackDescendingRule';
import NoActionOnCoveredDeck from '../rules/fundamental/NoActionOnCoveredDeckRule';
import Rule from '../rules/Rule';

class GameBuilder {
  private decks: Deck[] = [];
  private rules: Rule[] = this.createStandardRules();
  private actions: Action[] = [];

  public addStandardCardDeck(name: string): GameBuilder {
    const cards = [];
    for (let i = 1; i <= 13; i += 1) {
      cards.push(new Card(i, CardSuit.HEARTS, false));
      cards.push(new Card(i, CardSuit.SPADES, false));
      cards.push(new Card(i, CardSuit.DIAMONDS, false));
      cards.push(new Card(i, CardSuit.CLUBS, false));
    }
    const deck = new Deck(name, DeckMode.FACE_DOWN, cards);
    deck.shuffle();
    this.decks.push(deck);
    return this;
  }

  public addDiscardDeck(name: string): GameBuilder {
    this.decks.push(new Deck(name, DeckMode.FACE_UP, [], true));
    return this;
  }

  public addHandDeck(name: string): GameBuilder {
    this.decks.push(new Deck(name, DeckMode.FAN_UP, [], true));
    return this;
  }

  public addRedBlackDescendingDeck(name: string): GameBuilder {
    this.decks.push(new Deck(name, DeckMode.SPREAD_DOWN, [], true));
    this.addRule(new RedBlackDescendingRule([name]));
    return this;
  }

  public addTopCardDeck(name: string, stackedOnDeckName: string): GameBuilder {
    const deck = new Deck(name, DeckMode.FACE_UP, [], true);
    const bottomDeck = this.decks.find(d => d.getName() === stackedOnDeckName);
    if (!bottomDeck) {
      throw new Error(`Referenced unknown dek ${stackedOnDeckName}`);
    }
    deck.setStackdOnDeck(bottomDeck);
    this.decks.push(deck);
    this.addRule(new MaxDeckSizeRule(1, [name]))
    return this;
  }

  public addRule(rule: Rule): GameBuilder {
    this.rules.push(rule);
    return this;
  }

  public addAction(action: Action): GameBuilder {
    this.actions.push(action);
    return this;
  }

  public create(gameId: number): Game {
    const initialState = new GameState(gameId, 0, this.decks);
    return new Game(initialState.getGameId(), initialState, [...this.rules], [...this.actions]);
  }


  private createStandardRules(): Rule[] {
    return [new CannotMoveIfNotFaceUp(), new NoActionOnCoveredDeck()];
  }
}

export default GameBuilder;
