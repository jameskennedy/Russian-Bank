import * as React from 'react';
import Action from '../engine/objects/actions/Action';
import Card from '../engine/objects/Card';
import { Deck, DeckMode } from '../engine/objects/Deck';
import CardComponent from './CardComponent';

export interface IDeckProps {
  deck: Deck;
  left: number;
  top: number;
  legalActions: Action[];
  selectCard: (card: Card) => void;
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
    } else {
      cardComponents = this.createStackedCardComponents(cards);
    }

    const emptyClass = cards.length <= 0 ? 'empty' : '';
    const actionableClass = this.props.legalActions.length === 0 ? '' : 'actionable';

    return (
      <div className={`deck ${emptyClass} ${actionableClass}`} style={styles}>
        {cardComponents}
        {this.props.children}
      </div>);
  }

  private createFannedCardComponents(cards: Card[]) {
    const components = [];
    let voffset = 0;
    for (let i = 0; i < cards.length; i += 1) {
      voffset += (i > cards.length / 2 ? 1 : -1)
        * Math.abs((cards.length / 2) - i) * (20 / cards.length);
      components.push(<CardComponent key={i} card={cards[i]} left={i * 30} top={voffset}
        selectCard={this.props.selectCard} />);
    }
    return components;
  }

  private createStackedCardComponents(cards: Card[]) {
    const topCards = Math.min(cards.length, 10);
    const cardsToRender = cards.slice(cards.length - topCards, cards.length);
    const components = [];
    for (let i = 0; i < cardsToRender.length; i += 1) {
      components.push(<CardComponent key={i} left={i} top={i}
        card={cardsToRender[i]}
        selectCard={this.props.selectCard} />);
    }
    return components;
  }
}

export default DeckComponent;
