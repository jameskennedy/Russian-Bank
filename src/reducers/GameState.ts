import {
  SELECT_CARD
} from '../actions/gameActions';
import {
  START_GAME
} from '../actions/gameMenuActions';
import GameFactory from '../engine/GameFactory';
import GameService from '../engine/GameService';
import Action from '../engine/objects/actions/Action';
import { Deck } from '../engine/objects/Deck';

let gameService: GameService;

export const gameState = (state: any = null, action: any) => {
  switch (action.type) {
    case START_GAME:
      gameService = GameFactory.startRussianBankGame();
      return gameService.getCopyOfCurrentGameState();
    case SELECT_CARD:
      const sourceDeck: Deck = action.deck;
      const possibleActions: Action[] = gameService.getLegalActionsForDeck(sourceDeck);
      if (possibleActions.length === 1) {
        return gameService.executeAction(possibleActions[0]);
      } else if (possibleActions.length > 1) {
        console.debug('Skipping game state since card selection could imply one of ' + possibleActions);
      }
      return state;
    default:
      return state;
  }
};

export default gameState;
