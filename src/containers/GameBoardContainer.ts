import {
  connect
} from 'react-redux';
import { Dispatch } from 'redux';
import { executeAction } from '../actions/gameActions';
import GameBoard from '../components/GameBoard';
import Action from '../engine/actions/Action';
import Move from '../engine/actions/Move';
import GameFactory from '../engine/GameFactory';
import GameState from '../engine/objects/GameState';
import AIMoveInProgress from '../models/AIMoveInProgress';
import { IStore } from '../reducers';

interface IMapStateProps {
  gameState: GameState;
  legalActions: Action[];
  moveInProgress?: AIMoveInProgress;
}

interface IDispatchFromProps {
  executeAction: (action: Action) => void;
}

function setupAnimatedAction(gameState: GameState): AIMoveInProgress | undefined {
  const aiAction = gameState.getActionInProgress();
  if (aiAction && aiAction instanceof Move) {
    return new AIMoveInProgress(aiAction, gameState);
  }
  return undefined;
}

const mapStateToProps = (state: IStore) => {
  const gameState: GameState = state.gameState;
  let legalActions: Action[] = [];
  if (gameState) {
    legalActions = GameFactory.getGameService(gameState.getGameId()).getLegalActions(gameState);
  }
  return {
    gameState,
    legalActions,
    moveInProgress: gameState && setupAnimatedAction(gameState)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    executeAction: (action: Action) => {
      dispatch(executeAction(action));
    }
  }
};

const GameBoardContainer = connect<IMapStateProps, IDispatchFromProps>(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard);

export default GameBoardContainer;
