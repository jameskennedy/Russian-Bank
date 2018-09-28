import React from 'react';

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
      left: this.props.left,
      position: 'absolute',
      top: this.props.top
    };
    const faceUp = this.props.card.isFaceUp();
    return (
      <div className={`card ${this.props.card.getSuit().getName()} ${faceUp ? 'face-up' : 'face-down'}`} style={styles}>
        {faceUp && this.renderCardValue()}
      </div>);
  }
}

export default CardComponent;
