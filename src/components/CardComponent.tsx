import * as React from 'react';
import Card from '../engine/objects/Card'

export interface ICardProps {
  left: number;
  top: number;
  card: Card;
  isDraggable: boolean;
  selectCard: (card: Card) => void;
  handleBeginDragDrop: (card: Card) => void;
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
    const onDrag = (e: React.DragEvent) => this.props.handleBeginDragDrop(this.props.card);
    return (
      <div className={`card ${this.props.card.getSuit().getName()} ${faceUp ? 'face-up' : 'face-down'} ${this.props.card.getName()}`}
        draggable={this.props.isDraggable}
        onDragStart={onDrag}
        style={styles}
        onClick={selectCard}>
        {faceUp && this.renderCardValue()}
      </div>);
  }

  private renderCardValue() {
    return (
      <div className="card-text">
        <span>{this.props.card.toString()}</span>
        <span className="bottom-value">{this.props.card.toString()}</span>
      </div>
    );
  }
}

export default CardComponent;
