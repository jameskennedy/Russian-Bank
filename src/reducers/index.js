import { combineReducers } from 'redux';
import { busyIndicator } from './ViewState';

const connectorProfileStore = combineReducers({
  view: combineReducers({
    busyIndicator
  })
});

export default connectorProfileStore;
