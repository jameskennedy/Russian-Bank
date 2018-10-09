import GameParameters from "../engine/objects/GameParameters";

export const SET_BUSY = 'SET_BUSY';
export const START_GAME = 'START_GAME';

export function startGame(gameParameters: GameParameters) {
  return { type: START_GAME, gameParameters };
}
