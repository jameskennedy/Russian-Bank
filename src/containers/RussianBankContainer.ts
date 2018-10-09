import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { startGame } from '../actions/gameMenuActions';
import RussianBank from '../components/RussianBank';
import GameParameters from '../engine/objects/GameParameters';
import { IStore } from '../reducers';

interface IDispatchFromProps {
  newSolitaire1Player: () => void;
  newSolitaire2Player: () => void;
}

const mapStateToProps = (state: IStore) => {
  return {
    dummy: 0
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    newSolitaire1Player: () => {
      dispatch(startGame(new GameParameters(1)));
    },
    newSolitaire2Player: () => {
      dispatch(startGame(new GameParameters(2)));
    }
  };

};

const RussianBankContainer = connect<{}, IDispatchFromProps>(
  mapStateToProps,
  mapDispatchToProps
)(RussianBank);

export default RussianBankContainer;
