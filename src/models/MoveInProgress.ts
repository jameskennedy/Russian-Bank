import Deck from "../engine/objects/Deck";

class MoveInProgress {
  constructor(private sourceDeck: string, private transferDeck: Deck) {

  }

  public getSourceDeck() {
    return this.sourceDeck;
  }

  public getTransferDeck() {
    return this.transferDeck;
  }
}

export default MoveInProgress;
