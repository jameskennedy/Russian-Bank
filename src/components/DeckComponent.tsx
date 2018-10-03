import * as React from 'react';
import Action, { ActionType } from '../engine/objects/actions/Action';
import Card from '../engine/objects/Card';
import { Deck, DeckMode } from '../engine/objects/Deck';
import MoveInProgress from '../models/MoveInProgress';
import CardComponent from './CardComponent';

export interface IDeckProps {
  deck: Deck;
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
    if (deck.getMode() === DeckMode.FAN_UP) {
      cardComponents = this.createFannedCardComponents(cards);
    } else if (deck.getMode() === DeckMode.SPREAD_DOWN) {
      cardComponents = this.createSpreadDownCardComponents(cards);
    } else {
      cardComponents = this.createStackedCardComponents(cards);
    }

    const emptyClass = cards.length <= 0 ? 'empty' : '';
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

  private createFannedCardComponents(cards: Card[]) {
    const components = [];
    let voffset = 0;
    const isDraggable = this.deckCanBeMoveSource();
    for (let i = 0; i < cards.length; i += 1) {
      const startDrag = (card: Card) => this.handleBeginDragDrop([card]);
      voffset += (i > cards.length / 2 ? 1 : -1)
        * Math.abs((cards.length / 2) - i) * (20 / cards.length);
      components.push(<CardComponent key={i} card={cards[i]} left={i * 30} top={voffset}
        selectCard={this.props.selectCard}
        isDraggable={isDraggable}
        handleBeginDragDrop={startDrag} />);
    }
    return components;
  }

  private createSpreadDownCardComponents(cards: Card[]) {
    const components = [];
    const isDraggable = this.deckCanBeMoveSource();
    for (let i = 0; i < cards.length; i += 1) {
      const startDrag = (card: Card) => this.handleBeginDragDrop(cards.slice(i));
      components.push(<CardComponent key={i} card={cards[i]} left={0} top={i * 35}
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
    for (let i = 0; i < cardsToRender.length; i += 1) {
      components.push(<CardComponent key={i} left={i} top={i}
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

export default DeckComponent;
