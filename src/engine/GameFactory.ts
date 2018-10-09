import FlipDeck from './actions/FlipDeck';
import Move from './actions/Move';
import TapDeck from './actions/TapDeck';
import SingleActionTurnEvent from './events/SingleActionTurnEvent';
import GameService from './GameService';
import GameBuilder from './internal/GameBuilder';
import Game from './objects/Game';
import GameParameters from './objects/GameParameters';
import AI from './players/AI';
import AllowedCardsRule from './rules/common/AllowedCardsRule';
import LimitMoveSourceRule from './rules/common/LimitMoveSourceRule';
import LimitMoveTargetRule from './rules/common/LimitMoveTargetRule';
import SameSuitIncreasingRankRule from './rules/common/SameSuitIncreasingRankRule';

class GameFactory {
  private activeGames: Game[] = [];

  public startSolitaireGame(gameParameters: GameParameters) {
    const builder = new GameBuilder().addStandardCardDeck('Stock', 6, 0)
      .addTopCardDeck('Stock:top', 'Stock')
      .addRule(new LimitMoveSourceRule(['Stock'], ['Stock:top']))
      .addDiscardDeck('Waste', 5, 0)
      .addRule(new LimitMoveSourceRule(['Stock:top'], ['Waste']))
      .addAction(new TapDeck('Stock:top', new Move('Stock:top', 'Waste', 'top')))
      .addAction(new FlipDeck('Waste', 'Stock'))
      .addDiscardDeck('Foundation 1', 0, 0)
      .addDiscardDeck('Foundation 2', 1, 0)
      .addDiscardDeck('Foundation 3', 2, 0)
      .addDiscardDeck('Foundation 4', 3, 0)
      .addRule(new LimitMoveTargetRule(['Foundation 1', 'Foundation 2', 'Foundation 3', 'Foundation 4'], ['Foundation 1', 'Foundation 2', 'Foundation 3', 'Foundation 4']))
      .addRule(new SameSuitIncreasingRankRule(['Foundation 1', 'Foundation 2', 'Foundation 3', 'Foundation 4']));
    for (let i = 1; i <= 7; i++) {
      builder.addRedBlackDescendingDeck('House ' + i, i - 1, 1)
        .addEmptyFaceDownDeck('House feeder ' + i, i - 1, 1)
        .stackDeckOnTopOf('House ' + i, 'House feeder ' + i)
        .addRule(new AllowedCardsRule('House feeder ' + i, (card, targetDeck) => card.getRank() === 13 && targetDeck.isEmpty()))
        .addRule(new AllowedCardsRule('House ' + i, (card, targetDeck) => card.getRank() === 13 || !targetDeck.isEmpty()));
    }
    builder.dealCards((gameState) => {
      const mainDeck = gameState.getDeck('Stock');
      for (let i = 1; i <= 7; i++) {
        let houseDeck = gameState.getDeck('House feeder ' + i);
        for (let j = 1; j <= (7 - i); j++) {
          houseDeck.pushCard(mainDeck.popCard()!);
        }
        houseDeck = gameState.getDeck('House ' + i);
        houseDeck.pushCard(mainDeck.popCard()!);
      }
    })
    builder.addPlayer('Player 1');
    if (gameParameters.numberOfPlayers > 1) {
      builder.addPlayer('Player 2', new AI());
    }
    builder.addEvent(new SingleActionTurnEvent());
    const game = builder.create(this.newUniqueGameId());



    this.activeGames.push(game);
    return new GameService(game);
  }

  public getGameService(gameId: number): GameService {
    const foundGame = this.activeGames.find(game => game.getGameId() === gameId);
    if (!foundGame) {
      throw new Error(`Could not find game with id ${gameId}`);
    }
    return new GameService(foundGame);
  }

  private newUniqueGameId() {
    for (let newId = 0; newId < 1000; newId += 1) {
      if (!this.activeGames.find(game => game.getGameId() === newId)) {
        return newId;
      }
    }
    throw new Error('Failed to assign a unique game id');
  }
}

const GLOBAL = new GameFactory();

export default GLOBAL;
