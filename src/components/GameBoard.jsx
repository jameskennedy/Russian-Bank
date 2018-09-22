import React from 'react';
import Card from '../engine/Card';
import CardComponent from './CardComponent';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="game-board">
        <CardComponent card={new Card(1, Card.SUITS.HEARTS, false)} left={0} top={0} />
        <CardComponent card={new Card(2, Card.SUITS.CLUBS, true)} left={100} top={20} />
        <CardComponent card={new Card(11, Card.SUITS.DIAMONDS, true)} left={200} top={40} />
        <CardComponent card={new Card(13, Card.SUITS.SPADES, true)} left={300} top={60} />

        <CardComponent card={new Card(12, Card.SUITS.SPADES, true)} left={250} top={50} />
      </div>);
  }
}


GameBoard.propTypes = {
};

GameBoard.defaultProps = {
};

export default GameBoard;
