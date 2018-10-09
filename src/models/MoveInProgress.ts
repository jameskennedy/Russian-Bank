import Deck from "../engine/objects/Deck";

class MoveInProgress {
  constructor(private sourceDeck: string, private transferDeck: Deck, private targetDeck?: Deck) {

  }

  public getSourceDeck() {
    return this.sourceDeck;
  }

  public getTransferDeck() {
    return this.transferDeck;
  }

  public getTargetDeck() {
    return this.targetDeck;
  }
}

export default MoveInProgress;
