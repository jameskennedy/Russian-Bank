import React from 'react';
import PropTypes from 'prop-types';
import Card from '../engine/Card';

class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.card, left: props.left, top: props.top };
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
    const faceUp = this.state.value.isFaceUp();
    return (
      <div className={`card ${this.state.value.getSuit().getName()} ${faceUp ? 'face-up' : 'face-down'}`} style={styles}>
        {faceUp && this.renderCardValue()}
      </div>);
  }
}

CardComponent.propTypes = {
  card: PropTypes.instanceOf(Card).isRequired,
  left: PropTypes.number,
  top: PropTypes.number
};

CardComponent.defaultProps = {
  left: 0,
  top: 0
};

export default CardComponent;
