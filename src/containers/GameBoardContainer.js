import {
  connect
} from 'react-redux';
import assert from 'assert-js';
import GameFactory from '../engine/GameFactory';
import GameBoard from '../components/GameBoard';
import GameState from '../engine/objects/GameState';

const mapStateToProps = (state) => {
  const gameState = state.gameState;
  let legalActions = [];
  if (gameState) {
    legalActions = GameFactory.getGameService(gameState.getGameId()).getLegalActions(gameState);
    assert.instanceOf(gameState, GameState);
  }
  return {
    gameState,
    legalActions
  };
};

const mapDispatchToProps = () => {
  const map = {};
  return map;
};

const GameBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard);

export default GameBoardContainer;
