import {
  connect
} from 'react-redux';
import { Dispatch } from 'redux';
import { selectCardAction } from '../actions/gameActions';
import GameBoard from '../components/GameBoard';
import GameFactory from '../engine/GameFactory';
import Action from '../engine/objects/actions/Action';
import Card from '../engine/objects/Card';
import Deck from '../engine/objects/Deck';
import GameState from '../engine/objects/GameState';
import { IStore } from '../reducers';

interface IMapStateProps {
  gameState: GameState;
  legalActions: Action[];
}

interface IDispatchFromProps {
  selectCard: (deck: Deck, card: Card) => void;
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
    selectCard: (deck: Deck, card: Card) => {
      console.debug(`Select ${card} from ${deck}`);
      dispatch(selectCardAction(deck, card));
    }
  }
};

const GameBoardContainer = connect<IMapStateProps, IDispatchFromProps>(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard);

export default GameBoardContainer;
