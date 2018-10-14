import * as React from 'react';
import Action, { ActionType } from '../engine/actions/Action';
import Card from '../engine/objects/Card';
import { Deck, DeckMode } from '../engine/objects/Deck';
import MoveInProgress from '../models/MoveInProgress';
import CardComponent from './CardComponent';

const VERTICAL_SPREAD = 35;

const HORIZONTAL_SPREAD = 30;

export interface IDeckProps {
  deck: Deck;
  childDeck?: Deck;
  left: number;
  top: number;
  legalActions: Action[];
  selectCard: (card: Card) => void;
  handleBeginDragDrop: (moveInProgress: MoveInProgress) => void;
  handleEndDragDrop: (deck: Deck) => void;
}

class DeckComponent extends React.PureComponent<IDeckProps> {
  public render() {
    const styles: React.CSSProperties = {
      left: this.props.left,
      position: 'absolute',
      top: this.props.top
    };
    const deck = this.props.deck;
    const cards = deck.getCards();
    let cardComponents = [];
    if (deck.getMode() === DeckMode.FACE_UP || deck.getMode() === DeckMode.FACE_DOWN) {
      cardComponents = this.createStackedCardComponents(cards);
    } else {
      cardComponents = this.createSpreadCardComponents(cards);
    }

    const emptyClass = cards.length <= 0 && (!this.props.childDeck || this.props.childDeck.getCards().length === 0) ? 'empty' : '';
    const actionableClass = this.props.legalActions.length === 0 ? '' : 'actionable';
    const onDragDrop = (ev: React.DragEvent) => this.props.handleEndDragDrop(deck);
    const onDragOver = (ev: React.DragEvent) => ev.preventDefault();
    return (
      <div className={`deck ${emptyClass} ${actionableClass}`} style={styles}
        onDrop={onDragDrop} onDragOver={onDragOver}>
        {cardComponents}
        {this.props.children}
      </div>);
  }

  private createSpreadCardComponents(cards: Card[]) {
    const deck = this.props.deck;
    const components = [];
    const isDraggable = this.deckCanBeMoveSource();
    for (let i = 0; i < cards.length; i += 1) {
      const startDrag = (card: Card) => this.handleBeginDragDrop([card]);
      components.push(<CardComponent key={i} card={cards[i]} left={getCardOffsetX(deck, i)} top={getCardOffsetY(deck, i)}
        selectCard={this.props.selectCard}
        isDraggable={isDraggable}
        handleBeginDragDrop={startDrag} />);
    }
    return components;
  }

  private createStackedCardComponents(cards: Card[]) {
    const topCards = Math.min(cards.length, 10);
    const cardsToRender = cards.slice(cards.length - topCards, cards.length);
    const components = [];
    const isDraggable = this.deckCanBeMoveSource();
    const startDrag = (card: Card) => this.handleBeginDragDrop([card]);
    const deck = this.props.deck;
    for (let i = 0; i < cardsToRender.length; i += 1) {
      components.push(<CardComponent key={i} left={getCardOffsetX(deck, i)} top={getCardOffsetY(deck, i)}
        card={cardsToRender[i]}
        selectCard={this.props.selectCard}
        isDraggable={isDraggable}
        handleBeginDragDrop={startDrag} />);
    }
    return components;
  }

  private deckCanBeMoveSource() {
    return Boolean(this.props.legalActions.find(a => a.getType() === ActionType.MOVE));
  }

  private handleBeginDragDrop(cards: Card[]) {
    const transferDeck = new Deck('drag deck', DeckMode.FACE_UP, cards, false);
    this.props.handleBeginDragDrop(new MoveInProgress(this.props.deck.getName(), transferDeck));
  }
}

export const getCardOffsetX = (deck: Deck, cardIndex?: number) => {
  const mode = deck.getMode();
  const index = cardIndex === undefined ? deck.getCards().length : cardIndex;
  if (mode === DeckMode.SPREAD_RIGHT) {
    return index * HORIZONTAL_SPREAD;
  }
  if (mode === DeckMode.SPREAD_LEFT) {
    return index * HORIZONTAL_SPREAD * -1;
  }
  return index;
}

export const getCardOffsetY = (deck: Deck, cardIndex?: number) => {
  const mode = deck.getMode();
  const numCards = deck.getCards().length;
  const index = cardIndex === undefined ? numCards : cardIndex;
  if (mode === DeckMode.SPREAD_DOWN) {
    return index * VERTICAL_SPREAD;
  }
  if (mode === DeckMode.FAN_UP) {
    let offset = 0;
    for (let i = 0; i <= index; i++) {
      offset += (i > numCards / 2 ? 1 : -1)
        * Math.abs((numCards / 2) - i) * (20 / numCards);
    }
    return offset;
  }
  return index;
}

export default DeckComponent;
