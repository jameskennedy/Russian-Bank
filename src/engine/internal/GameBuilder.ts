import Action, { ActionType } from '../actions/Action';
import GameEvent from '../events/GameEvent';
import Card from '../objects/Card';
import CardSuit from '../objects/CardSuit';
import { Deck, DeckMode } from '../objects/Deck';
import Game from '../objects/Game';
import GameState from '../objects/GameState';
import AI from '../players/AI';
import Player from '../players/Player';
import CannotMoveIfNotFaceUp from '../rules/common/CannotMoveIfNotFaceUpRule';
import LimitMoveSourceRule from '../rules/common/LimitMoveSourceRule';
import MaxDeckSizeRule from '../rules/common/MaxDeckSizeRule';
import RedBlackDescendingRule from '../rules/common/RedBlackDescendingRule';
import NoActionOnCoveredDeck from '../rules/fundamental/NoActionOnCoveredDeckRule';
import Rule from '../rules/Rule';

class GameBuilder {
  private decks: Deck[] = [];
  private rules: Rule[] = this.createStandardRules();
  private actions: Action[] = [];
  private players: Player[] = [];
  private events: GameEvent[] = [];
  private deal?: (gameState: GameState) => void;

  public addStandardCardDeck(name: string, x: number, y: number): GameBuilder {
    const cards = [];
    for (let i = 1; i <= 13; i += 1) {
      cards.push(new Card(i, CardSuit.HEARTS, false));
      cards.push(new Card(i, CardSuit.SPADES, false));
      cards.push(new Card(i, CardSuit.DIAMONDS, false));
      cards.push(new Card(i, CardSuit.CLUBS, false));
    }
    const deck = new Deck(name, DeckMode.FACE_DOWN, cards, false);
    deck.setPosition(x, y);
    deck.shuffle();
    this.decks.push(deck);
    return this;
  }

  public addEmptyFaceDownDeck(name: string, x: number, y: number) {
    const deck = new Deck(name, DeckMode.FACE_DOWN, [], true);
    deck.setPosition(x, y);
    this.decks.push(deck);
    return this;
  }

  public addDiscardDeck(name: string, x: number, y: number): GameBuilder {
    const deck = new Deck(name, DeckMode.FACE_UP, [], true);
    deck.setPosition(x, y);
    this.decks.push(deck);
    return this;
  }

  public addHandDeck(name: string, x: number, y: number): GameBuilder {
    const deck = new Deck(name, DeckMode.FAN_UP, [], true);
    deck.setPosition(x, y);
    this.decks.push(deck);
    return this;
  }

  public addRedBlackDescendingDeck(name: string, x: number, y: number): GameBuilder {
    const deck = new Deck(name, DeckMode.SPREAD_DOWN, [], true);
    this.decks.push(deck);
    deck.setPosition(x, y);
    this.addRule(new RedBlackDescendingRule([name]));
    return this;
  }

  public addTopCardDeck(name: string, stackedOnDeckName: string): GameBuilder {
    const deck = new Deck(name, DeckMode.FACE_UP, [], true);
    this.decks.push(deck);
    this.stackDeckOnTopOf(name, stackedOnDeckName);
    this.addRule(new MaxDeckSizeRule(1, [name]));
    this.addRule(new LimitMoveSourceRule([stackedOnDeckName], [name]))
    return this;
  }

  public stackDeckOnTopOf(deckName: string, stackedOnDeckName: string): GameBuilder {
    const deck = this.getDeck(deckName);
    const bottomDeck = this.getDeck(stackedOnDeckName);
    if (!bottomDeck) {
      throw new Error(`Referenced unknown dek ${stackedOnDeckName}`);
    }
    deck.setStackedOnDeck(bottomDeck);
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

  public addEvent(event: GameEvent): GameBuilder {
    this.events.push(event);
    return this;
  }

  public addPlayer(name: string, ai?: AI): GameBuilder {
    const player = new Player(name, ai);
    this.players.push(player);
    return this;
  }

  public dealCards(deal: (gameState: GameState) => void): GameBuilder {
    this.deal = deal;
    return this;
  }

  public create(gameId: number): Game {
    const initialState = new GameState(gameId, 0, new Action(ActionType.GAME_START, ''), this.decks);
    if (this.deal) {
      this.deal(initialState);
    }
    if (this.players.length === 0) {
      throw new Error("Game has no players defined");
    }
    initialState.setPlayerTurn(this.players[0]);
    return new Game(initialState.getGameId(), initialState, [...this.rules], [...this.actions], [...this.players], [...this.events]);
  }

  private getDeck(name: string) {
    const deck = this.decks.find(d => d.getName() === name);
    if (!deck) {
      throw new Error(`Referenced unknown deck ${name}`);
    }
    return deck;
  }

  private createStandardRules(): Rule[] {
    return [new CannotMoveIfNotFaceUp(), new NoActionOnCoveredDeck()];
  }
}

export default GameBuilder;
