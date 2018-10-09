import {
  connect
} from 'react-redux';
import { Dispatch } from 'redux';
import { executeAction } from '../actions/gameActions';
import AIConsole from '../components/AIConsole';
import Action from '../engine/actions/Action';
import GameState from '../engine/objects/GameState';
import { IStore } from '../reducers';

interface IMapStateProps {
  status: string;
}

interface IDispatchFromProps {
  executeAction: (action: Action) => void;
}

const mapStateToProps = (state: IStore) => {
  const gameState: GameState = state.gameState;
  let status = '';
  if (gameState) {
    status = 'Waiting...';
    if (gameState.getActionInProgress()) {
      status = gameState.getActionInProgress()!.toString();
    }
  }
  return {
    status
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    executeAction: (action: Action) => {
      dispatch(executeAction(action));
    }
  }
};

const AIConsoleContainer = connect<IMapStateProps, IDispatchFromProps>(
  mapStateToProps,
  mapDispatchToProps
)(AIConsole);

export default AIConsoleContainer;
