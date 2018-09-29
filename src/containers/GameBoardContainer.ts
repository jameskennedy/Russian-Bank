import {
  connect
} from 'react-redux';
import { Dispatch } from 'redux';
import GameBoard from '../components/GameBoard';
import GameFactory from '../engine/GameFactory';
import Action from '../engine/objects/actions/Action';
import Card from '../engine/objects/Card';
import GameState from '../engine/objects/GameState';
import { IStore } from '../reducers';

interface IGameBoardProps {
  gameState: GameState;
  legalActions: Action[];
}

interface IDispatchFromProps {
  pickupCard: (card: Card) => void;
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
    pickupCard: (card: Card) => {
      alert(card);
    }
  }
};

const GameBoardContainer = connect<IGameBoardProps, IDispatchFromProps>(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard);

export default GameBoardContainer;
