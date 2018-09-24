import React from 'react';
import PropTypes from 'prop-types';
import Deck from '../engine/objects/Deck';
import CardComponent from './CardComponent';

class DeckComponent extends React.Component {
  createFannedCardComponents(cards) {
    const components = [];
    let voffset = 0;
    for (let i = 0; i < cards.length; i += 1) {
      voffset += (i > cards.length / 2 ? 1 : -1)
        * Math.abs((cards.length / 2) - i) * (20 / cards.length);
      components.push(<CardComponent key={i} card={cards[i]} left={i * 30} top={voffset} />);
    }
    return components;
  }

  createStackedCardComponents(cards) {
    const topCards = Math.min(cards.length, 10);
    const cardsToRender = cards.slice(cards.length - topCards, cards.length);
    const components = [];
    for (let i = 0; i < cardsToRender.length; i += 1) {
      components.push(<CardComponent key={i} card={cardsToRender[i]} left={i} top={i + 200} />);
    }
    return components;
  }

  render() {
    console.debug('render deck');
    const styles = {
      position: 'absolute',
      left: this.props.left,
      top: this.props.top
    };
    const deck = this.props.deck;
    const cards = deck.getCards();
    let cardComponents = [];
    if (deck.getMode() === Deck.DeckMode.FAN_UP) {
      cardComponents = this.createFannedCardComponents(cards);
    } else {
      cardComponents = this.createStackedCardComponents(cards);
    }

    return (
      <div className={`deck ${cards.length <= 0 ? 'empty' : ''}`} style={styles}>
        {cardComponents}
      </div>);
  }
}

DeckComponent.propTypes = {
  deck: PropTypes.instanceOf(Deck).isRequired,
  left: PropTypes.number,
  top: PropTypes.number
};

DeckComponent.defaultProps = {
  left: 0,
  top: 0
};

export default DeckComponent;
