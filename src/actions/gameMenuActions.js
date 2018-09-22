export const SET_BUSY = 'SET_BUSY';
export const START_GAME = 'START_GAME';

export function selectView(gameSetupParams) {
  return { type: START_GAME, gameSetupParams };
}

function setBusy(isBusy = true) {
  return { type: SET_BUSY, isBusy };
}

export default setBusy;
