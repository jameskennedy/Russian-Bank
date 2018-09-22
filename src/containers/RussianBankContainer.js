import { connect } from 'react-redux';
import { startGame } from '../actions/gameMenuActions';
import RussianBank from '../components/RussianBank';

const mapStateToProps = (state) => {
  const isBusy = state.view.busyIndicator;
  return { isBusy };
};

const mapDispatchToProps = (dispatch) => {
  const map = {
    newGame: (gameSetupParams) => {
      dispatch(startGame(gameSetupParams));
    }
  };
  return map;
};

const RussianBankContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RussianBank);

export default RussianBankContainer;
