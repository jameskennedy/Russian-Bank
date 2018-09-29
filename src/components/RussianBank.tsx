import * as React from 'react';
import GameBoardContainer from '../containers/GameBoardContainer';

export interface IRussianBankProps {
  newGame: () => void;
}

class RussianBank extends React.PureComponent<IRussianBankProps> {
  constructor(props: IRussianBankProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <div>
          <button onClick={this.props.newGame}>New Game</button>
        </div>
        <GameBoardContainer />

      </div>);
  }
}

export default RussianBank;
