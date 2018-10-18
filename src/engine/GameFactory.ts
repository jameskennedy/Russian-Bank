import FlipDeck from './actions/FlipDeck';
import Move from './actions/Move';
import SkipTurn from './actions/SkipTurn';
import TapDeck from './actions/TapDeck';
import EndTurnOnDiscardEvent from './events/EndTurnOnDiscardEvent';
import NoCardsLeftCondition from './events/NoCardsLeftCondition';
import SingleActionTurnEvent from './events/SingleActionTurnEvent';
import GameService from './GameService';
import GameBuilder from './internal/GameBuilder';
import { DeckMode } from './objects/Deck';
import Game from './objects/Game';
import GameParameters from './objects/GameParameters';
import AI from './players/AI';
import AllowedCardsRule from './rules/common/AllowedCardsRule';
import LimitMoveSourceRule from './rules/common/LimitMoveSourceRule';
import LimitMoveTargetRule from './rules/common/LimitMoveTargetRule';
import MustMoveFromDeckIfPossibleRule from './rules/common/MustMoveFromDeckIfPossibleRule';
import OnlyOwnerCanUseRule from './rules/common/OnlyOwnerCanUseRule';
import SameSuitAdjacentRankRule from './rules/common/SameSuitAdjacentRankRule';
import SameSuitIncreasingRankRule from './rules/common/SameSuitIncreasingRankRule';
import CanOnlySkipTurnWhenStockEmpty from './rules/russianbank/CanOnlySkipTurnWhenStockEmpty';

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
    builder.addPlayer('Player 1')
      .assignDeck('Stock', 'Player 1')
      .assignDeck('Stock:top', 'Player 1')
      .assignDeck('Waste', 'Player 1')
    if (gameParameters.numberOfPlayers > 1) {
      builder.addPlayer('Player 2', new AI());
    }
    builder.addEvent(new SingleActionTurnEvent());
    builder.addEvent(new NoCardsLeftCondition())
    const game = builder.create(this.newUniqueGameId());



    this.activeGames.push(game);
    return new GameService(game);
  }

  public startRussionBankGame(gameParameters: GameParameters) {
    const builder = new GameBuilder();
    const foundationNames = [];
    for (let foundation = 1; foundation <= 8; foundation++) {
      const name = `Foundation${foundation}`;
      foundationNames.push(name);
      builder.addDiscardDeck(name, (foundation - 1) % 2 + 3, Math.floor((foundation - 1) / 2) + 1);
    }
    builder
      .addRule(new LimitMoveTargetRule(foundationNames, []))
      .addRule(new SameSuitIncreasingRankRule(foundationNames))
      .addAction(new SkipTurn())
      .addRule(new CanOnlySkipTurnWhenStockEmpty());
    for (let player = 1; player <= 2; player++) {
      const row = player === 1 ? 0 : 5;
      const otherPlayer = player % 2 + 1;
      const isAI = gameParameters.numberOfPlayers < 2 && player === 2;
      const playerName = 'Player ' + player;
      builder
        .addStandardCardDeck(`Stock${player}`, 3, row)
        .addTopCardDeck(`Stock${player}:top`, `Stock${player}`)
        .addDiscardDeck(`Waste${player}`, 4, row)
        .addDiscardDeck(`Reserve${player}`, 6, row)
        .addRule(new LimitMoveSourceRule([`Stock${player}`], [`Stock${player}:top`]))
        .addRule(new OnlyOwnerCanUseRule([`Stock${player}`, `Stock${player}:top`, `Waste${player}`, `Reserve${player}`]))
        .addPlayerRule(playerName, new LimitMoveSourceRule([], [`Reserve${player}`]))
        .addPlayerRule(playerName, new LimitMoveSourceRule([`Stock${player}:top`], [`Waste${player}`]))
        .addPlayerRule(playerName, new MustMoveFromDeckIfPossibleRule([`Stock${player}:top`]))
        .addPlayerRule(`Player ${otherPlayer}`, new SameSuitAdjacentRankRule([`Waste${player}`, `Reserve${player}`]))
        .addAction(new TapDeck(`Stock${player}:top`, new Move(`Stock${player}:top`, `Waste${player}`, 'top')))
        .addAction(new FlipDeck(`Waste${player}`, `Stock${player}`));

      builder.addPlayer(playerName, isAI ? new AI() : undefined)
        .assignDeck(`Stock${player}`, playerName)
        .assignDeck(`Stock${player}:top`, playerName)
        .assignDeck(`Waste${player}`, playerName)
        .assignDeck(`Reserve${player}`, playerName)
    }

    for (let i = 1; i <= 8; i++) {
      const onLeft = i <= 4;
      builder.addRedBlackDescendingDeck('House' + i, onLeft ? 2 : 5, i % 4 + 1, onLeft ? DeckMode.SPREAD_LEFT : DeckMode.SPREAD_RIGHT);
    }
    builder.dealCards((gameState) => {
      for (let player = 1; player <= 2; player++) {
        const mainDeck = gameState.getDeck(`Stock${player}`);
        const reserveDeck = gameState.getDeck(`Reserve${player}`);
        for (let i = 1; i <= 4; i++) {
          const houseIndex = i + (player === 1 ? 0 : 4);
          const houseDeck = gameState.getDeck('House' + houseIndex);
          houseDeck.pushCard(mainDeck.popCard()!);
        }
        for (let i = 1; i <= 13; i++) {
          reserveDeck.pushCard(mainDeck.popCard()!);
        }
      }
    })

    builder.addEvent(new EndTurnOnDiscardEvent('Waste1'));
    builder.addEvent(new EndTurnOnDiscardEvent('Waste2'));
    builder.addEvent(new NoCardsLeftCondition())
    const game = builder.create(this.newUniqueGameId());
    game.getCurrentGameState().setStatusMessage('Player 1 go!');

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
