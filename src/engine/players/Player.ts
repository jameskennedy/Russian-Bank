import AI from "./AI";

class Player {
  constructor(private name: string, private ai?: AI) {

  }

  public getName(): string {
    return this.name;
  }

  public getAI(): AI | undefined {
    return this.ai;
  }

  public toString(): string {
    return this.name;
  }
}

export default Player;
