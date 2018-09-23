import React from 'react';
import PropTypes from 'prop-types';
import assert from 'assert-js';
import Deck from '../engine/Deck';
import CardComponent from './CardComponent';

class DeckComponent extends React.Component {
  constructor(props) {
    super(props);
    assert.instanceOf(props.deck, Deck);
    this.state = { value: props.deck, left: props.left, top: props.top };
  }
  renderCardValue() {
    return (
      <div>
        <span>{this.state.value.toString()}</span>
        <span className="bottom-value">{this.state.value.toString()}</span>
      </div>
    );
  }

  render() {
    const styles = {
      position: 'absolute',
      left: this.state.left,
      top: this.state.top
    };
    const rows = [];
    const cards = this.state.value.getCards();
    const topCards = Math.min(cards.length, 10);
    for (let i = 0; i < topCards; i += 1) {
      const index = (cards.length - topCards) + i;
      rows.push(<CardComponent key={i} card={cards[index]} left={i} top={i} />);
    }
    return (
      <div className={`deck ${cards.length <= 0 ? 'empty' : ''}`} style={styles}>
        {rows}
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
