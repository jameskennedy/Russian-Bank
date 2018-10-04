import GameService from './GameService';
import GameBuilder from './internal/GameBuilder';
import FlipDeck from './objects/actions/FlipDeck';
import Move from './objects/actions/Move';
import TapDeck from './objects/actions/TapDeck';
import Game from './objects/Game';
import LimitMoveSourceRule from './rules/common/LimitMoveSourceRule';
import LimitMoveTargetRule from './rules/common/LimitMoveTargetRule';
import SameSuitIncreasingRankRule from './rules/common/SameSuitIncreasingRankRule';

class GameFactory {
  private activeGames: Game[] = [];

  public startSolitaireGame() {
    const builder = new GameBuilder().addStandardCardDeck('Stock')
      .addTopCardDeck('Stock:top', 'Stock')
      .addRule(new LimitMoveSourceRule(['Stock'], ['Stock:top']))
      .addDiscardDeck('Waste')
      .addRule(new LimitMoveSourceRule(['Stock:top'], ['Waste']))
      .addAction(new TapDeck('Stock:top', new Move('Stock:top', 'Waste', 'top')))
      .addAction(new FlipDeck('Waste', 'Stock'))
      .addDiscardDeck('Foundation 1')
      .addDiscardDeck('Foundation 2')
      .addDiscardDeck('Foundation 3')
      .addDiscardDeck('Foundation 4')
      .addRule(new LimitMoveTargetRule(['Foundation 1', 'Foundation 2', 'Foundation 3', 'Foundation 4'], ['Foundation 1', 'Foundation 2', 'Foundation 3', 'Foundation 4']))
      .addRule(new SameSuitIncreasingRankRule(['Foundation 1', 'Foundation 2', 'Foundation 3', 'Foundation 4']));
    for (let i = 1; i <= 7; i++) {
      builder.addRedBlackDescendingDeck('House ' + i)
        .addEmptyFaceDownDeck('House feeder ' + i)
        .stackDeckOnTopOf('House ' + i, 'House feeder ' + i);
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
    const game = builder.create(this.newUniqueGameId());



    this.activeGames.push(game);
    return new GameService(game);
  }

  public getGameService(gameId: number) {
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
