import * as React from 'react';
import Card from '../engine/objects/Card'

export interface ICardProps {
  left: number;
  top: number;
  card: Card;
  selectCard: (card: Card) => void;
}

class CardComponent extends React.PureComponent<ICardProps> {

  public render() {
    const styles: React.CSSProperties = {
      left: this.props.left,
      position: 'absolute',
      top: this.props.top
    };
    const faceUp = this.props.card.isFaceUp();
    const selectCard = () => this.props.selectCard(this.props.card);
    return (
      <div className={`card ${this.props.card.getSuit().getName()} ${faceUp ? 'face-up' : 'face-down'}`}
        style={styles}
        onClick={selectCard}>
        {faceUp && this.renderCardValue()}
      </div>);
  }

  private renderCardValue() {
    return (
      <div>
        <span>{this.props.card.toString()}</span>
        <span className="bottom-value">{this.props.card.toString()}</span>
      </div>
    );
  }
}

export default CardComponent;
