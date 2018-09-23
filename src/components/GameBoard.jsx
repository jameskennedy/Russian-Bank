import React from 'react';
import Card from '../engine/Card';
import Deck from '../engine/Deck';
import CardComponent from './CardComponent';
import DeckComponent from './DeckComponent';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const cards = [];
    for (let i = 0; i < 1; i += 1) {
      cards.push(new Card((i % 13) + 1, Card.SUITS.HEARTS, true));
    }
    const deck1 = new Deck('deck', Deck.DeckMode.FACE_UP, cards);
    const emptyDeck = new Deck('deck', Deck.DeckMode.FACE_UP);

    return (
      <div className="game-board">
        <CardComponent card={new Card(1, Card.SUITS.HEARTS, false)} left={0} top={0} />
        <CardComponent card={new Card(2, Card.SUITS.CLUBS, true)} left={100} top={20} />
        <CardComponent card={new Card(11, Card.SUITS.DIAMONDS, true)} left={200} top={40} />
        <CardComponent card={new Card(13, Card.SUITS.SPADES, true)} left={300} top={60} />

        <CardComponent card={new Card(12, Card.SUITS.SPADES, true)} left={250} top={50} />

        <DeckComponent deck={deck1} left={250} top={150} />
        <DeckComponent deck={emptyDeck} left={350} top={150} />
      </div>);
  }
}


GameBoard.propTypes = {
};

GameBoard.defaultProps = {
};

export default GameBoard;
