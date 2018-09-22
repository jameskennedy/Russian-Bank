import { SET_BUSY } from '../actions/gameMenuActions';

export const busyIndicator = (state = false, action) => {
  switch (action.type) {
    case SET_BUSY:
      return action.isBusy;
    default:
      return state;
  }
};

export default busyIndicator;
