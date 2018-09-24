import { connect } from 'react-redux';
import assert from 'assert-js';
import GameBoard from '../components/GameBoard';
import GameState from '../engine/objects/GameState';

const mapStateToProps = (state) => {
  const gameState = state.gameState;
  if (gameState) {
    assert.instanceOf(gameState, GameState);
  }
  return { gameState };
};

const mapDispatchToProps = () => {
  const map = {
  };
  return map;
};

const GameBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard);

export default GameBoardContainer;
