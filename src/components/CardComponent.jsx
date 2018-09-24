import React from 'react';
import PropTypes from 'prop-types';
import Card from '../engine/objects/Card';

class CardComponent extends React.Component {
  renderCardValue() {
    return (
      <div>
        <span>{this.props.card.toString()}</span>
        <span className="bottom-value">{this.props.card.toString()}</span>
      </div>
    );
  }

  render() {
    const styles = {
      position: 'absolute',
      left: this.props.left,
      top: this.props.top
    };
    const faceUp = this.props.card.isFaceUp();
    return (
      <div className={`card ${this.props.card.getSuit().getName()} ${faceUp ? 'face-up' : 'face-down'}`} style={styles}>
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
