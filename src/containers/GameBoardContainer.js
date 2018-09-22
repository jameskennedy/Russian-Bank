import { connect } from 'react-redux';
import GameBoard from '../components/GameBoard';

const mapStateToProps = (state) => {
  const isBusy = state.view.busyIndicator;
  return { isBusy };
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
