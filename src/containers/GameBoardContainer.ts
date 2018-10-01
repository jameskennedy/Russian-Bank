import {
  connect
} from 'react-redux';
import { Dispatch } from 'redux';
import { executeAction } from '../actions/gameActions';
import GameBoard from '../components/GameBoard';
import GameFactory from '../engine/GameFactory';
import Action from '../engine/objects/actions/Action';
import GameState from '../engine/objects/GameState';
import { IStore } from '../reducers';

interface IMapStateProps {
  gameState: GameState;
  legalActions: Action[];
}

interface IDispatchFromProps {
  executeAction: (action: Action) => void;
}

const mapStateToProps = (state: IStore) => {
  const gameState: GameState = state.gameState;
  let legalActions: Action[] = [];
  if (gameState) {
    legalActions = GameFactory.getGameService(gameState.getGameId()).getLegalActions(gameState);
  }
  return {
    gameState,
    legalActions
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    executeAction: (action: Action) => {
      console.log('dispatching: ' + action)
      dispatch(executeAction(action));
    }
  }
};

const GameBoardContainer = connect<IMapStateProps, IDispatchFromProps>(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard);

export default GameBoardContainer;