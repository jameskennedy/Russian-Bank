import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { startGame } from '../actions/gameMenuActions';
import RussianBank from '../components/RussianBank';
import { IStore } from '../reducers';

interface IDispatchFromProps {
  newGame: (gameSetupParams: any) => void;
}

const mapStateToProps = (state: IStore) => {
  return {
    dummy: 0
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    newGame: () => {
      dispatch(startGame());
    }
  };

};

const RussianBankContainer = connect<{}, IDispatchFromProps>(
  mapStateToProps,
  mapDispatchToProps
)(RussianBank);

export default RussianBankContainer;
